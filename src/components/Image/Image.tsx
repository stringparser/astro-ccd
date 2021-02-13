import clsx from 'clsx';
import { useCallback } from 'react';
import { Box, makeStyles, Typography } from '@material-ui/core';
import NextImage, { ImageProps as NextImageProps } from 'next/image'
import { mapFormattedDate, mapTextToUrl } from 'src/lib/util';

const useStyles = makeStyles(theme => ({
  root: {
    zIndex: 0,
    margin: '2rem auto',

    cursor: 'pointer',
    position: 'relative',

    width: 'auto',
    maxWidth: '90%',
    minHeight: '350px',
    maxHeight: '400px',

    '& > :last-child': {
      flex: 1,
      border: '1px solid rgba(255, 255, 255, 0.15)',
      borderRadius: '4px',
    },

    [theme.breakpoints.up('md')]: {
      margin: '2rem 0',
    }
  },
  imageBig: {
    minHeight: 'unset',
    maxHeight: 'unset',

    '& > :last-child': {
      overflow: 'auto !important',
      position: 'static !important',
    },

    '& img': {
      width: 'auto !important',
      height: 'auto !important',
      margin: '0 auto !important',
      // @ts-ignore
      position: 'unset !important',
    },

    '&:hover > :last-child': {
      opacity: .95,
      borderColor: 'royalblue',
    }
  },
  imageFecha: {
    padding: '0.5rem 0',
    textAlign: 'center',
  },
  imageSelected: {
    '& > :last-child': {
      borderColor: 'royalblue',
    }
  },
  noBorder: {
    '& > :last-child': {
      borderColor: 'transparent',
    }
  },
  isSmall: {
    maxWidth: '300px',
  }
}));

export const mapImageSrc = (src: string) => {
  return (
    /^(\/_next\/|data:image)/.test(src) && src
    || require(`@public/${src.replace(/^@public\//, '')}`).default
  );
};

export type ImageProps = NextImageProps & {
  desc?: string;
  link?: boolean;
  isBig?: boolean;
  pequeña?: boolean;
  sinBorde?: boolean;
  fecha?: string;
  className?: string;
  isSelected?: boolean;
  imageClassName?: string;
};

const Image: React.FC<ImageProps> = ({
  link = true,
  isBig = true,
  src,
  fecha,
  desc,
  pequeña,
  sinBorde,
  className,
  isSelected,
  imageClassName,
  onClick,
  ...props
}) => {
  const classes = useStyles(props);

  const handleOpen = useCallback(
    (ev: React.MouseEvent<HTMLImageElement>) => {
      if (link) {
        window.open(mapImageSrc(src), '_blank')
      }
      if (onClick) {
        onClick(ev);
      }
    },
    [link, onClick]
  );

  const hasHeightAndWidth = props.width != null && props.height != null;

  const formattedFecha = fecha
    ? mapFormattedDate(fecha)
    : undefined
  ;

  return (
    <Box
      id={/^(\/_next\/|data:image)/.test(src)
        ? undefined
        : mapTextToUrl(src)
      }
      className={clsx(
        classes.root,
        className,
        isBig && classes.imageBig,
        pequeña && classes.isSmall,
        isSelected && classes.imageSelected,
        sinBorde && classes.noBorder,
      )}
    >
      {desc && (
        <p style={{margin: '0.5rem auto', opacity: .8, textAlign: 'center'}}>
          {desc} ({formattedFecha})
        </p>
      )}
      {!desc && formattedFecha && (
        <Typography className={classes.imageFecha}>
          {formattedFecha}
        </Typography>
      )}
      <NextImage
        layout={hasHeightAndWidth
          ? 'intrinsic'
          : 'fill' as 'fixed' // fixes stupid bug with types
        }
        title={isBig ? 'hacer click para ampliar' : null}
        quality={100}
        loading="lazy"
        objectFit="contain"
        {...props}
        src={mapImageSrc(src)}
        onClick={handleOpen}
        className={imageClassName}
      />
    </Box>
  );
};

export default Image;