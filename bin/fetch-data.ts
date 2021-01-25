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
        : path.resolve(__dirname, '..', 'src', 'registro', `${urlId}.mdx`)
      ;

      const frontMatterKeys: Array<keyof typeof page> = isIndex
        ? [ 'label' ]
        : [ 'objeto', 'label' ]
      ;

      const mergedContent = content.map(el => el.mdx).join('\n');

      if (!isIndex && /<(a|img|figure|table|Image)/.test(mergedContent) === false) {
        console.log('skipping page', page);
        return Promise.resolve();
      }

      const imagenes = isIndex
        ? []
        : page.content.filter(el => el.type === 'image')
          .sort((a, b) => (b.fecha || '').localeCompare(a.fecha || ''))
      ;

      const pageTitle = page.title.trim()
        ? page.title.replace(/^\s*[#]\s*/, '')
        : null
      ;

      const imagesLength = imagenes.length;

      return fs.mkdirp(path.dirname(filename))
        .then(() =>
          fs.writeFile(
            filename,
            [
              '---',
              pageTitle && `titulo: ${pageTitle}`,
              frontMatterKeys.map(key => {
                const value = page[key];

                if (typeof value !== 'string') {
                  return null;
                }

                if (key === 'label') {
                  return page.label.trim()
                    ? `etiquetas: ${page.label}`
                    : null
                  ;
                }

                return (value || '').trim()
                  ? `${key}: ${value}`
                  : null
                ;
              }).join('\n'),

              imagesLength > 0 && '\n#\n# NOTA: entradas ordenadas por fecha (la primera es la última que se hizo)\n#',
              imagenes.map((el, index) => {
                const base = path.basename(el.dest, path.extname(el.dest)).replace(/\?[^\s]+/, '');
                const srcRE = new RegExp(base.replace(/[-_]+/ig, '\\s+'), 'i');

                const texto = (el.text || '')
                  .replace(srcRE, '')
                  .replace(/\s+/g, ' ')
                  .replace(pageTitle, '')
                  .replace(/[A-Z]?\/[^\s]{3,}/, '')
                  .replace('Imagen del Asteroide 99942 (Apophis)', '')
                  .replace(/((P\s+\/\s+)?P\s+Holmes|Cometa\s+P\s+17\s+P)\s*/, '')
                  .trim()
                ;

                return `\nentrada_${imagesLength - index}:\n\t\t${[
                  `fecha: ${el.fecha}`,
                  `imagen: ${path.basename(el.dest)}`,
                  texto && `texto: ${texto}`,
                  `imagenOriginal: ${path.basename(el.src)}`,
                ].filter(v => v).join('\n\t\t')}`;
              }).join('\n')
              ,
              '---\n',
            ]
            .join('\n')
            .replace(/\t/g, '  ')
          )
        )
      ;
    })
  )
});