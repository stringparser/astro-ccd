import { Box } from "@material-ui/core";

import { RegistroItem } from "bin/registro";

import H1 from "src/components/Typography/H1";
import PostsList from "src/components/PostsList/PostsList";
import { getGalaxias, StaticItemsProps } from "src/lib/staticProps";

export type GalaxiasPosts = {
  items: RegistroItem[];
};

const Galaxias: React.FC<GalaxiasPosts> = ({ items }) => {
  return (
    <Box>
      <H1>Galaxias</H1>
      <PostsList items={items} />
    </Box>
  )
};

export async function getStaticProps(): Promise<StaticItemsProps<RegistroItem>> {
  return {
    props: {
      items: await getGalaxias(),
    },
  };
};

export default Galaxias;