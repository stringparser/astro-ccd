
import React from "react";
import { Box, Link, makeStyles, Typography } from "@material-ui/core";

import { RegistroItem } from "bin/registro";
import { opacityMixin } from "src/components/styles";

import H2 from "src/components/Typography/H2";
import Image from "src/components/Image/Image";

const useStyles = makeStyles(() => ({
  root: {
    margin: '3rem auto',

    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',

    '@media (max-width: 376px)': {
      flexDirection: 'column',
    },
  },
  linkWrapper: {
    ...opacityMixin,

    width: '30%',
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',

    '&:hover': {
      opacity: 1,
      textDecoration: 'none',
    },

    '@media (max-width: 376px)': {
      width: 'auto',
    },
  },
  imageContainer: {
    height: '200px',
    margin: '1rem 2rem',

    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }
}));

export type PostsListProps<T = RegistroItem> =  {
  items: T[];
};

function PostsList<T>({ items }: PostsListProps) {
  const classes = useStyles();

  const postsItems = items.reduce((acc, item) => {
    const id = item.urlId;

    if (acc[id]) {
      return acc;
    }

    return acc.concat(item);
  }, [] as RegistroItem[]);

  return (
    <Box className={classes.root}>
      {postsItems.map(el => {
        const { date, src } = el.entradas.find(el => el.src);

        const { objeto, titulo, etiquetas } = el;

        const dateString = (/(\d{4})(\d{2})(\d{2})?/.exec(date) || [])
          .slice(1)
          .reverse()
          .join('/')
          .replace(/^00\//, '')
        ;

        return (
          <Link
            key={el.urlId}
            href={`/registro/${el.urlId}`}
            className={classes.linkWrapper}
          >
            <H2 style={{color: 'red', maxWidth: '50%', margin: '0 auto'}}>
              {etiquetas.includes('sistema solar')
                ? titulo
                : objeto
              }
            </H2>
            <Typography variant="caption">
              {dateString}
            </Typography>

            <Image
              src={require(`@public/${src}`).default}
              layout="fill"
              quality={65}
              canOpenOrginial={false}
              className={classes.imageContainer}
            />
          </Link>
        );
      })}
    </Box>
  )
}

export default PostsList;