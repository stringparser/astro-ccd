import { Box } from "@material-ui/core";
import { Divider } from "material-ui";

import H1 from "src/components/Typography/H1";
import PostList from "src/components/PostList";
import { PageItemContents } from "bin/lib/types";

export type GalaxiasPosts = {
  items: PageItemContents[];
};

export async function getStaticProps() {
  const values = (await import('src/data/pages.json')).default;

  return {
    props: {
      items: Object.values(values)
        .filter(el => el.label === 'galaxias'),
    },
  };
};

const Galaxias: React.FC<GalaxiasPosts> = ({ items }) => {
  console.log('items', items);

  return (
    <Box>
      <H1>Galaxias</H1>
      <PostList items={items} />
    </Box>
  )
}

export default Galaxias;