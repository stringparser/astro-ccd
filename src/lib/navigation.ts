import { RegistroItem } from "types";

export const mapRegistroURL = (el: RegistroItem) => {
  return `/fotografia/registro/${el.urlId}`;
}