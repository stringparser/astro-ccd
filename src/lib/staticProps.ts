import { RegistroItem } from 'bin/registro';
import { mapearEntradasValidas } from './util';

import registroJSON from 'datos/registro.json';

export type StaticItemsProps<T> = {
  props: {
    items: T[];
  };
};

export const getRegistro = () => registroJSON
  .sort(ordenarPorFecha)
;

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
      /sistema[-\s]solar/.test(el.etiquetas)
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