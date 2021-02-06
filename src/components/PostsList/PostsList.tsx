
import React from "react";
import { Box, Link, makeStyles, Typography } from "@material-ui/core";

import { RegistroItem } from "types";
import { opacityMixin } from "src/components/mixins";

import H2 from "src/components/Typography/H2";
import Image from "src/components/Image/Image";

const useStyles = makeStyles({
  root: {
    width: '100%',
    margin: '0 auto',

    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',

    '@media (min-width: 876px)': {
      width: 'auto',
      flexDirection: 'row',
    },
  },
  linkWrapper: {
    ...opacityMixin,

    width: 'inherit',
    margin: '1rem auto',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',

    '@media (min-width: 876px) and (max-width: 1024px)': {
      width: '50%',
      margin: '0 auto',
    },

    '@media (min-width: 1024px)': {
      width: '30%',
      margin: '0 auto',
    },
  },
  imageTitle: {
    color: 'red',
    maxWidth: '50%',
    margin: '1rem auto 0 auto',
  },
  imageFecha: {
    marginTop: '1rem',
  },
  imageContainer: {
    height: '200px',
    margin: '1rem 2rem',

    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export type PostsListProps<T = RegistroItem> =  {
  items: T[];
  mostrarEtiquetas?: boolean;
};

function PostsList({ items, mostrarEtiquetas }: PostsListProps) {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      {items.map(el => {
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
            <H2 className={classes.imageTitle}>
              {etiquetas.includes('sistema solar')
                ? titulo
                : objeto
              }
            </H2>

            {mostrarEtiquetas && (
              <Typography variant="caption">
                {etiquetas.join(', ').replace(/[-]/g, ' ')}
              </Typography>
            )}

            <Typography variant="caption" className={classes.imageFecha}>
              {dateString}
            </Typography>

            <Image
              src={src}
              link={false}
              layout="fill"
              quality={65}
              className={classes.imageContainer}
            />
          </Link>
        );
      })}
    </Box>
  )
}

export default PostsList;