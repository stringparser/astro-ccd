import { mapTextToUrl } from './util';
import { PageBasename } from 'src/types';

export type StaticItemsProps<T> = {
  props: {
    items: T[];
  };
};

export type RegistroItemEntrada = {
  texto?: string;
  fecha?: string;
  width?: number;
  height?: number;
  imagen?: string;
  imagenOriginal?: string;
};

export type RegistroItem = {
  urlId: string;
  fecha?: string;
  titulo: string;
  objeto: string;
  filename: string;
  etiquetas?: string;

  entradas: Array<RegistroItemEntrada>;
};

export type OrdenablePor<T extends keyof RegistroItem = 'fecha'> = Pick<RegistroItem, T>;

export const ordenarPorFecha = (a: RegistroItem, b: RegistroItem) => {
  let aFecha = a.entradas.find(el => el.fecha)?.fecha;
  let bFecha = b.entradas.find(el => el.fecha)?.fecha;

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
      const filename = path.join('src', 'registro', el);
      const contents = await fs.readFile(filename, 'utf8');
      const { data } = matter(contents);

      const objeto = data.objeto as string;

      const entradas = await Promise.all(Object.entries(data)
        .reduce((acc, [key, value]) => {
          return /_\d+$/.test(key)
            ? acc.concat(value)
            : acc
          ;
        }, [] as RegistroItem['entradas'])
        .map(async (el) => {
          if (el.imagen == null) {
            return el;
          }

          const { width, height } = await imageSize(path.join('public', 'registro', el.imagen));

          return {
            ...el,
            width,
            height,
          };
        })
      );

      const urlId = mapTextToUrl(objeto);

      return {
        urlId,
        titulo: data.titulo || '',
        objeto,
        etiquetas: data.etiquetas || '',
        filename,
        entradas,
      };
    })
  );

  return items.sort(ordenarPorFecha);
}

export const getGalaxias = async () => {
  const registro = await getRegistro();

  return registro
    .filter(el => el.etiquetas === PageBasename.galaxias)
    .sort(ordenarPorFecha)
  ;
};

export const getNebulosas = async () => {
  const registro = await getRegistro();

  return registro
    .filter(el => el.etiquetas === PageBasename.nebulosas)
    .sort(ordenarPorFecha)
  ;
};

export const getSistemaSolar = async () => {
  const registro = await getRegistro();

  return registro
    .filter(el => el.etiquetas === PageBasename.sistemaSolar)
    .sort(ordenarPorFecha)
  ;
};

export const getCometasAsteroides = async () => {
  const registro = await getRegistro();

  return registro
    .filter(el => el.etiquetas === PageBasename.cometasAsteroides)
    .sort(ordenarPorFecha)
  ;
};