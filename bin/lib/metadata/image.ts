import { ImageProps } from "../types";
import { mapCometImageMetadata } from "./comet-image";
import { mapGalaxyImageMetadata } from "./galaxy-image";

const mesMap = {
  enero: '01',
  febrero: '02',
  marzo: '03',
  abril: '04',
  mayo: '05',
  junio: '06',
  julio: '07',
  agosto: '08',
  septembre: '09',
  octubre: '10',
  noviembre: '11',
  diciembre: '12',
};

export function mapImageFecha(props: ImageProps) {
  const {
    src = '',
    text,
  } = props;

  const fechaDeTexto = new RegExp([
    '(\\d{1,2})',
    '(?:\\s*(de)?\\s*)',
    `(${Object.keys(mesMap).join('|')})`,
    '(?:\\s*(de)?\\s*)',
    '(\\d{4})'
  ].join(''), 'i').exec(text);

  if (fechaDeTexto) {
    const [dia, mes, año] = fechaDeTexto.slice(1).filter(v => v);

    const result = [
      año,
      mesMap[mes.toLowerCase()],
      dia.length === 1 ? `0${dia}` : dia
    ].join('');

    return result;
  }

  const fechaDeArchivo = (/_(\d{8})[_.i]/.exec((src.split('/').pop() || '')) || ['']).pop();

  if (fechaDeArchivo) {
    return fechaDeArchivo;
  }

  const fechaConMesDeArchivo = (/_(\d{1,2})julio(\d{4})[_.i]/i.exec((src.split('/').pop() || '')) || [])
    .join();

  if (fechaConMesDeArchivo) {
    return fechaDeArchivo.replace(/julio/i, '07');
  }

  const fechaDeURL = (/\/(\d{4}\/\d{2})\//.exec(src) || ['']).pop().replace('/', '');

  return fechaDeURL;
}

export default function mapImageMetadata(pageURL: string, el: cheerio.Cheerio, textContent: string): ImageProps {
  const alt = el.attr('alt');
  const src = el.attr('data-orig-file') || el.attr('src');

  const id = (/\/([^\/.]+)\.[^\/\s]+$/.exec(src) || ['']).pop().trim();
  const basename = pageURL.split('/').pop();

  const props: ImageProps = {
    src,
    alt,
    type: 'image',
  };

  if (textContent) {
    props.text = textContent;
  }

  switch (basename) {
    case 'cometasasteroides': {
      return mapCometImageMetadata({ ...props, id });
    }
    case 'galaxias':
    case 'nebulosas': {
      return mapGalaxyImageMetadata({ ...props, id });
    }
    default: {
      return props;
    }
  }
}