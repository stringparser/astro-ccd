import fetch from 'node-fetch';
import cheerio from 'cheerio';
import mapImageMetadata from './metadata/image';
import { TextItem, TitleItem, ImageProps } from './types';

function cleanHTML(html: string) {
  return (html
    .replace('&amp;', ' ')
    .replace(/&nbsp;/gm, '\n')
    .replace(/<a \s*href[^>]+>\s*(<br\s*\/?>)?\s*<\/a>/gm, '')
    .replace(/<br\s*\/?>/, '')
    .replace(/class\s*=\s*["'][^'"]+["']/gm, '')
    .replace(/style\s*=\s*["'][^'"]+["']\s*/gm, '')
    .replace(/\s*(<|<\/)(b|em|span|h\d+|strong)\s*>\s*/gm, '')
    .trim()
    .replace(/\s+/g, ' ')
  );
}

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

        const html = found.html();

        const type: PageItemProps['type'] =
          hasImage && 'image' ||
          /^h\d+/.test(html) && 'header' ||
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
      .filter(({ textContent }) => title !== textContent)
      .reduce((acc, { type, el, textContent }) => {

        // console.log('--');
        // console.log('tagName', type, el.first().html());
        // console.log('src', el.attr('data-orig-file') || el.attr('src'));
        // console.log(el.attr());

        switch (type) {
          case 'text': {
            return acc.concat({
              type,
              text: cleanHTML(el.html())
            });
          }
          case 'header': {
            return acc.concat({
              type,
              text: cleanHTML(el.html())
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