import fs from 'fs-extra';
import path from 'path';
import { fetchPageContent } from './lib/get-page-content';
import { fechaTextRE, mapMDX, urlMap, mapTextToUrl, mapJSON } from './lib/util';

Promise.all([
  fetchPageContent('https://astro-ccd.com/fuensanta-3'),
  fetchPageContent('https://astro-ccd.com/cometasasteroides'),
  fetchPageContent('https://astro-ccd.com/galaxias'),
  fetchPageContent('https://astro-ccd.com/nebulosas'),
  fetchPageContent('https://astro-ccd.com/planetas-satelites'),
  fetchPageContent('https://astro-ccd.com/construccion-del-observatorio'),
  fetchPageContent('https://astro-ccd.com/ccd-2')
])
.then(async (results) => {

  await fs.writeFile(
    path.join(__dirname, 'data', 'index.json'),
    JSON.stringify(results, mapJSON, 2)
  );

  const pagesItems = results
    .map(el => el.items)
    .flat()
  ;

  type PageItemContents = {
    urlId: string;
    title: string;
    label: string;
    fecha: string;
    objeto: string;
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
      label,
      fecha,
      isIndex,
      objeto,
    } = item;

    const result = mapMDX(item);
    const pageItem = acc[urlId];

    const title = pageItem?.title
      || item.nombre && `# ${item.nombre}`
      || /^\s*#/.test(result) && result
      || pageItem?.content?.find(v => /^\s*#/.test(v))
      || objeto && `# ${objeto}`
      || null
    ;

    acc[urlId] = {
      urlId,
      label,
      title,
      fecha,
      objeto,
      isIndex,
      content: (pageItem?.content || []).concat(result)
    };

    return acc;
  }, {} as Record<string, PageItemContents>);

  const pagesFiltered = Object.entries(pages)
    .reduce((acc, [urlId, page]) => {
      if (page.isIndex) {
        return {
          ...acc,
          [urlId]: page,
        };
      }

      const {
        fechaRE = fechaTextRE,
        title: pageTitle = '',
        content: pageContent,
      } = page;

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
        [urlId]: {
          ...page,
          title: pageTitle || page.title,
          content: !pageTitle
            ? pageContent
            : pageContent
                .filter(v => !pageTitleRE.test(v))
                .map(v => v
                  .replace(/\s*#?\s*(Cometa)?\s*(\d{1,3}\/?p|(c\/)?\d{4}[a-z]\d)\s*/gi, '')
                  .replace(/c\d{4}\s*[a-z]{1,2}\d{1,2}/ig, '')
                  .replace(fechaTextRE, '')
                  .replace(fechaRE, '')
                  .replace(/(http)?s?\:?\/\/astroccd\.wordpress\.com\/([^\s'"\/]+)\/?/g,
                    ($0, value: string) => {
                      const mappedBaseUrl = urlMap[value as keyof typeof urlMap] || value;

                      return `/${mappedBaseUrl}`;
                    }
                  )
                )
                .map(v => v.trim())
                .filter(v => v)
        },
      };
    }, {} as Record<string, PageItemContents>)
  ;

  return Promise.all([
    fs.writeFile(
      path.resolve(__dirname, 'data', 'pages.json'),
      JSON.stringify(pagesFiltered, mapJSON, 2),
    )
  ]).then(() => pages);

}).then(pages => {

  // if (pages != null) {
  //   console.log('writes disabled for debugging');
  //   return Promise.resolve([]);
  // }

  return Promise.all(Object.entries(pages)
    .map(async ([logId, page]) => {
      const {content, isIndex} = page;

      const filename = isIndex
        ? path.join(__dirname, '..', 'src', 'pages', logId, 'index.mdx')
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

      const frontMatterKeys: Array<keyof typeof page> = [
        'title',
        'fecha',
        'label',
        'objeto',
      ];

      const mergedContent = Array.isArray(content)
        ? content.join('\n')
        : content
      ;

      if (!isIndex && /<(a|img|figure|table)/.test(mergedContent) === false) {
        console.log('will skip page registry', logId, page);
        return Promise.resolve();
      }

      return fs.mkdirp(path.dirname(filename))
        .then(() =>
          fs.writeFile(
            filename,
            [
              '---',
              ...frontMatterKeys.map(key => {
                const value = page[key];

                if (key === 'title') {
                  return page.title
                    ? `titulo: ${page.title.replace(/^\s*[#]\s*/, '')}`
                    : null
                  ;
                }

                return value ? `${key}: ${value}` : null;
              }),
              '---\n',
              mergedContent
            ].filter(v => v).join('\n')
          )
        )
      ;
    })
  )
});