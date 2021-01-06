import fs from 'fs-extra';
import path from 'path';
import { fetchPageContent } from './lib';

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
      const basename = el.url.split('/').pop();

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
              `<img \n\tsrc="${el.src}"\n\tloading="lazy" \n/>`,
              el.descripcion
            ].filter(v => v).join('\n');
          }
        }
      })
      .filter(value => value)
      .join('\n\n')

      return fs.writeFile(
        path.resolve(__dirname, '..', 'src', 'pages', `${basename}.mdx`),
        mdx
      )
    })
  );
});