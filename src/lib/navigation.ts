import { RegistroItem } from "src/types";

export const mapRegistroURL = (el: RegistroItem) => {
  return `/registro/${el.urlId}`;
}