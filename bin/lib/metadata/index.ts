import { PageItemProps } from "../types";
import { mapCometImageMetadata } from "./comet-image";
import { mapGalaxyImageMetadata } from "./galaxy-image";
import { mapSolarSystemImageMetadata } from "./solar-system-image";

export default function mapMetadata(props: PageItemProps): PageItemProps {
  const { label } = props;

  switch (label) {
    case 'galaxias':
    case 'nebulosas': {
      return mapGalaxyImageMetadata(props);
    }
    case 'sistema-solar': {
      return mapSolarSystemImageMetadata(props);
    }
    case 'cometas-asteroides': {
      return mapCometImageMetadata(props);
    }
    default: {
      return props;
    }
  }
}