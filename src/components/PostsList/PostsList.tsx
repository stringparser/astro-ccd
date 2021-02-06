
import React from "react";
import { Box, makeStyles, Typography } from "@material-ui/core";

import { RegistroItem } from "types";
import { opacityMixin } from "src/components/mixins";

import H2 from "src/components/Typography/H2";
import Image from "src/components/Image/Image";
import NavigationLink from "../Navigation/NavigationLink";

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
  mainWrapper: {
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

    '&:hover': {
      textDecoration: 'none',

      '& h2': {
        textDecoration: 'underline',
      }
    }
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
  clickable: {
    cursor: 'pointer',
  },
  etiquetas: {
    marginBottom: '.5rem'
  }
});

export type PostsListProps<T = RegistroItem> =  {
  items: T[];
  mostrarEtiquetas?: boolean;
  onEtiquetaClick?: (el: RegistroItem) => void;
};

function PostsList(props: PostsListProps) {
  const classes = useStyles();
  const {
    items,
    mostrarEtiquetas,
    onEtiquetaClick,
  } = props;

  return (
    <Box className={classes.root}>
      {items.map(el => {
        const { date, src } = el.entradas.find(el => el.src);
        const { objeto, titulo, etiquetas } = el;

        const href = `/registro/${el.urlId}`;
        const dateString = (/(\d{4})(\d{2})(\d{2})?/.exec(date) || [])
          .slice(1)
          .reverse()
          .join('/')
          .replace(/^00\//, '')
        ;

        return (
          <NavigationLink
            key={el.urlId}
            href={href}
            className={classes.mainWrapper}
          >
              <H2 className={classes.imageTitle}>
                {etiquetas.includes('sistema solar')
                  ? titulo
                  : objeto
                }
              </H2>

              {mostrarEtiquetas && (
                <Typography
                  variant="caption"
                  className={classes.etiquetas}
                >
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
          </NavigationLink>
        );
      })}
    </Box>
  )
}

export default PostsList;