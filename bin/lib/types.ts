export type PageItemType = 'text' | 'image' | 'header';

export enum PageBasenames {
  galaxias = 'galaxias',
  fuensanta = 'fuensanta',
  nebulosas = 'nebulosas',
  reparacion = 'reparacion-ccd',
  sistemaSolar = 'sistema-solar',
  cometasAsteroides = 'cometas-asteroides',
  construccionObservatorio = 'construccion-del-observatorio',
}

export type PageItemProps =
  {
    type: PageItemType;
    urlId: string;
  }
  & Partial<{
    src: string;
    alt: string;
    text: string;
    label: PageBasenames;
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