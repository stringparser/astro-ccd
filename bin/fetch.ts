import fs from 'fs-extra';
import path from 'path';
import { fetchPageContent } from './lib';
import { ParsedPageContent, PageItemProps } from './lib/types';
import { mapTextToUrl, mapFecha, mapMDX, mapItemFecha } from './lib/util';

const urlMap = {
  'ccd-2': 'reparacion-ccd',
  'fuensanta-3': 'fuensanta',
  'cometasasteroides': 'cometas-asteroides',
  'planetas-satelites': 'sistema-solar',
  'construccion-del-observatorio': 'observatorio'
};

Promise.all([
  fetchPageContent('https://astro-ccd.com/fuensanta-3'),
  fetchPageContent('https://astro-ccd.com/cometasasteroides'),
  fetchPageContent('https://astro-ccd.com/galaxias'),
  fetchPageContent('https://astro-ccd.com/nebulosas'),
  fetchPageContent('https://astro-ccd.com/planetas-satelites'),
  fetchPageContent('https://astro-ccd.com/construccion-del-observatorio'),
  fetchPageContent('https://astro-ccd.com/ccd-2')
])
.then(async (fetchResults) => {
  const results = fetchResults.map((el): ParsedPageContent => {
    const baseURL = el.url.split('/').pop();
    const basename = urlMap[baseURL] || baseURL;

    return {
      ...el,
      items: el.items
        .reduce((acc: PageItemProps[], item, index, items) => {
          const prev = items[index - 1];

          switch (prev?.type) {
            case 'text':
            case 'image': {
              if (item.type === 'text') {
                prev.text = prev.text
                  ? `${prev.text}\n\n${item.text}`
                  : item.text
                ;

                return acc;
              }
            }
          }

          return acc.concat(item);
        }, [])
        .map(item => {
          const {
            id: itemId,
            url: itemUrl,
            fecha: itemFecha,
            ...it
          } = item;

          const id = mapTextToUrl(itemId);
          const fecha = mapFecha(item);

          const urlID = [
            fecha,
            urlMap[id] || id,
          ].filter(v => v).join('-');

          return {
            id: itemId,
            fecha,
            url: urlID === basename
              ? `/${basename}`
              : `/${basename}/${urlID}`,
            ...it,
          };
        })
        .map(mapItemFecha(basename))
        .map(mapItemFecha(basename))
    }
  });

  await fs.writeFile(
    path.join(__dirname, 'data.json'),
    JSON.stringify(results, null, 2)
  );

  await Promise.all(results.map(el => {
    const baseURL = el.url.split('/').pop();
    const basename = urlMap[baseURL] || baseURL;

    const mdx = el.items.map(mapMDX)
      .filter(value => value)
      .join('\n\n')
    ;

    return Promise.all([
      fs.writeFile(
        path.resolve(__dirname, '..', 'src', 'data', `${basename}.json`),
        JSON.stringify(el, null, 2),
      ),
      fs.writeFile(
        path.resolve(__dirname, '..', 'src', 'pages', basename, 'index.mdx'),
        mdx
      )
    ]);
  }));

  const pagesItems = results
    .map(el => el.items)
    .flat()
  ;

  await fs.writeFile(
    path.resolve(__dirname, 'pages-items.json'),
    JSON.stringify(pagesItems, null, 2)
  );

  const pages = pagesItems.reduce((acc, item) => {
    if (!item.url) {
      return acc;
    }

    const key = (item.url).replace(/\/$/, '');
    const index = acc[key]
      ? acc[key].length - 1
      : 0
    ;

    return {
      ...acc,
      [key]: (acc[key] || []).concat(mapMDX(item, index)),
    };
  }, {} as Record<string, string>);

  return fs.writeFile(
    path.resolve(__dirname, 'pages.json'),
    JSON.stringify(pages, null, 2),
  );
});

// fs.createWriteStream(
//   /(\/[^\s\/]+){2,}/.test(item.url)
//     ? path.join(__dirname, '..', 'src', 'pages', `${item.url}.mdx`)
//     : path.join(__dirname, '..', 'src', 'pages', `${item.url}/index.mdx`)
//   ,
//   {
//     start: 0,
//     flags: 'w',
//     encoding: 'utf-8',
//   }
// )