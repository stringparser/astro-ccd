import fs from 'fs-extra';
import path from 'path';
import { fetchPageContent } from './lib';
import { cleanHTML } from './lib/util';

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
.then(results => {
  fs.writeFile(
    path.join(__dirname, 'data.json'),
    JSON.stringify(results, null, 2)
  );

  return Promise.all(
    results.map(el => {
      const baseURL = el.url.split('/').pop();
      const basename = urlMap[baseURL] || baseURL;

      fs.writeFile(
        path.resolve(__dirname, '..', 'src', 'data', `${basename}.json`),
        JSON.stringify(el, null, 2),
      );

      const mdx = el.items.map(el => {
        switch (el.type) {
          case 'text': {
            return el.text;
          }
          case 'header': {
            return `# ${el.text}\n---\n`;
          }
          case 'image': {
            return [
              `<img src="${el.src}" />`,
              cleanHTML(el.descripcion)
            ].filter(v => v).join('\n\n');
          }
        }
      })
      .filter(value => value)
      .join('\n\n')

      return fs.writeFile(
        path.resolve(__dirname, '..', 'src', 'pages', `${basename}.mdx`),
        mdx
      ).then(() => results)
    })
  );
});