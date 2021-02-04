import { Box, Link, Typography } from "@material-ui/core";

import { RegistroItem } from "bin/registro";

import H1 from "src/components/Typography/H1";
import PostsList from "src/components/PostsList/PostsList";
import { getCometasAsteroides, StaticItemsProps } from "src/lib/staticProps";

export type CometasAsteroidesProps = {
  items: RegistroItem[];
};

const CometasAsteroides: React.FC<CometasAsteroidesProps> = ({ items }) => {
  return (
    <Box>
      <H1>
        Cometas y Asteroides
      </H1>
      <Box
        display="flex"
        whiteSpace="nowrap"
        alignItems="center"
        justifyContent="center"
      >
        <Link
          href="http://www.minorplanetcenter.net/iau/lists/ObsCodesF.html"
          target="_blank"
        >
          <Typography component="p" style={{color: 'crimson'}}>
            Lista de códigos MPC
          </Typography>
        </Link>
      </Box>
      <PostsList items={items} />
    </Box>
  )
};

export async function getStaticProps(): Promise<StaticItemsProps<RegistroItem>> {
  return {
    props: {
      items: await getCometasAsteroides(),
    },
  };
};

export default CometasAsteroides;