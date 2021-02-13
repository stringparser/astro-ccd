import { RegistroItem } from "types";

export const mapRegistroURL = (el: Pick<RegistroItem, 'urlId'>) => {
  return `/fotografia/registro/${el.urlId}`;
}