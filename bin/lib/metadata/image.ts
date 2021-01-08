import { ImageProps } from "../types";
import { mapCometImageMetadata } from "./comet-image";
import { mapGalaxyImageMetadata } from "./galaxy-image";

export function mapImageFecha(src: string = '') {
  const fechaDeArchivo = (/_(\d{8})_/.exec((src.split('/').pop() || '')) || ['']).pop();

  if (fechaDeArchivo) {
    return fechaDeArchivo;
  }

  const fechaDeURL = (/\/(\d{4}\/\d{2})\//.exec(src) || ['']).pop().replace('/', '');

  return fechaDeURL;
}

export default function mapImageMetadata(pageURL: string, el: cheerio.Cheerio, textContent: string): ImageProps {
  const alt = el.attr('alt');
  const src = el.attr('data-orig-file') || el.attr('src');
  const _id = (/\/([^\/.]+)\.[^\/\s]+$/.exec(src) || ['']).pop().trim();
  const basename = pageURL.split('/').pop();

  const props: ImageProps = {
    _id,
    src,
    alt,
    type: 'image',
    fecha: mapImageFecha(src),
  };

  if (textContent) {
    props.descripcion = textContent;
  }

  switch (basename) {
    case 'cometasasteroides': {
      return mapCometImageMetadata(props);
    }
    case 'galaxias':
    case 'nebulosas': {
      return mapGalaxyImageMetadata(props);
    }
    default: {
      return props;
    }
  }
}