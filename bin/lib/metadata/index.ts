import { PageBasename, PageItemProps } from "../../../src/types";
import { mapCometImageMetadata } from "./cometImage";
import { mapGalaxyImageMetadata } from "./galaxyImage";
import { mapSolarSystemImageMetadata } from "./solarSystemImage";

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