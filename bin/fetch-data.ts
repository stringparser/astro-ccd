import fs from 'fs-extra';
import path from 'path';
import { fetchPageContent } from './lib/get-page-content';
import { PageBasename, PageItemContents } from '../src/types';
import { fechaTextRE, mapMDX, mapJSON, urlMap } from './lib/util';

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
    path.join(__dirname, 'datos', 'index.json'),
    JSON.stringify(results, mapJSON, 2)
  );

  const pagesItems = results
    .map(el => el.items)
    .flat()
  ;

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

    const mdx = mapMDX(item);
    const pageItem = acc[urlId];

    const title = pageItem?.title
      || item.nombre && `# ${item.nombre}`
      || /^\s*#/.test(mdx) && mdx
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
      content: (pageItem?.content || []).concat({
        ...item,
        mdx,
      })
    };

    return acc;
  }, {} as Record<string, PageItemContents>);

  const pagesFiltered = Object.entries(pages)
    .reduce((acc, [urlId, page]) => {
      if (urlId === 'apj-logo') {
        return acc;
      }

      if (page.isIndex) {
        const { title, label: pageLabel, ...pageProps } = page;
        const label = urlId === PageBasename.fuensanta
          ? 'fuensanta'
          : urlId
        ;

        return {
          ...acc,
          [urlId]: {
            label,
            title: (
              urlId === PageBasename.fuensanta && 'Fuensanta'
              || urlId === PageBasename.reparacionCCD && 'Reparación SBIG'
              || urlId === PageBasename.cometasAsteroides && 'Cometas Asteroides'
              || urlId === PageBasename.construccionObservatorio && 'Construcción del Observatorio'
            ),
            ...pageProps
          },
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
          title: pageTitle,
          content: !pageTitle
            ? pageContent
            : pageContent
                .filter(v => !pageTitleRE.test(v.text))
                .map(({ text = '', ...rest }) => {
                  return {
                    ...rest,
                    text: text.replace(/\s*#?\s*(Cometa)?\s*(\d{1,3}\/?p|(c\/)?\d{4}[a-z]\d)\s*/gi, '')
                    .replace(/c\d{4}\s*[a-z]{1,2}\d{1,2}/ig, '')
                    .replace(fechaTextRE, '')
                    .replace(fechaRE, '')
                    .replace(/(http)?s?\:?\/\/astroccd\.wordpress\.com\/([^\s'"\/]+)\/?/g,
                      ($0, value: string) => {
                        const mappedBaseUrl = urlMap[value as keyof typeof urlMap] || value;

                        return `/${mappedBaseUrl}`;
                      }
                    )
                  }
                })
                .filter(el => {
                  switch (el.type) {
                    case 'image': {
                      return el.src != null;
                    }
                    default: {
                      return el.text != null && el.text.trim() != '';
                    }
                  }
                })
        },
      };
    }, {} as Record<string, PageItemContents>)
  ;

  await Promise.all([
    fs.writeFile(
      path.resolve(__dirname, 'datos', 'pages.json'),
      JSON.stringify(pagesFiltered, mapJSON, 2),
    )
  ]);

  return pagesFiltered;

}).then(pages => {

  // if (pages != null) {
  //   console.log('writes disabled for debugging');
  //   return Promise.resolve([]);
  // }

  return Promise.all(Object.entries(pages)
    .map(async ([urlId, page]) => {
      if (page.isIndex) {
        console.log('index file write skipped for', urlId);
        return Promise.resolve();
      }

      const {content, isIndex} = page;

      const filename = isIndex
        ? path.resolve(__dirname, '..', 'src', 'pages', urlId, 'index.mdx')
        : path.resolve(__dirname, '..', 'src', 'pages', 'objeto', `${urlId}.mdx`)
      ;

      const mergedContent = content
        .map(el => el.mdx)
        .filter(v => v.trim() != '')
        .join('\n')
        .replace(/\n*\#\s*[^\n]+/g, '')
        .replace(/\n</gm, '\n\n<')
        .replace(/\n\n\n/gm, '\n\n')
        .split('\n')
        .map(v => {
          if (/^\s*<|\/>/.test(v) || /\S+\=['"]\S+['"]/.test(v)) {
            return v;
          }

          return v
            .replace(pageTitle, '')
            .replace(/(2I)?\/\s*Borisov\s*/, '')
          ;
        })
        .join('\n')
        .trim()
        .replace('colavoracion', 'colaboración')
      ;

      if (!isIndex && /<(a|img|figure|table|Image)/.test(mergedContent) === false) {
        console.log('skipping page', page);
        return Promise.resolve();
      }

      const pageTitle = page.title.trim()
        ? page.title.replace(/^\s*[#]\s*/, '')
        : null
      ;

      return fs.mkdirp(path.dirname(filename))
        .then(() =>
          fs.writeFile(
            filename,
            [
              '\nexport const meta = {',
                page.objeto && `\tobjeto: '${page.objeto}',`,
                pageTitle && `\ttitulo: '${pageTitle}',`,
                page.label && `\tetiquetas: '${
                  page.label === PageBasename.sistemaSolar && 'sistema solar'
                  || page.label === PageBasename.cometasAsteroides && 'cometa, asteroide'
                  || page.label
                }',`,
              '};\n',
              pageTitle && `# ${pageTitle}\n`,
              mergedContent
            ]
            .join('\n')
            .replace(/\t/g, '  ')
          )
        )
      ;
    })
  )
});