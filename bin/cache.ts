Error.stackTraceLimit = Infinity;

import fs from 'fs-extra';
import path from 'path';
import imageSizeFn from 'image-size';
import { promisify } from 'util';

import { parseMDX } from './parseMDX';
import { esEntradaValidaConImagen, ordenarPorFecha } from '../src/lib/util';

const imageSize = promisify(imageSizeFn);

(async () => {

  const items = await Promise.all(
    (await fs.readdir('src/pages/fotografia/registro'))
    .filter(el => /\.mdx$/.test(el))
    .map(async (el) => {
      const urlId = path.basename(el, path.extname(el));
      const filename = path.join('src', 'pages', 'fotografia', 'registro', el);

      const result = await parseMDX(filename);

      const entradas = await Promise.all(result.items
        .map(async (el) => {
          if (el.type === 'image') {
            const { width, height } = await imageSize(path.join('public', el.src));

            return {
              type: el.type,
              src: el.src,
              date: el.date || el.fecha,
              urlId,
              width,
              height,
            };
          }

          return el;
        })
      );

      return {
        ...result.meta,
        urlId,
        filename,
        entradas,
      };
    })
  );

  const filename = 'cache/registro.json';
  const sortedItems = items.sort(ordenarPorFecha);

  await fs.writeFile(
    filename,
    JSON.stringify(sortedItems, null, 2)
  );

  console.log('wrote', sortedItems.length, 'items to', filename);

  const itemsWithImagesFile = 'cache/registro-fotografia.json';
  const itemsWithImages = sortedItems
    .filter(el => el.tipo != null || el.tipo != '')
    .map(el => {
      return {
        ...el,
        entradas: el.entradas.filter(esEntradaValidaConImagen)
      };
    })
    .filter(el => el.entradas.length > 0)
    .sort(ordenarPorFecha)
  ;

  await fs.writeFile(
    itemsWithImagesFile,
    JSON.stringify(itemsWithImages, null, 2)
  );

  console.log('wrote', itemsWithImages.length, 'items to', itemsWithImagesFile);

  const tiposFilename = 'cache/registro-etiquetas.json';
  const tiposJSON = itemsWithImages.reduce((acc: string[], el) => {
    return acc.includes(el.tipo)
      ? acc
      : acc.concat(el.tipo)
    ;
  }, [])
  .sort();

  await fs.writeFile(
    tiposFilename,
    JSON.stringify(tiposJSON,  null, 2)
  );

  console.log('wrote', tiposFilename.length, 'tipos en', tiposFilename);
  const ultimasEntradasJSON = itemsWithImages.slice(0, 9);

  const ultimasEntradasFilename = 'cache/ultimas-entradas.json';

  await fs.writeFile(
    ultimasEntradasFilename,
    JSON.stringify(ultimasEntradasJSON,  null, 2)
  );

  console.log('wrote', ultimasEntradasJSON.length, 'en', ultimasEntradasFilename);
})();