import fs from 'fs-extra';
import path from 'path';
import { fetchPageContent } from './lib';
import { ParsedPageContent, PageItemProps } from './lib/types';
import { mapTextToUrl, fechaTextRE, mapFecha, mapMDX, mapItemProps } from './lib/util';

export const urlMap = {
  'ccd-2': 'reparacion-ccd',
  'galaxias': 'galaxias',
  'nebulosas': 'nebulosas',
  'fuensanta-3': 'fuensanta',
  'cometasasteroides': 'cometas-asteroides',
  'planetas-satelites': 'sistema-solar',
  'construccion-del-observatorio': 'observatorio'
};

export const baseUrlMapsRE = new RegExp(`^${Object.values(urlMap).join('|')}$`, 'i');
export const standalonePagesRE = new RegExp(`^${[
  urlMap['ccd-2'],
  urlMap['fuensanta-3'],
  urlMap['planetas-satelites'],
  urlMap['construccion-del-observatorio'],
].join('|')}$`, 'i');

export type ActualPageBasename = keyof typeof urlMap;

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
    const url = el.url.split('/').pop() as ActualPageBasename;
    const basename = (urlMap[url as keyof typeof urlMap] || url).replace(/\/$/, '');

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
            objectId = basename,
            fecha: itemFecha,
            ...it
          } = item;

          const id = mapTextToUrl(objectId);
          const label = basename;
          const { fechaRE, fecha } = mapFecha(item);

          const mappedUrlId = (
            urlMap[id as keyof typeof urlMap]
            || id
          ).replace(/^((\d{8}|\d{6})-)+?/, '');

          const urlId = Object.values(urlMap).includes(mappedUrlId) || !fecha
              ? label || mappedUrlId
              : `${fecha}-${mappedUrlId}`
          ;

          return {
            ...it,
            urlId,
            fecha,
            label,
            fechaRE,
            objectId,
          };
        })
        .map(mapItemProps(basename))
        .map(mapItemProps(basename))
        .map(el => {
          const { label, urlId } = el;

          return {
            ...el,
            isIndex: baseUrlMapsRE.test(urlId)
             || standalonePagesRE.test(label)
          }
        })
    }
  });

  await fs.writeFile(
    path.join(__dirname, 'data', 'index.json'),
    JSON.stringify(results, null, 2)
  );

  const pagesItems = results
    .map(el => el.items)
    .flat()
  ;

  type PageItemContents = {
    urlId: string;
    objectId: string;
    title: string;
    label: string;
    fecha: string;
    isIndex: boolean;
    fechaRE?: string;
    content: string[];
  };

  const pages = pagesItems.reduce((acc, item) => {
    if (!item.urlId) {
      console.warn('no urlId for', item);
      return acc;
    }

    const {
      urlId,
      fechaRE = fechaTextRE,
      label,
      fecha,
      isIndex,
      objectId,
    } = item;

    const groupId = isIndex
      ? label
      : urlId
    ;

    const index = acc[groupId] ? acc[groupId].content?.length - 1 : 0;
    const result = mapMDX(item, index);
    const pageItem = acc[groupId];

    const title = pageItem?.title
      || pageItem?.content?.find(v => /^\s*#/.test(v))
      || item.nombre && `# ${item.nombre}`
      || objectId && `# ${objectId}`
      || null
    ;

    const objectNameRE = new RegExp((title || '')
      .replace(/^\s*#\s*/, '')
      .replace(/\s+/g, '\\s*')
      .replace(/([()])/g, '\\$1?')
    , 'ig');

    acc[groupId] = {
      urlId,
      label,
      title,
      fecha,
      isIndex,
      objectId,
      content: (pageItem?.content || []).concat(
        ...result
            .replace(fechaRE, '')
            .replace(objectNameRE, '')
            .split(/\n+\s+/g)
      )
    };

    return acc;
  }, {} as Record<string, PageItemContents>);

  const pagesFiltered = Object.entries(pages)
    .reduce((acc, [logId, page]) => {
      const pageTitle = page?.title || '';

      const pageTitleRE = new RegExp(
        `^\\s*${pageTitle
            .replace(/^\s*\#/, '#?')
            .replace(/\s+/g, '\\s*')
            .replace(/c\//i, '(c\\/)?')
            .replace(/([\/])/g, '$1?')
            .replace(/\(([^()]+)\)/g, '(\\$1)?')
          }\\s*$`,
        'i'
      );

      return {
        ...acc,
        [logId]: {
          ...page,
          content: !pageTitle
            ? page.content
            : [
              pageTitle,
              ...page.content
                .filter(v => !pageTitleRE.test(v))
                .map(v => v
                  .replace(/\s*#?\s*(Cometa)?\s*(\d{1,3}\/?p|(c\/)?\d{4}[a-z]\d)\s*/gi, '')
                  .replace(/c\d{4}\s*[a-z]{1,2}\d{1,2}/ig, '')
                  .replace(fechaTextRE, '')
                )
                .map(v => v.trim())
                .filter(v => v)
            ]
        },
      };
    }, {} as Record<string, PageItemContents>)
  ;

  return Promise.all([
    fs.writeFile(
      path.resolve(__dirname, 'data', 'pages.json'),
      JSON.stringify(pagesFiltered, null, 2),
    )
  ]).then(() => pages);

}).then(pages => {
  return Promise.all(Object.entries(pages)
    .map(async ([logId, el]) => {
      const {label, content, isIndex} = el;

      const filename = isIndex
        ? path.join(__dirname, '..', 'src', 'pages', mapTextToUrl(label), 'index.mdx')
        : path.join(__dirname, '..', 'src', 'pages', 'registro', `${logId}.mdx`)
      ;

      const shouldSkipIndex = isIndex
        ? await fs.pathExists(filename.replace(/\.mdx$/, '.tsx'))
        : false
      ;

      if (shouldSkipIndex) {
        console.log('.mdx file write skipped for', logId);
        return Promise.resolve();
      }

      return fs.mkdirp(path.dirname(filename))
        .then(() =>
          fs.writeFile(
            filename,
            Array.isArray(content)
              ? content.join('\n')
              : content
          )
        )
      ;
    })
  )
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