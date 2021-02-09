import Head from "next/head";
import React from "react";
import NextLink from "next/link";
import { Box, makeStyles } from "@material-ui/core";
import { InferGetStaticPropsType } from "next";

import { RegistroItem } from "types";

import H1 from "src/components/Typography/H1";
import PostsListItem from "src/components/PostsList/PostsListItem";
import { capitalize, mapTagTextTitle } from "src/lib/util";

export const getStaticProps = async () => {
  const items = (await import('cache/ultima-entrada-por-etiqueta.json')).default as RegistroItem[];

  return {
    props: {
      items,
    },
    revalidate: false,
  };
};

const useStyles = makeStyles(theme => ({
  chip: {
    margin: '0.25rem',
    textTransform: 'capitalize',
  },
  postsItemsContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'start',
    justifyContent: 'center',
  },
  postsListItem: {

    [theme.breakpoints.up('md')]: {
      width: '50%',
    },
  },
}));

export type FotografiaProps = InferGetStaticPropsType<typeof getStaticProps>;

const Fotografia: React.FC<FotografiaProps> = props => {
  const classes = useStyles();

  const { items } = props;

  // prefetch sub-pages
  items.map(el =>
    <NextLink
      href={`/fotografia/${el.tipo}`}
      prefetch={true}
    />
  );

  return (
    <Box>
      <Head>
        <title>OACM Fuensanta | Fotografía</title>
      </Head>

      <H1>
        Fotografía
      </H1>

      <Box className={classes.postsItemsContainer}>
        {items.map(el => {
          const etiqueta = el.tipo;
          const [entrada] = el.entradas;
          const { entradas, ...itemProps } = el;

          const href = `/fotografia/${etiqueta}`;
          const item = {
            ...itemProps,
            ...entrada,
            date: undefined,
            titulo: mapTagTextTitle(etiqueta),
          };

          return (
            <PostsListItem
              key={href}
              href={href}
              item={item}
              className={classes.postsListItem}
            />
          )
        })}
      </Box>
    </Box>
  );
};

export default Fotografia;