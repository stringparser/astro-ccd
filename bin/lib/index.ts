import fetch from 'node-fetch';
import cheerio from 'cheerio';
import { cleanHTML, mapTextToUrl } from './util';
import mapImageMetadata from './metadata/image';
import { TextItem, TitleItem, ImageProps } from './types';

export type PageItemProps =
  TextItem |
  TitleItem |
  ImageProps
;

export type ParsedPageContent = {
  url: string;
  items: PageItemProps[];
};

export function fetchPageContent(url: string): Promise<ParsedPageContent> {

  return fetch(url)
  .then(res => res.text())
  .then(html => {
    const $ = cheerio.load(html);
    const post = $('#content > article');

    const title = cleanHTML(post.find('.entry-header').html() || '');

    const items = post.find('.entry-content > p,h1,h2,h3,h4,h5,h6,video,figure')
      .toArray()
      .map(el => $(el))
      .map(el => {
        const image = el.find('img');
        const hasImage = image.length > 0;

        const found = hasImage
          ? image
          : el
        ;

        const html = found.prop('outerHTML');

        const type: PageItemProps['type'] =
          hasImage && 'image' ||
          /<h(1|2)/.test(html) && 'header' ||
          'text'
        ;

        if (hasImage) {
          el.find(found).remove();
        }

        return {
          el: found,
          type,
          textContent: cleanHTML(el.html()),
        };
      })
      .filter(({ textContent }) =>
        title !== textContent
      )
      .reduce((acc, { type, el, textContent }) => {

        switch (type) {
          case 'text': {
            return acc.concat({
              type,
              text: cleanHTML(el.html())
            });
          }
          case 'header': {
            const text = cleanHTML(el.html());
            return acc.concat({
              id: text,
              type,
              text,
            });
          }
          case 'image': {
            return acc.concat(mapImageMetadata(url, el, textContent));
          }

          default: {
            return acc;
          }
        }
      }, [])
      .filter(el => el.text || el.src)
    ;

    return {
      url,
      items: [
        {
          id: title,
          type: 'header',
          text: title,
        },
        ...items
      ],
    }
  });
}