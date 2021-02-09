import Head from "next/head";
import React from "react";
import NextLink from "next/link";
import { Box, makeStyles } from "@material-ui/core";
import { InferGetStaticPropsType } from "next";

import { RegistroItem } from "types";

import H1 from "src/components/Typography/H1";
import PostsListItem from "src/components/PostsList/PostsListItem";
import { capitalize } from "src/lib/util";

export const getStaticProps = async () => {
  const items = (await import('cache/ultimas-entradas-por-etiqueta.json')).default as RegistroItem[];

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
  title: {
    marginLeft: '1rem',

    [theme.breakpoints.up('md')]: {
      marginLeft: '2rem',
    }
  },
  postsItemsContainer: {
    margin: '0 1rem',

    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'start',
    justifyContent: 'center',

    [theme.breakpoints.up('md')]: {
      margin: '0 2rem',
    }
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

  items.map(el =>
    <NextLink
      href={`/fotografia/${el.tipo}`}
      prefetch
    />
  );

  return (
    <Box>
      <Head>
        <title>OACM Fuensanta | Fotografía</title>
      </Head>

      <Box className={classes.title}>
        <H1>
          Fotografía
        </H1>
      </Box>

      <Box className={classes.postsItemsContainer}>
        {items.map(el => {
          const etiqueta = el.tipo;
          const { entradas, ...itemProps } = el;

          const href = `/fotografia/${etiqueta}`;
          const item = {
            ...itemProps,
            ...el.entradas[0],
            titulo: capitalize(etiqueta)
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