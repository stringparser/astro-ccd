import { Box } from "@material-ui/core";

import H1 from "src/components/Typography/H1";
import PostList from "src/components/PostList";
import { PageBasename, PageItemContents } from "src/types";

export type SistemaSolarProps = {
  items: PageItemContents[];
};

export async function getStaticProps() {
  const values = (await import('src/data/pages.json')).default;

  return {
    props: {
      items: Object.values(values)
        .filter(el => el.label === PageBasename.sistemaSolar),
    },
  };
};

const SistemaSolar: React.FC<SistemaSolarProps> = ({ items }) => {
  return (
    <Box>
      <H1>Sistema Solar</H1>
      <PostList items={items} />
    </Box>
  )
}

export default SistemaSolar;