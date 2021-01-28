import { Box } from "@material-ui/core";

import H1 from "src/components/Typography/H1";
import PostList from "src/components/PostsList/PostList";
import { PageItemContents } from "src/types";

export type NebulosasPosts = {
  items: PageItemContents[];
};

export async function getStaticProps() {
  const values = (await import('src/registro/pages.json')).default;

  return {
    props: {
      items: Object.values(values)
        .filter(el => el.label === 'nebulosas'),
    },
  };
};

const Nebulosas: React.FC<NebulosasPosts> = ({ items }) => {
  return (
    <Box>
      <H1>Nebulosas</H1>
      <PostList items={items} />
    </Box>
  )
}

export default Nebulosas;