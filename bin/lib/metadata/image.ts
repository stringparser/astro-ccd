import { ImageProps } from "../types";
import { mapCometImageMetadata } from "./comet-image";
import { mapGalaxyImageMetadata } from "./galaxy-image";

export function mapImageFecha(src: string = '') {
  const fechaDeArchivo = (/_(\d{8})[_.i]/.exec((src.split('/').pop() || '')) || ['']).pop();

  if (fechaDeArchivo) {
    return fechaDeArchivo;
  }

  const fechaConMesDeArchivo = (/_(\d{1,2})julio(\d{4})[_.i]/i.exec((src.split('/').pop() || '')) || [])
    .join();

  if (fechaConMesDeArchivo) {
    return fechaDeArchivo.replace(/julio/i, '7');
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
    fecha: mapImageFecha(src),
  };

  if (textContent) {
    props.descripcion = textContent;
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