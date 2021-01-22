import { Box, Link, Typography } from "@material-ui/core";

import H1 from "src/components/Typography/H1";
import PostList from "src/components/PostList";
import { PageBasename, PageItemContents } from "src/types";

export type CometasAsteroidesProps = {
  items: PageItemContents[];
};

export async function getStaticProps() {
  const values = (await import('src/data/pages.json')).default;

  return {
    props: {
      items: Object.values(values)
        .filter(el => el.label === PageBasename.cometasAsteroides),
    },
  };
};

const CometasAsteroides: React.FC<CometasAsteroidesProps> = ({ items }) => {
  return (
    <Box>
      <H1>Cometas y Asteroides</H1>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Link
          target="_blank"
          href="http://www.minorplanetcenter.net/iau/lists/ObsCodesF.html"
        >
          <Typography component="p">
            Lista de códigos MPC
          </Typography>
        </Link>
      </Box>
      <PostList items={items} />
    </Box>
  )
}

export default CometasAsteroides;