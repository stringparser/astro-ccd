import { RegistroItem } from "types";

export const mapRegistroURL = (el: RegistroItem) => {
  return `/registro/${el.urlId}`;
}