import { Box } from "@material-ui/core";

import H1 from "src/components/Typography/H1";
import PostsList from "src/components/PostsList/PostsList";
import { getSistemaSolar, RegistroItem, StaticItemsProps } from "src/lib/staticProps";

export type SistemaSolarProps = {
  items: RegistroItem[];
};

const SistemaSolar: React.FC<SistemaSolarProps> = ({ items }) => {
  return (
    <Box>
      <H1>Sistema Solar</H1>
      <PostsList items={items} />
    </Box>
  )
};

export async function getStaticProps(): Promise<StaticItemsProps<RegistroItem>> {
  return {
    props: {
      items: await getSistemaSolar(),
    },
  };
};

export default SistemaSolar;