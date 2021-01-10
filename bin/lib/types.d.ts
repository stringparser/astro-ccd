export type TextItem = {
  id?: string;
  url?: string;
  type: 'text';
  text: string;
};

export type TitleItem = {
  id?: string;
  url?: string;
  type: 'header';
  text: string;
  href: string;
};

export type ImageProps = {
  id?: string;
  url?: string;
  src: string;
  alt: string;
  type: 'image';
  text?: string;
  alias?: string;
  fecha?: string;
  localizacion?: string;
};