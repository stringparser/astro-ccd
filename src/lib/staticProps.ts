import { mapearEntradasValidas, ordenarPorFecha } from './util';

import registroJSON from 'datos/registro.json';

export type StaticItemsProps<T> = {
  props: {
    items: T[];
  };
};

export const getRegistro = () => registroJSON
  .sort(ordenarPorFecha)
;

export const getEtiquetas = () => registroJSON
  .reduce((acc: string[], el) => {
    const etiquetas = el.etiquetas
      .filter(name => !acc.includes(name))
    ;

    return etiquetas.length > 0
      ? acc.concat(...etiquetas)
      : acc
    ;
  }, [])
  .sort()
;

export const getGalaxias = async () => {
  return registroJSON
    .filter(el =>
      el.etiquetas.includes('galaxia')
      || el.etiquetas.includes('supernova')
    )
    .sort(ordenarPorFecha)
  ;
};

export const getNebulosas = async () => {
  return registroJSON
    .filter(el =>
      el.etiquetas.includes('nebulosa')
    )
    .map(mapearEntradasValidas)
    .sort(ordenarPorFecha)
  ;
};

export const getSistemaSolar = async () => {
  return registroJSON
    .filter(el =>
      el.etiquetas.includes('sistema solar')
    )
    .map(mapearEntradasValidas)
    .sort(ordenarPorFecha)
  ;
};

export const getCometasAsteroides = async () => {
  return registroJSON
    .filter(el =>
      el.etiquetas.includes('cometa')
      || el.etiquetas.includes('asteroide')
    )
    .map(mapearEntradasValidas)
    .sort(ordenarPorFecha)
  ;
};