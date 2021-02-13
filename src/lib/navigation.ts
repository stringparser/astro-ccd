import { mapTextToUrl } from "src/lib/util";
import { RegistroItem, RegistroItemEntrada } from "types";

export const mapRegistroURL = (
  el: Pick<RegistroItem, 'urlId'>,
  entrada?: RegistroItemEntrada,
) => {
  const href = `/fotografia/registro/${el.urlId}`;

  return entrada
    ? `${href}#${mapTextToUrl(entrada.src)}`
    : href
  ;
}