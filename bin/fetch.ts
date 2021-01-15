import fs from 'fs-extra';
import path from 'path';
import { fetchPageContent } from './lib';
import { ParsedPageContent, PageItemProps } from './lib/types';
import { mapTextToUrl, mapFecha, mapMDX, mapItemProps } from './lib/util';

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
    const basename = (urlMap[baseURL] || baseURL).replace(/\/$/, '');

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
                  ? [prev.text, item.text].filter(v => (v || '').trim()).join('\n\n')
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
        .map(mapItemProps(basename))
        .map(mapItemProps(basename))
        .map(({ url, ...el }) => {
          return {
            url: url.replace(/\/$/, ''),
            ...el,
          }
        })
    }
  });

  await fs.writeFile(
    path.join(__dirname, 'data', 'index.json'),
    JSON.stringify(results, null, 2)
  );

  await Promise.all(results.map(el => {
    const baseURL = el.url.split('/').pop();
    const basename = urlMap[baseURL] || baseURL;

    const mdx = el.items
      .map(mapMDX)
      .filter(value => value)
      .join('\n\n')
    ;

    return Promise.all([
      // fs.writeFile(
      //   path.resolve(__dirname, '..', 'src', 'data', `${basename}.json`),
      //   JSON.stringify(el, null, 2),
      // ),
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

  const pages = pagesItems.reduce((acc, item) => {
    if (!item.url) {
      return acc;
    }

    const key = item.url.replace(/\/$/, '');
    const index = acc[key] ? acc[key].length - 1 : 0;
    const result = mapMDX(item, index);

    return {
      ...acc,
      [key]: (acc[key] || [])
        .concat(index === 0 && /^#/.test(result)
          ? null
          : result
        )
      ,
    };
  }, {} as Record<string, string>);

  return fs.writeFile(
    path.resolve(__dirname, 'data', 'pages.json'),
    JSON.stringify(
      pages,
      function (key, value) {
        if (Array.isArray(value)) {
          return value.filter(v => v);
        }

        return value;
      },
      2
    ),
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