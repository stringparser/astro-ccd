import fs from 'fs-extra';
import path from 'path';
import { mapTextToUrl, mapMDX } from './lib/util';
import { fetchPageContent, ParsedPageContent } from './lib';

const urlMap = {
  'ccd-2': 'reparacion-ccd',
  'fuensanta-3': 'fuensanta',
  'cometasasteroides': 'cometas-asteroides',
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
        .map(({ id, ...it }) => {
          if (!id) {
            return {
              ...it,
              url: `/${basename}`,
            };
          }

          const urlID = mapTextToUrl(id);
          const basenameURLID = urlMap[urlID] || urlID;

          return {
            id: urlID,
            ...it,
            url: basenameURLID === basename.toLowerCase()
              ? `/${basename}`
              : `/${basename}/${basenameURLID}`,
          };
        })
        .reduce((acc, item, index, items) => {
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
    }
  });

  await fs.writeFile(
    path.join(__dirname, 'data.json'),
    JSON.stringify(results, null, 2)
  );

  const pagesContent = await Promise.all(results.map(el => {
      const baseURL = el.url.split('/').pop();
      const basename = urlMap[baseURL] || baseURL;

      fs.writeFile(
        path.resolve(__dirname, '..', 'src', 'data', `${basename}.json`),
        JSON.stringify(el, null, 2),
      );

      const mdx = el.items.map(mapMDX)
        .filter(value => value)
        .join('\n\n')
      ;

      return fs.writeFile(
        path.resolve(__dirname, '..', 'src', 'pages', basename, 'index.mdx'),
        mdx
      ).then(() => results)
    })
  ).then(results => results
    .flat()
    .map(el => el.items)
    .flat()
  );

  await fs.writeFile(
    path.resolve(__dirname, 'pages-content.json'),
    JSON.stringify(pagesContent, null, 2)
  );

  const fileStream: Record<string, fs.WriteStream> = {};

  pagesContent.forEach(item => {
    if (!item.url) {
      return;
    }

    const stream = fileStream[item.url] || (
      fileStream[item.url] = fs.createWriteStream(
        /(\/[^\s\/]+){2,}/.test(item.url)
          ? path.join(__dirname, '..', 'src', 'pages', `${item.url}.mdx`)
          : path.join(__dirname, '..', 'src', 'pages', `${item.url}/index.mdx`)
        ,
        {
          start: 0,
          flags: 'w',
          encoding: 'utf-8',
        }
      )
    );

    stream.write(`${mapMDX(item)}\n\n`);
  });
});