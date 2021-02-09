import clsx from "clsx";
import React from "react";
import { makeStyles, Typography } from "@material-ui/core";

import { RegistroItem, RegistroItemEntrada } from "types";
import { opacityMixin } from "src/components/mixins";

import H2 from "src/components/Typography/H2";
import Image from "src/components/Image/Image";
import NavigationLink from "src/components/Navigation/NavigationLink";

const useStyles = makeStyles(theme => ({
  root: {
    ...opacityMixin,

    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',

    [theme.breakpoints.between('sm', 'md')]: {
      width: '50%',
    },

    [theme.breakpoints.up('md')]: {
      width: '33%',
    },

    '&:hover': {
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
    marginTop: '0',

    display: 'flex',
    flexDirection: 'column',

    alignItems: 'center',
    justifyContent: 'center',

    '& > :first-child': {
      maxHeight: '300px',
    }
  },
  etiquetas: {
    margin: '.25rem 0'
  },
  clickable: {
    cursor: 'pointer',
  },
}));

export type PostsListItemProps =  {
  href: string;
  item:
    Omit<RegistroItem, 'entradas'> &
    RegistroItemEntrada
  ;
  showTag?: boolean;
  isSelected?: boolean;
  className?: string;
  imageContainerClass?: string;
};

const PostsListItem: React.FC<PostsListItemProps> = (props) => {
  const classes = useStyles(props);

  const {
    href,
    showTag,
    isSelected,
    className,
    imageContainerClass,
  } = props;

  const {
    src,
    tipo,
    date,
    urlId,
    objeto,
    width,
    height,
    titulo,
  } = props.item;

  return (
    <NavigationLink
      id={urlId}
      key={urlId}
      href={href}
      className={clsx(classes.root, className)}
    >
        <H2 className={classes.imageTitle}>
          {titulo || objeto}
        </H2>

        {showTag && (
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
          isSelected={isSelected}
          className={clsx(
            classes.imageContainer,
            imageContainerClass
          )}
        />
    </NavigationLink>
  )
}

export default PostsListItem;