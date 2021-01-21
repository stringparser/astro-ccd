import { PageItemProps } from "./types";

export const cleanHTML = (html: string = '') => {
  return (html
    .replace(/&nbsp;/gm, '\n')
    .replace(/(id|dir|rel|title|style|class)\s*=\s*["'][^'"]+["']/gm, '')
    .replace(/<br\s*\/?>/gm, '')
    .replace(/\s*(<|<\/)(em|span|h\d+|strong)\s*>\s*/gm, '')
    .trim()
    .replace(/\s+/g, ' ')
    .replace(/<a (target=['"]_blank['"])?\s*href=\s*["'][^\s'"]+["']\s*(target=['"]_blank['"])?\s*>(\s*)<\/a>/gm, '')
    .replace(/allowfullscreen(=['"]true['"])?/, 'allowFullScreen')
  );
}

export const mapTextToUrl = (input: string = '') => {
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
    .replace(/\s+/g, '-')
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

export const mapMDX = (el: PageItemProps, index: number) => {
  switch (el.type) {
    case 'text': {
      return el.text;
    }
    case 'header': {
      return `# ${el.text}`;
    }
    case 'image': {
      return [
        `<img src="${el.src}" />`,
        cleanHTML(el.text)
      ].filter(v => v).join('\n\n');
    }
  }
}

export const urlIdsHarcoded = {
  jupiterSaturno: '20201220-jupiter-saturno',
};

export const mapItemProps =
  (basename: string) =>
  (item: PageItemProps, index: number, items: PageItemProps[]) => {
    const { urlId, ...props } = item;

    if (item.text === 'jupiter-saturno-20diciembre2020-2') {
      return {
        ...props,
        text: 'Conjunción de Júpiter y Saturno',
        urlId: urlIdsHarcoded.jupiterSaturno,
      };
    }

    if (item.text === 'Conjuncion Jupiter &amp; Saturno') {
      return {
        ...props,
        text: '',
        urlId: urlIdsHarcoded.jupiterSaturno,
      };
    }

    if (item.text === 'GALAXIAS/SUPERNOVAS' || /Lista de códigos MPC/.test(props.text)) {
      return {
        ...props,
        urlId: 'galaxias',
      };
    }

    if (!urlId || /^(text|header)$/.test(props.type)) {
      const next = items[index + 1];

      const result: PageItemProps = {
        urlId: basename,
        ...props,
      };

      if (
        next?.fecha?.length >= 6
        && !/^\/fuensanta/.test(next?.label)
      ) {
        result.urlId = next.urlId;
      }

      return result;
    }

    return item;
  }
;

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

export const fechaTextRE = new RegExp([
  '(\\d{1,2})',
  '(?:\\s*(de)?\\s*)',
  `(${Object.keys(mesMap).join('|')})`,
  '(?:\\s*(de)?\\s*)',
  '(\\d{4})'
].join(''), 'i');

const fechaNombreArchivoRE = new RegExp([
  '(\\d{1,2})',
  '-?',
  `(${Object.keys(mesMap).join('|')})`,
  '-?',
  '(\\d{4})'
].join(''), 'i');

export function mapFecha(props: PageItemProps): PageItemProps & { fechaRE?: RegExp; } {
  const {
    src = '',
    fecha,
  } = props;

  if (fecha) {
    return props;
  }

  if (src === 'https://astroccd.files.wordpress.com/2020/07/2020f3hdr.jpg') {
    return {
      ...props,
      fecha: '20200719'
    };
  }

  if (src === 'https://astroccd.files.wordpress.com/2012/12/c2014j2_1_20.jpg') {
    return {
      ...props,
      fecha: '20140915',
    };
  }

  const text = [props.text, props.alt].filter(v => v).join('\n');

  if (/youtu\.be\/po6as9H-_hk/i.test(text)) {
    return {
      ...props,
      fecha: '20140915',
    };
  }

  if (/%28308635%29_2005_YU55/.test(text)) {
    return {
      ...props,
      fecha: '20111100',
    };
  }

  const fechaDeTexto = fechaTextRE.exec(text);

  if (fechaDeTexto) {
    const [dia, mes, año] = fechaDeTexto.slice(1).filter(v => v);

    const result = [
      año,
      mesMap[mes.toLowerCase()],
      dia.length === 1 ? `0${dia}` : dia
    ].join('');

    return {
      ...props,
      fecha: result,
      fechaRE: fechaTextRE,
    };
  }

  const fechaConMesDeArchivo = fechaNombreArchivoRE.exec(src.split('/').pop() || '');

  if (fechaConMesDeArchivo) {
    const [dia, mes, año] = fechaConMesDeArchivo.slice(1).filter(v => v);

    return {
      ...props,
      fecha: [
        año,
        mesMap[mes.toLowerCase()],
        dia.length === 1 ? `0${dia}` : dia
      ].join(''),
      fechaRE: fechaNombreArchivoRE,
    };
  }

  const fechaDeArchivo = (/_(\d{8})[_.i]/.exec((src.split('/').pop() || '')) || ['']).pop();

  if (fechaDeArchivo) {
    return {
      ...props,
      fecha: fechaDeArchivo,
    };
  }

  const fechaDeURL = (/\/(\d{4}\/\d{2})\//.exec(src) || ['']).pop().replace('/', '');

  if (fechaDeURL) {
    return {
      ...props,
      fecha: `${fechaDeURL}00`
    };
  }

  return props;
}