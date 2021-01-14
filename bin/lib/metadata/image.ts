import { PageItemProps } from "../types";
import { mapCometImageMetadata } from "./comet-image";
import { mapGalaxyImageMetadata } from "./galaxy-image";

export default function mapImageMetadata(
  pageURL: string,
  el: cheerio.Cheerio,
  textContent: string
): PageItemProps {
  const alt = el.attr('alt');
  const src = el.attr('data-orig-file') || el.attr('src');

  const id = (/\/([^\/.]+)\.[^\/\s]+$/.exec(src) || ['']).pop().trim();
  const basename = pageURL.split('/').pop();

  const props: PageItemProps = {
    src,
    alt,
    type: 'image',
  };

  if (textContent) {
    props.text = textContent;
  }

  switch (basename) {
    case 'cometasasteroides': {
      return mapCometImageMetadata({ ...props, id });
    }
    case 'galaxias':
    case 'nebulosas': {
      return mapGalaxyImageMetadata({ ...props, id });
    }
    default: {
      return props;
    }
  }
}