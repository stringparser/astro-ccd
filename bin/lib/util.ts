export function mapImageFecha(src: string) {
  const fechaDeArchivo = (/_(\d{8})_/.exec((src.split('/').pop() || '')) || ['']).pop();

  if (fechaDeArchivo) {
    return fechaDeArchivo;
  }

  const fechaDeURL = (/\/(\d{4}\/\d{2})\//.exec(src) || ['']).pop().replace('/', '');

  return fechaDeURL;
}