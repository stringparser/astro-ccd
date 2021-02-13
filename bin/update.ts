Error.stackTraceLimit = Infinity;

import fs from 'fs-extra';
import path from 'path';
import imageSizeFn from 'image-size';
import { promisify } from 'util';

import { parseMDX } from './parseMDX';
import { esEntradaValidaConImagen, ordenarPorFecha } from '../src/lib/util';
import { RegistroItem } from 'types';

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
      } as RegistroItem;
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

  const itemsOneImageFile = 'cache/registro-solo-ultima-fotografia.json';
  const itemsOneImage = itemsWithImages
    .map(({ entradas: [entrada], ...el }) => {
      return {
        ...el,
        entradas: [entrada],
      };
    })
  ;

  await fs.writeFile(
    itemsOneImageFile,
    JSON.stringify(itemsOneImage, null, 2)
  );

  console.log('wrote', itemsOneImage.length, 'items to', itemsOneImageFile);

  const metadataFilename = 'cache/registro-metadata.json';
  const metadataItems = itemsWithImages
    .filter(el => el.tipo != null || el.tipo != '')
    .map(({ entradas, ...el }) => {
      return el;
    })
  ;

  await fs.writeFile(
    metadataFilename,
    JSON.stringify(metadataItems, null, 2)
  );

  console.log('wrote', metadataItems.length, 'items to', metadataFilename);

  const tiposFilename = 'cache/registro-etiquetas.json';
  const tiposJSON = itemsWithImages.reduce((acc: string[], el) => {
    const newTipos = el.tipo
      .split(',')
      .filter(name => !acc.includes(name))
    ;

    return acc.concat(newTipos);
  }, [])
  .map(v => v.trim())
  .filter(v => v !== '')
  .sort();

  await fs.writeFile(
    tiposFilename,
    JSON.stringify(tiposJSON,  null, 2)
  );

  console.log('wrote', tiposFilename.length, 'to', tiposFilename);

  const ultimasEntradasJSON = itemsWithImages.slice(0, 9);
  const ultimasEntradasFilename = 'cache/ultimas-entradas.json';

  await fs.writeFile(
    ultimasEntradasFilename,
    JSON.stringify(ultimasEntradasJSON,  null, 2)
  );

  console.log('wrote', ultimasEntradasJSON.length, 'to', ultimasEntradasFilename);

  const lastItemsPerEtiqueta = (await Promise.all(tiposJSON
    .map((tipo): [string, typeof itemsWithImages] => [
      tipo,
      itemsWithImages.filter(el =>
        el.tipo.split(',')[0] === tipo
      )
    ])
    .filter(([tipo, items]) => items.length > 0)
    .map(async ([tipo, items]) => {
      items.sort(ordenarPorFecha);

      const filename = `cache/registro-${tipo}.json`;
      const serializedItems = JSON.stringify(items, null, 2);

      await fs.writeFile(filename, serializedItems);

      console.log('wrote', items.length, 'to', filename);

      return {
        ...items[0],
        tipo,
      } as RegistroItem;
    })
  )).sort((a, b) => {
    const [{ date: dateA = '' }] = a.entradas;
    const [{ date: dateB = '' }] = b.entradas;

    return dateB.localeCompare(dateA);
  });

  const lastItemsPerEtiquetaFilename = 'cache/ultimas-entradas-por-etiqueta.json';

  await fs.writeFile(
    lastItemsPerEtiquetaFilename,
    JSON.stringify(lastItemsPerEtiqueta,  null, 2)
  );

  console.log('wrote', lastItemsPerEtiqueta.length, 'to', lastItemsPerEtiquetaFilename);

  const lastItemPerEtiquetaFilename = 'cache/ultima-entrada-por-etiqueta.json';
  const lastItemPerEtiquetaJSON = lastItemsPerEtiqueta
    .map(el => {
      const [entrada] = el.entradas;
      return {
        ...el,
        entradas: [entrada]
      }
    })
  ;

  await fs.writeFile(
    lastItemPerEtiquetaFilename,
    JSON.stringify(lastItemPerEtiquetaJSON,  null, 2)
  );

  console.log('wrote', lastItemPerEtiquetaJSON.length, 'to', lastItemPerEtiquetaFilename);
})();