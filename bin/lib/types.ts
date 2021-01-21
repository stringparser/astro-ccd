export type PageItemType = 'text' | 'image' | 'header';

export type PageItemProps =
  {
    type: PageItemType;
    urlId: string;
    objectId: string;
  }
  & Partial<{
    src: string;
    alt: string;
    text: string;
    label: string;
    fecha: string;
    nombre: string;
    isIndex: boolean;
    objectId: string;
    fechaRE?: RegExp;
    localizacion: string;
  }>
;

export type ParsedPageContent = {
  url: string;
  items: PageItemProps[];
};