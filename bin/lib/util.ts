import { html_beautify } from "js-beautify";
import { PageBasename, PageItemProps } from "../../src/types";

export const urlMap = {
  'ccd-2': PageBasename.reparacionCCD,
  'galaxias': PageBasename.galaxias,
  'nebulosas': PageBasename.nebulosas,
  'fuensanta-3': PageBasename.fuensanta,
  'cometasasteroides': PageBasename.cometasAsteroides,
  'planetas-satelites': PageBasename.sistemaSolar,
  'construccion-del-observatorio': PageBasename.construccionObservatorio,
};

export type ActualPageBasename = keyof typeof urlMap;

export const baseUrlMapsRE = new RegExp(`^${Object.values(urlMap).join('|')}$`, 'i');

export const standalonePagesRE = new RegExp(`^${[
  urlMap['ccd-2'],
  urlMap['fuensanta-3'],
  urlMap['construccion-del-observatorio'],
].join('|')}$`, 'i');

export const cleanHTML = (html: string = '') => {
  return html
    .replace(/&nbsp;/gm, '\n')
    .replace(/(id|dir|rel|title|style|class)\s*=\s*["'][^'"]+["']/gm, '')
    .replace(/<br\s*\/?>/gm, '')
    .replace(/\s*(<|<\/)(em|span|h\d+|strong)\s*>\s*/gm, '')
    .trim()
    .replace(/\s+/g, ' ')
    .replace(/allowfullscreen(=['"]true['"])?/, 'allowFullScreen')
    .replace(/<a (?:target=['"]_blank['"])?\s*href=\s*\\?["'][^\s'"]+\\?["']\s*(?:target=['"]_blank['"])?\s*>([^><]*)<\/a>/gm, '$1')
    .trim()
  ;
}

export const mapMDX = (el: PageItemProps) => {
  switch (el.type) {
    case 'text': {
      return el.text;
    }
    case 'header': {
      return `# ${el.text}`;
    }
    case 'image': {
      return html_beautify(
        [
          `\n<Imagen src="${el.src}" />`,
          el.alt,
          cleanHTML(el.text)
        ].filter(v => v).join('\n\n'),
        {
          indent_char: ' ',
          indent_size: 2,
        }
      );
    }
  }
}

export const urlIdsHarcoded = {
  jupiterSaturno: '20201220-jupiter-saturno',
};

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
  '(?:\\s*(de)?\\s*|[-_\\s]*)',
  `(${Object.keys(mesMap).join('|')})`,
  '(?:\\s*(de)?\\s*|[-_\\s]*)',
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

export const mapJSON = function (key: string, value: any) {
  if (value instanceof RegExp) {
    return undefined;
  }

  return value;
};