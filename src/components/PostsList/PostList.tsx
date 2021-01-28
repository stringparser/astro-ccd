
import React from "react";
import NextImage from "next/image";
import { Box, Link, makeStyles, Typography } from "@material-ui/core";

import { PageBasename } from "src/types";
import { RegistroItem } from "src/lib/staticProps";

import H2 from "src/components/Typography/H2";
import { opacityMixin } from "src/components/styles";

const useStyles = makeStyles(theme => ({
  root: {
    margin: '0 auto',
    marginTop: '2rem',

    '@media (max-width: 376px)': {
      flexDirection: 'column',
    },
  },
  linkWrapper: {
    ...opacityMixin,

    width: '33%',
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
  }
}));

export type PostsListProps<T = RegistroItem> =  {
  items: T[];
};

function PostsList<T>({ items }: PostsListProps) {
  const classes = useStyles();

  const postsItems = items.reduce((acc, item) => {
    const id = item.urlId;
    const entrada = item.entradas.find((el) => {
      const src = el.imagen;

      return (
        src
        && !/apj-logo\.gif$/.test(src)
        && !/logodef\.png$/.test(src)
        && !/rainbowl\.gif$/.test(src)
      );
    });

    if (acc[id] || !entrada || !entrada.imagen) {
      return acc;
    }

    return acc.concat(item);
  }, [] as RegistroItem[]);

  return (
    <Box
      display="flex"
      flexWrap="wrap"
      justifyContent="center"
      className={classes.root}
    >
      {postsItems.map(el => {
        const { fecha, imagen } = el.entradas.find(el => el.fecha && el.imagen);
        const { objeto, titulo, etiquetas } = el;

        const dateString = (/(\d{4})(\d{2})(\d{2})?/.exec(fecha) || [])
          .slice(1)
          .reverse()
          .join('/')
        ;

        return (
          <Link
            key={el.urlId}
            href={`/objeto/${el.urlId}`}
            className={classes.linkWrapper}
          >
            <H2 style={{color: 'red', maxWidth: '50%', margin: '0 auto'}}>
              {etiquetas === PageBasename.sistemaSolar
                ? titulo
                : objeto
              }
            </H2>
            <Typography variant="caption" style={{marginTop: '1rem'}}>
              {dateString}
            </Typography>
            <Box
              margin="1rem 2rem"
              height="200px"
              display="flex"
              position="relative"
              alignItems="center"
              justifyContent="center"
              border="1px solid rgba(255, 255, 255, 0.15)"
            >
              <NextImage
                src={require(`@public/${imagen}`).default}
                layout="fill"
                loading="lazy"
                objectFit="contain"
              />
            </Box>
          </Link>
        );
      })}
    </Box>
  )
}

export default PostsList;