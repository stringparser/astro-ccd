import { Box } from "@material-ui/core";

import H1 from "src/components/Typography/H1";
import PostsList from "src/components/PostsList/PostList";
import { getNebulosas, RegistroItem, StaticItemsProps } from "src/lib/staticProps";

export type NebulosasPosts = {
  items: RegistroItem[];
};

const Nebulosas: React.FC<NebulosasPosts> = ({ items }) => {
  return (
    <Box>
      <H1>Nebulosas</H1>
      <PostsList items={items} />
    </Box>
  )
};

export async function getStaticProps(): Promise<StaticItemsProps<RegistroItem>> {
  return {
    props: {
      items: await getNebulosas(),
    },
  };
};

export default Nebulosas;