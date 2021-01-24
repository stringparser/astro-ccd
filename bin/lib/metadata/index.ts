import { PageBasename, PageItemProps } from "../../../src/types";
import { mapCometImageMetadata } from "./comet-image";
import { mapGalaxyImageMetadata } from "./galaxy-image";
import { mapSolarSystemImageMetadata } from "./solar-system-image";

export default function mapMetadata(props: PageItemProps): PageItemProps {
  const { label } = props;

  switch (label) {
    case PageBasename.galaxias:
    case PageBasename.nebulosas: {
      return mapGalaxyImageMetadata(props);
    }
    case PageBasename.sistemaSolar: {
      return mapSolarSystemImageMetadata(props);
    }
    case PageBasename.cometasAsteroides: {
      return mapCometImageMetadata(props);
    }
    default: {
      return props;
    }
  }
}