export type PageItemType = 'text' | 'image' | 'header';

export enum PageBasename {
  galaxias = 'galaxias',
  fuensanta = 'fuensanta',
  nebulosas = 'nebulosas',
  reparacion = 'reparacion-ccd',
  sistemaSolar = 'sistema-solar',
  cometasAsteroides = 'cometas-asteroides',
  construccionObservatorio = 'construccion-del-observatorio',
}

export type PageBasenameList =
  PageBasename.galaxias |
  PageBasename.fuensanta |
  PageBasename.nebulosas |
  PageBasename.reparacion |
  PageBasename.sistemaSolar |
  PageBasename.cometasAsteroides |
  PageBasename.construccionObservatorio
;

export type PageItemContents = {
  urlId: string;
  title: string;
  label: PageBasenameList;
  fecha: string;
  objeto: string;
  isIndex: boolean;
  fechaRE?: string;
  content: Array<PageItemProps & {
    mdx: string;
  }>;
};

export type PageItemProps =
  {
    type: PageItemType;
    urlId: string;
  }
  & Partial<{
    src: string;
    alt: string;
    text: string;
    label: PageBasename;
    fecha: string;
    nombre: string;
    objeto: string;
    isIndex: boolean;
    fechaRE: RegExp;
    localizacion: string;
  }>
;

export type ParsedPageContent = {
  url: string;
  items: PageItemProps[];
};