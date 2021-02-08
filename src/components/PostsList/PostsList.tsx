
import clsx from "clsx";
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
    alignItems: 'start',
    flexDirection: 'column',
    justifyContent: 'center',

    '@media (min-width: 562px)': {
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

    '@media (min-width: 562px) and (max-width: 1024px)': {
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
    margin: '1rem auto 0 auto',
  },
  imageContainer: {
    margin: '1rem',

    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

    '& > :first-child': {
      maxHeight: '300px',
    }
  },
  imageContainerSelected: {
    '& > :first-child': {
      borderColor: 'royalblue',
    }
  },
  etiquetas: {
    margin: '.25rem 0'
  },
  clickable: {
    cursor: 'pointer',
  },
});

export type PostsListProps<T = RegistroItem> =  {
  items: T[];
  selected?: string;
  mostrarEtiquetas?: boolean;
};

function PostsList(props: PostsListProps) {
  const classes = useStyles();
  const {
    items,
    selected,
    mostrarEtiquetas,
  } = props;

  return (
    <Box className={classes.root}>
      {items.map(el => {
        const { date, src, width, height } = el.entradas.find(el => el.src);
        const { urlId, objeto, titulo, tipo } = el;

        const href = `/fotografia/registro/${urlId}`;

        return (
          <NavigationLink
            id={urlId}
            key={urlId}
            href={href}
            className={classes.mainWrapper}
          >
              <H2 className={classes.imageTitle}>
                {titulo || objeto}
              </H2>

              {mostrarEtiquetas && (
                <Typography
                  variant="caption"
                  className={classes.etiquetas}
                >
                  {tipo.replace(/[-]/g, ' ')}
                </Typography>
              )}

              <Image
                src={src}
                link={false}
                fecha={date}
                isBig={false}
                width={width}
                height={height}
                quality={50}
                className={clsx(
                  classes.imageContainer,
                  selected == urlId && classes.imageContainerSelected
                )}
              />
          </NavigationLink>
        );
      })}
    </Box>
  )
}

export default PostsList;