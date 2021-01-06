import fetch from 'node-fetch';
import cheerio from 'cheerio';
import { TextItem, TitleItem, ImageProps } from './types';
import mapImageMetadata from './metadata/image';

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

    const title = (post.find('.entry-header').text() || '').trim();

    const items = post.find('.entry-content > p,h1,h2,h3,h4,h5,h6')
      .toArray()
      .map(el => $(el))
      .map(el => {
        const image = el.find('img');
        const hasImage = image.length > 0;

        const found = hasImage
          ? image
          : el
        ;

        const html = found.html();

        const type: PageItemProps['type'] =
          hasImage && 'image' ||
          /^h\d+/.test(html) && 'header' ||
          'text'
        ;

        return {
          el: found,
          type,
          textContent: el.text().trim().replace(/\s+/gm, ' '),
        };
      })
      .reduce((acc, { type, el, textContent }) => {

        // console.log('--');
        // console.log('tagName', type, el.first().html());
        // console.log('src', el.attr('data-orig-file') || el.attr('src'));
        // console.log(el.attr());

        switch (type) {
          case 'text': {
            return acc.concat({
              type,
              text: el.text().trim().replace(/\s+/g, ' ')
            });
          }
          case 'header': {
            return acc.concat({
              type,
              text: el.text().trim().replace(/\s+/g, ' ')
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
          type: 'header',
          text: title,
        },
        ...items
      ],
    }
  });
}