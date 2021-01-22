import { Box } from "@material-ui/core";
import { Divider } from "material-ui";

import H1 from "src/components/Typography/H1";
import PostList from "src/components/PostList";
import { PageItemProps } from "bin/lib/types";

export type GalaxiasPosts = {
  items: Array<PageItemProps>;
};

export async function getStaticProps() {
  const values = (await import('../../data/nebulosas.json')).default;

  return {
    props: {
      items: values.items,
    },
  };
};

const Galaxias: React.FC<GalaxiasPosts> = ({ items }) => {
  return (
    <Box>
      <H1>Galaxias</H1>
      <PostList items={items} />
    </Box>
  )
}

export default Galaxias;