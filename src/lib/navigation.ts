import { mapTextToUrl } from "src/lib/util";
import { RegistroItem, RegistroItemEntrada } from "types";

export const mapRegistroURL = (
  el: Pick<RegistroItem, 'urlId'>,
  tipo?: string,
  entrada?: RegistroItemEntrada,
) => {
  const base = `/fotografia/registro/${el.urlId}`;

  const href = tipo
    ? `${base}?tipo=${tipo}`
    : base
  ;

  return entrada
    ? `${href}#${mapTextToUrl(entrada.src)}`
    : href
  ;
}