import fs from 'fs-extra';
import path from 'path';
import { fetchPageContent } from './lib/get-page-content';
import { fechaTextRE, mapMDX, mapJSON, urlMap } from './lib/util';
import { PageBasename, PageItemContents, PageItemProps } from '../src/types';

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
        ? [ 'fecha', 'label', 'title' ]
        : [ 'fecha', 'label', 'objeto', 'title' ]
      ;

      const mergedContent = content.map(el => el.mdx).join('\n');

      if (!isIndex && /<(a|img|figure|table|Image)/.test(mergedContent) === false) {
        console.log('skipping page', page);
        return Promise.resolve();
      }

      const imagenes = isIndex
        ? []
        : page.content.filter(el => el.type === 'image')
      ;

      const imagesREGroup = imagenes.map(el =>
        path.basename(el.src, path.extname(el.src))
          .trim()
          .replace(/[-_]+/g, '\\s+')
      ).join('|');

      const basenamesRE = new RegExp(`\\s+(${imagesREGroup})|(${imagesREGroup})\\s+`, 'gim');

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

                if (key === 'label' && isIndex) {
                  return page.label
                    ? `etiquetas:\n\t${
                      page.label === 'cometas-asteroides' && 'cometa, asteroide'
                      || `- ${page.label}`
                    }`
                    : null
                  ;
                }

                return value ? `${key}: ${value}` : null;
              }),
              imagenes.length
                ? `imagenes:\n${
                  imagenes.map((el, index) => {
                    const sep = '\n\t\t\t';
                    const base = path.basename(el.src, path.extname(el.src));
                    const srcRE = new RegExp(base.replace(/[-_]+/g, '\\s+'), 'i');

                    const texto = `${el.alt && el.text ? sep : ''}${
                      [el.alt, el.text]
                        .filter(v => v)
                        .join(sep)
                      }`
                      .replace(srcRE, '')
                      .trim()
                      .replace(/\s*([^\n]+)\s+([^\n]+)/gm, `${sep}$1${sep}$2`)
                    ;

                    return `\ttoma${index + 1}:\n\t\t${[
                      `src: ${el.src}`,
                      texto && `texto: ${texto}`,
                      el.localizacion && `posicion: ${el.localizacion}`,
                    ].filter(v => v).join('\n\t\t')}`;
                  }).join('\n')
                }`
                : null
              ,
              '---\n',
            ]
            .filter(v => v)
            .join('\n')
            .replace(basenamesRE, '')
          )
        )
      ;
    })
  )
});