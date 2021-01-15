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

export const mapItemProps =
  (basename: string) =>
  (item: PageItemProps, index: number, items: PageItemProps[]) => {
    const { id, ...it } = item;

    if (/Lista de códigos MPC/.test(item.text)) {
      return {
        ...it,
        url: `/${basename}`,
      };
    }

    if (!id || /^(text|header)$/.test(it.type)) {
      const next = items[index + 1];

      const result = {
        ...it,
        url: `/${basename}`,
      };

      if (
        next?.fecha?.length >= 6
        && !/^\/fuensanta/.test(next?.url)
      ) {
        result.url = next.url;
        result.fecha = next.fecha;
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
  septembre: '09',
  octubre: '10',
  noviembre: '11',
  diciembre: '12',
};

const fechaTextRE = new RegExp([
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

export function mapFecha(props: PageItemProps) {
  const {
    src = '',
    fecha,
  } = props;

  if (fecha) {
    return fecha;
  }

  if (src === 'https://astroccd.files.wordpress.com/2020/07/2020f3hdr.jpg') {
    return '20200719';
  }

  if (src === 'https://astroccd.files.wordpress.com/2012/12/c2014j2_1_20.jpg') {
    return '20140915';
  }

  const text = [props.text, props.alt].filter(v => v).join('\n');

  if (/youtu\.be\/po6as9H-_hk/i.test(text)) {
    return '20140915';
  }

  if (/%28308635%29_2005_YU55/.test(text)) {
    return
  }

  const fechaDeTexto = fechaTextRE.exec(text);

  if (fechaDeTexto) {
    const [dia, mes, año] = fechaDeTexto.slice(1).filter(v => v);

    const result = [
      año,
      mesMap[mes.toLowerCase()],
      dia.length === 1 ? `0${dia}` : dia
    ].join('');

    return result;
  }

  const fechaConMesDeArchivo = fechaNombreArchivoRE.exec(src.split('/').pop() || '');

  if (fechaConMesDeArchivo) {
    const [dia, mes, año] = fechaConMesDeArchivo.slice(1).filter(v => v);

    return [
      año,
      mesMap[mes.toLowerCase()],
      dia.length === 1 ? `0${dia}` : dia
    ].join('');
  }

  const fechaDeArchivo = (/_(\d{8})[_.i]/.exec((src.split('/').pop() || '')) || ['']).pop();

  if (fechaDeArchivo) {
    return fechaDeArchivo;
  }

  const fechaDeURL = (/\/(\d{4}\/\d{2})\//.exec(src) || ['']).pop().replace('/', '');

  if (fechaDeURL) {
    return fechaDeURL;
  }

  return '';
}