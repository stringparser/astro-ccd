import { PageItemProps } from "../../../src/types";
import { urlIdsHarcoded } from "../util";

export function mapSolarSystemImageMetadata(props: PageItemProps): PageItemProps {
  const { src, text, objeto: id } = props;

  if (
    src === 'https://astroccd.files.wordpress.com/2020/12/jupiter-saturno-20diciembre2020-2.png'
  ) {
    const { text, ...rest } = props;

    return {
      ...rest,
      urlId: urlIdsHarcoded.jupiterSaturno,
      fecha: '20201220',
      objeto: 'jupiter,saturno',
      nombre: 'Conjunción Júpiter y Saturno',
    };
  }

  if (text === 'jupiter-saturno-20diciembre2020-2') {
    return {
      ...props,
      urlId: urlIdsHarcoded.jupiterSaturno,
      text: 'Conjunción de Júpiter y Saturno',
    };
  }

  if (text === 'Conjuncion Jupiter &amp; Saturno') {
    return {
      ...props,
      urlId: urlIdsHarcoded.jupiterSaturno,
    };
  }

  if (src === 'https://astroccd.files.wordpress.com/2020/12/1_152049_l5_ap666.png') {
    return {
      ...props,
      fecha: '20201201',
      urlId: '20201201-sol',
      objeto: 'sol'
    };
  }

  if (/eclipse-3-marzo-2007/.test(src)) {
    return {
      ...props,
      urlId: '20070303-eclipse-lunar',
      fecha: '20070303',
      objeto: 'luna',
      nombre: 'eclipse lunar'
    };
  }

  if (
    /transito-venus/.test(src)
    || src === 'https://astroccd.files.wordpress.com/2014/04/ccdcap0007-copia.gif'
    || src === 'https://astroccd.files.wordpress.com/2014/04/ccdcap0017.jpg'
    || src === 'https://astroccd.files.wordpress.com/2014/04/ccdcap0034.jpg'
    || src === 'https://astroccd.files.wordpress.com/2014/04/ccdcap0050.jpg'
  ) {
    return {
      ...props,
      urlId: '20040608-transito-venus',
      fecha: '20040608',
      objeto: 'venus',
      nombre: 'transito de venus',
    }
  }

  if (
    src === 'https://astroccd.files.wordpress.com/2020/12/jupiter-saturno--2.png'
    || src === 'https://astroccd.files.wordpress.com/2020/12/conjuncion.gif'
    || src === 'https://astroccd.files.wordpress.com/2020/12/jupiter-saturno-20diciembre2020-2.png'
  ) {

    return {
      ...props,
      urlId: '20211221-conjuncion-jupiter-saturno',
      fecha: '20211221',
      objeto: 'jupiter,saturno',
      nombre: 'Conjunción de Jupiter y Saturno'
    };
  }

  if (/2014\/04\/(luna-|ecclipse1_20marzo)/.test(src)) {
    return {
      ...props,
      urlId: '20150320-eclipse-luna',
      fecha: '20150320',
      objeto: 'luna',
      nombre: 'eclipse luna',
    };
  }

  if (/conjuncion-19-junio-venus-luna/.test(src)) {
    return {
      ...props,
      urlId: '20070618-conjuncion-luna-venus',
      fecha: '20070618',
      objeto: 'luna,venus',
      nombre: 'conjuncion luna venus',
    };
  }

  if (src === 'https://astroccd.files.wordpress.com/2014/04/luna_14noviembre2016.jpg') {
    return {
      ...props,
      fecha: '20161114',
      urlId: '20161114-luna',
      objeto: 'luna'
    }
  }

  if (id === '1_152049_l5_ap666') {
    return {
      ...props,
      fecha: '20201201',
      urlId: '20201200-sol',
      objeto: 'sol',
    };
  }

  if (src === 'https://astroccd.files.wordpress.com/2020/11/img-20201030-wa0020.jpg?w=736') {
    return {
      ...props,
      fecha: '20201029',
      urlId: '20201029-marte',
      objeto: 'marte',
    }
  }

  return props;
};