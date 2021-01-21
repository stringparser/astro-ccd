import { PageItemProps } from "../types";
import { ActualPageBasename } from "bin/fetch";
import { mapCometImageMetadata } from "./comet-image";
import { mapGalaxyImageMetadata } from "./galaxy-image";
import { mapSolarSystemImageMetadata } from "./solar-system-image";

export default function mapImageMetadata(
  pageURL: string,
  el: cheerio.Cheerio,
  textContent: string
): PageItemProps {
  const alt = el.attr('alt');
  const src = el.attr('data-orig-file') || el.attr('src');

  const basename = pageURL.split('/').pop() as ActualPageBasename;
  const objectId = (/\/([^\/.]+)\.[^\/\s]+$/.exec(src) || ['']).pop().trim();

  const props: PageItemProps = {
    src,
    alt,
    objectId,
    type: 'image',
    urlId: objectId,
  };

  if (textContent) {
    props.text = textContent;
  }

  switch (basename) {
    case 'galaxias':
    case 'nebulosas': {
      return mapGalaxyImageMetadata({ ...props, objectId });
    }
    case 'cometasasteroides': {
      return mapCometImageMetadata({ ...props, objectId });
    }
    case 'planetas-satelites': {
      return mapSolarSystemImageMetadata({ ...props, objectId });
    }
    default: {
      return props;
    }
  }
}