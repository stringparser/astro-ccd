import fs from 'fs-extra';
import path from 'path';
import { mapTextToUrl, mapMDX } from './lib/util';
import { fetchPageContent, PageItemProps, ParsedPageContent } from './lib';
import { mapImageFecha } from './lib/metadata/image';

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
          switch (item.type) {
            case 'image': {
              return {
                ...item,
                fecha: mapImageFecha(item),
              };
            }
            default: {
              return item;
            }
          }
        })
        .map(item => {
          const { id, ...it } = item;

          if (!id || it.type === 'header') {
            return {
              ...it,
              url: `/${basename}`,
            };
          }

          const urlID = mapTextToUrl(id);
          const basenameURLID = [
            item.fecha,
            urlMap[urlID] || urlID,
          ].filter(v => v).join('-');

          return {
            id: urlID,
            ...it,
            url: basenameURLID === basename
              ? `/${basename}`
              : `/${basename}/${basenameURLID}`,
          };
        })
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

    const key = item.url;

    return {
      ...acc,
      [key]: (acc[key] || []).concat(mapMDX(item)),
    };
  }, {} as Record<string, string>);

  return fs.writeFile(
    path.resolve(__dirname, '..', 'src', 'data', 'pages.json'),
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