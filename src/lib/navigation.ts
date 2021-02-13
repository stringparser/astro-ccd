import { mapTextToUrl } from "src/lib/util";
import { RegistroItem, RegistroItemEntrada } from "types";

export const mapRegistroURL = (
  el: Pick<RegistroItem, 'urlId'>,
  tipo: string,
  entrada?: RegistroItemEntrada,
) => {
  const href = `/fotografia/registro/${el.urlId}?tipo=${tipo}`;

  return entrada
    ? `${href}#${mapTextToUrl(entrada.src)}`
    : href
  ;
}