export type TextItem = {
  type: 'text';
  text: string;
};

export type TitleItem = {
  type: 'header';
  text: string;
};

export type ImageProps = {
  _id: string;
  src: string;
  alt: string;
  type: 'image';
  alias?: string;
  fecha?: string;
  descripcion?: string;
  localizacion?: string;
};