export type PageItemType = 'text' | 'image' | 'header';

export enum PageBasename {
  fuensanta = 'fuensanta',
  cometasAsteroides = 'cometas-asteroides',
  galaxias = 'galaxias',
  nebulosas = 'nebulosas',
  sistemaSolar = 'sistema-solar',
  construccionObservatorio = 'construccion-del-observatorio',
  reparacionCCD = 'reparacion-ccd',
}

export type PageBasenameList =
  PageBasename.galaxias |
  PageBasename.fuensanta |
  PageBasename.nebulosas |
  PageBasename.sistemaSolar |
  PageBasename.reparacionCCD |
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