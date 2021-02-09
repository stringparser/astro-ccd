import { useEffect, useLayoutEffect } from "react";
import { RegistroItemEntrada, RegistroItem } from "types";

export const mesMap = {
  enero: '01',
  febrero: '02',
  marzo: '03',
  abril: '04',
  mayo: '05',
  junio: '06',
  julio: '07',
  ago: '08',
  agosto: '08',
  Aagosto: '08',
  sep: '09',
  septiembre: '09',
  ocubre: '10',
  octubre: '10',
  noviembre: '11',
  diciembre: '12',
};

export const mapTextToUrl = (input: string) => {

  const text =
    /aeztoztwby1kc05sznhqmnc/i.test(input) && 'c2017-k2' 
    || /aeZtOZTwOUF2MlkwQWVoaG8/i.test(input) && 'c2014-q2'
    || /youtu\.be\/po6as9H\-\_hk/i.test(input) && 'c2011-J2'
    || /29_2005_yu55/i.test(input) && '2005-yu55'
    || input
  ;

  return (text
    .replace(/[\/()]+/g, '')
    .trim()
    .replace(/[\s,._+]+/g, '-')
    .replace(/^c/i, 'c')
    .replace(/^-|-$/g, '')
    .replace(/\+\d+$/, '')
    .toLowerCase()
    .replace(/^(at|sn)-?(\d+)-?(\S*)$/, '$1$2-$3')
    .replace(/^(?:cometa-?)?c?(\d{4})-?(\S{2}|\S{4})$/i, 'c$1-$2')
    .replace(/^(?:cometa-)?(\d+)(i|p)[-a-z0-9]*/i, ($0, $1: string, $2: string) => {
      if ($1 && $2) {
        return `${$1}${$2.toUpperCase()}`;
      }

      return $0;
    })
    .replace(/-[-]+/g, '-')
  );
};

export const esEntradaValidaConImagen = ({ date, src }: RegistroItemEntrada) => (
  date
  && src
  && !/logo/.test(src)
  && !/rainbowl/.test(src)
  && !/obras[^.\s]+\.gif$/.test(src)
);

export const mapearEntradasValidas = (el: RegistroItem) => {
  return {
    ...el,
    entradas: el.entradas.filter(esEntradaValidaConImagen),
  }
};

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

export const mapRegistroRoute = (el: RegistroItem) => {
  return `/registro/${el.urlId}`;
};

export const useIsomorphicLayoutEffect =
  typeof window !== 'undefined' ? useLayoutEffect : useEffect
;

export const capitalize = (value: string) => {
  return value
    .replace(/[-]/g, ' ')
    .replace(/(\S+)/g, ($0, $1: string) => {
      return `${$1.charAt(0).toUpperCase()}${$1.slice(1).toLocaleLowerCase()}`;
    })
  ;
}

export const mapTagTextTitle = (value: string) => {
  const text = capitalize(value);

  switch (text) {
    case 'Cometas Asteroides': {
      return 'Cometas y Asteroides';
    }
    default: {
      return text;
    }
  }
};

export const mapFormattedDate = (value: string) => {
  return (/(\d{4})(\d{2})(\d{2})?/.exec(value) || [])
    .slice(1)
    .reverse()
    .join('/')
    .replace(/^00\//, '')
  ;
};