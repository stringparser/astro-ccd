import fs from 'fs-extra';
import path from 'path';
import imageSizeFn from 'image-size';
import { promisify } from 'util';

import { parseMDX } from 'bin/parseMDX';
import { ordenarPorFecha } from 'src/lib/util';

const imageSize = promisify(imageSizeFn);

export type RegistroItemEntrada = {
  type: string;
  src?: string;
  date?: string;
  text?: string;
  width?: number;
  height?: number;
};

export type RegistroItem = {
  urlId: string;
  date?: string;
  titulo: string;
  objeto: string;
  filename: string;
  etiquetas?: string;

  entradas: RegistroItemEntrada[];
};

(async () => {

  const items = await Promise.all(
    (await fs.readdir('src/pages/registro'))
    .filter(el => /\.mdx$/.test(el))
    .map(async (el) => {
      const urlId = path.basename(el, path.extname(el));
      const filename = path.join('src', 'pages', 'registro', el);

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

  const filename = 'datos/registro.json';
  const sortedItems = items.sort(ordenarPorFecha);

  await fs.writeFile(
    filename,
    JSON.stringify(sortedItems, null, 2)
  );

  console.log('wrote', sortedItems.length, 'items to', filename);
})();