import clsx from 'clsx';
import { useCallback } from 'react';
import { Box, makeStyles, Typography } from '@material-ui/core';
import NextImage, { ImageProps as NextImageProps } from 'next/image'

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

    '& > :first-child': {
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

    '& > :first-child': {
      overflow: 'auto !important',
      position: 'static !important',
    },

    '& img': {
      width: 'auto !important',
      height: 'auto !important',
      margin: '0 auto !important',
      // @ts-ignore
      position: 'unset !important',
    }
  },
  imageFecha: {
    padding: '0.5rem 0',
    textAlign: 'center',
  },
}));

export const mapImageSrc = (src: string) => {
  return /^(\/_next\/|data:image)/.test(src)
    ? src
    : require(`@public/${src}`).default
  ;
};

export type ImageProps = NextImageProps & {
  link?: boolean;
  isBig?: boolean;
  fecha?: string;
  className?: string;
  imageClassName?: string;
};

const Image: React.FC<ImageProps> = ({
  link = true,
  isBig = true,
  src,
  fecha,
  className,
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
    ? (/(\d{4})(\d{2})(\d{2})?/.exec(fecha) || [])
      .slice(1)
      .reverse()
      .join('/')
      .replace(/^00\//, '')
    : undefined
  ;

  return (
    <Box
      className={clsx(
        classes.root,
        className,
        isBig && classes.imageBig
      )}
    >
      <NextImage
        layout={hasHeightAndWidth
          ? 'intrinsic'
          : 'fill' as 'fixed' // fixes stupid bug with types
        }
        quality={100}
        loading="lazy"
        objectFit="contain"
        {...props}
        src={mapImageSrc(src)}
        onClick={handleOpen}
        className={imageClassName}
      />
      {formattedFecha && (
        <Typography className={classes.imageFecha}>
          {formattedFecha}
        </Typography>
      )}
    </Box>
  );
};

export default Image;