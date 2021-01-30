import { mapearEntradasValidas } from './util';
import { ParsedRemarkImage, parseMDX } from './parseMDX';

export type StaticItemsProps<T> = {
  props: {
    items: T[];
  };
};

export type RegistroItemEntrada = {
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

  entradas: Array<RegistroItemEntrada>;
};

export type OrdenablePor<T extends keyof RegistroItem = 'date'> = Pick<RegistroItem, T>;

export const ordenarPorFecha = (a: RegistroItem, b: RegistroItem) => {
  let aFecha = a.entradas.find(el => el.date)?.date;
  let bFecha = b.entradas.find(el => el.date)?.date;

  if (aFecha && aFecha.length === 6) {
    aFecha = `${aFecha}00`;
  }

  if (bFecha && bFecha.length === 6) {
    bFecha = `${bFecha}00`;
  }

  return (`${bFecha || ''}`).localeCompare(`${aFecha || ''}`);
};

export const getRegistro = async (): Promise<RegistroItem[]> => {
  const fs = await import('fs-extra');
  const path = await import('path');
  const matter = (await import('gray-matter')).default;
  const { promisify } = await import('util');

  const imageSize = promisify((await import('image-size')).default);

  const items = await Promise.all(
    (await fs.readdir('src/registro'))
    .filter(el => /\.mdx$/.test(el))
    .map(async (el) => {
      const urlId = path.basename(el, path.extname(el));
      const filename = path.join('src', 'registro', el);
      const fileContents = await fs.readFile(filename, 'utf8');

      const { data, content: restContent } = matter(fileContents);

      const {
        objeto = '',
        etiquetas = '',
      } = data;

      const contents = await parseMDX(filename, restContent);

      const titulo = contents.reduce((acc, el) => {
        if (acc) {
          return acc;
        }

        return el.type === 'heading' && el.text
          ? el.text
          : acc
        ;
      }, '');

      const entradas = await Promise.all(contents
        .filter(el =>
          el.type === 'image'
        )
        .map(async (el: ParsedRemarkImage) => {
          const { width, height } = await imageSize(path.join('public', el.src));

            return {
              src: el.src,
              date: el.date || el.fecha,
              urlId,
              width,
              height,
            };
        })
      );

      return {
        urlId,
        titulo,
        objeto,
        filename,
        entradas,
        etiquetas,
      };
    })
  );

  return items.sort(ordenarPorFecha);
}

export const getGalaxias = async () => {
  const registro = await getRegistro();

  return registro
    .filter(el =>
      el.etiquetas.includes('galaxia')
      || el.etiquetas.includes('supernova')
    )
    .sort(ordenarPorFecha)
  ;
};

export const getNebulosas = async () => {
  const registro = await getRegistro();

  return registro
    .filter(el =>
      el.etiquetas.includes('nebulosa')
    )
    .map(mapearEntradasValidas)
    .sort(ordenarPorFecha)
  ;
};

export const getSistemaSolar = async () => {
  const registro = await getRegistro();

  return registro
    .filter(el =>
      /sistema[-\s]solar/.test(el.etiquetas)
    )
    .map(mapearEntradasValidas)
    .sort(ordenarPorFecha)
  ;
};

export const getCometasAsteroides = async () => {
  const registro = await getRegistro();

  return registro
    .filter(el =>
      el.etiquetas.includes('cometa')
      || el.etiquetas.includes('asteroide')
    )
    .map(mapearEntradasValidas)
    .sort(ordenarPorFecha)
  ;
};