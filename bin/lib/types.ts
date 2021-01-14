export type PageItemType = 'text' | 'image' | 'header';

export type PageItemProps = {
  id?: string;
  url?: string;
  src?: string;
  alt?: string;
  type: PageItemType;
  text?: string;
  alias?: string;
  fecha?: string;
  localizacion?: string;
};

export type ParsedPageContent = {
  url: string;
  items: PageItemProps[];
};