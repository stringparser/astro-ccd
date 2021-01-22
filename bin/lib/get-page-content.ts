import fetch from 'node-fetch';
import cheerio from 'cheerio';
import mapMetadata from './metadata';
import { mapTextToUrl } from '../../src/lib/util';
import { PageBasename, PageItemProps, ParsedPageContent } from '../../src/types';
import { ActualPageBasename, cleanHTML, mapFecha, standalonePagesRE, urlMap } from './util';

const skipForIndex = <T>(isIndex: boolean, handle: T) => isIndex
  ? value => value
  : handle
;

export function fetchPageContent(url: string): Promise<ParsedPageContent> {
  const label = urlMap[url.split('/').pop() as ActualPageBasename];
  const isIndex = standalonePagesRE.test(label);

  return fetch(url)
    .then(res => res.text())
    .then(html => {
      const $ = cheerio.load(html);
      const post = $('#content > article');
      const title = cleanHTML(post.find('.entry-header').text() || '');

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
            textContent: type === 'header'
              ? el.text()
              : cleanHTML(el.html())
            ,
          };
        })
        .filter(({ textContent }) =>
          title !== textContent
        )
        .reduce((acc, { type, el, textContent }) => {

          switch (type) {
            case 'text': {
              const text = cleanHTML(el.html());
              return acc.concat({
                urlId: isIndex ? label : '',
                type,
                label,
                text,
              });
            }
            case 'header': {
              const text = cleanHTML(el.html());
              return acc.concat({
                urlId: isIndex ? label : '',
                type,
                label,
                text,
              });
            }
            case 'image': {
              const alt = el.attr('alt');
              const src = el.attr('data-orig-file') || el.attr('src');
              const objeto = (/\/([^\/.]+)\.[^\/\s]+$/.exec(src) || ['']).pop().trim();

              const item: PageItemProps = {
                urlId: isIndex ? label : objeto,
                type: 'image',
              };

              if (alt) {
                item.alt = alt;
              }

              if (src) {
                item.src = src;
              }

              if (!isIndex && objeto) {
                item.objeto = objeto;
              }

              if (!isIndex) {
                item.label = label;
              }

              if (textContent) {
                item.text = textContent;
              }

              return acc.concat(item);
            }

            default: {
              return acc;
            }
          }
        }, [] as PageItemProps[])
        .filter(el => el.text || el.src)
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
        .map(mapMetadata)
        .map(skipForIndex(isIndex, ({ urlId, ...props }, index, items): PageItemProps => {
          if (urlId != '') {
            return {
              urlId,
              ...props,
            };
          }

          const found = items.slice(index).find(el => el.urlId);

          if (found && found.urlId) {
            const result = { urlId: found.urlId, ...props };
            const { fecha, objeto } = found;

            if (fecha) {
              result.fecha = fecha;
            }

            if (objeto) {
              result.objeto = objeto;
            }

            return result;
          }

          return {
            urlId: '',
            ...props,
          };
        }))
        .map(mapFecha)
        .map(({ urlId: maybeEmptyUrlId, ...props }) => {
          if (isIndex || /^\d{6}(-\S+)+/.test(maybeEmptyUrlId)) {
            return {
              urlId: maybeEmptyUrlId,
              ...props,
            };
          }

          const { fecha } = props;
          const objetoSinFecha = (props.objeto || '').replace(/^\s*\d+\-/, '');

          const urlId = fecha && props.objeto
              ? `${fecha}-${mapTextToUrl(objetoSinFecha)}`
              : maybeEmptyUrlId || props.label
          ;

          return {
            urlId,
            ...props,
          }
        })
        .map(props => {
          return {
            ...props,
            isIndex: Object.values(PageBasename).includes(props.urlId as PageBasename),
          };;
        })
      ;

      return {
        url,
        label,
        title,
        items,
      }
    })
  ;
}