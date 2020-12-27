import fs from 'fs-extra';
import path from 'path';
import fetch from 'node-fetch';
import cheerio from 'cheerio';

const BASE_URL = 'https://astro-ccd.com';

(async function () {
  const result = await fetch(`${BASE_URL}/fuensanta-3`)
    .then(res => res.text())
    .then(html => {
      const $ = cheerio.load(html);
      const post = $('#content > article');

      const title = (post.find('.entry-header').text() || '').trim();

      const description = post.find('.entry-content > p')
        .toArray()
        .slice(1, 4)
        .map(el => ($(el).text() || '').trim())
        .join(' ')
      ;

      const items = post.find('.entry-content > p')
        .toArray()
        .slice(4)
        .map(el => $(el))
        .map(el => {
          const elFound = el.find([
            'img',
            'a:not(:contains(img))',
          ].join(', '));

          const found = elFound.length > 0
            ? elFound
            : el
          ;

          const html = found.html();
          const tag =
            /^<img /.test(html) && 'img' ||
            'text'
          ;

          return {
            el,
            tag,
            text: found.text() || '',
            contents: found.contents(),
          };
        })
        .reduce((acc, { tag, contents: el, text }) => {

          console.log('--');
          console.log('tagName', tag, el.first().html());
          console.log('src', el.attr('data-orig-file') || el.attr('src'));
          console.log(el.attr() || text);

          switch (tag) {
            case 'img': {
              return acc.concat({
                type: 'img',
                src: el.attr('data-orig-file') || el.attr('src'),
              });
            }
            case 'text': {
              return acc.concat({
                type: 'text',
                text: text.trim()
              });
            }

            default: {
              return acc;
            }
          }
        }, [])
      ;

      return {
        path: '/fuensanta-3',
        items: [
          {
            type: 'text',
            variant: 'header',
            text: title,
          },
          {
            type: 'text',
            text: description,
          },
          ...items
        ],
      }
    })
  ;

  await fs.writeFile(
    path.join(__dirname, 'data.json'),
    JSON.stringify(result, null, 2)
  );
})();