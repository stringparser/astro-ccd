import clsx from 'clsx';
import { useCallback } from 'react';
import { Box, makeStyles, Typography } from '@material-ui/core';
import NextImage, { ImageProps as NextImageProps } from 'next/image'

const useStyles = makeStyles({
  root: {
    zIndex: 0,
    margin: '2rem 1rem',

    cursor: 'pointer',
    position: 'relative',

    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

    width: 'auto',
    minHeight: '350px',
    maxHeight: '400px',

    '& > :first-child': {
      flex: 1,
      border: '1px solid rgba(255, 255, 255, 0.15)',
      borderRadius: '4px',
    },
  },
  image: {},
  imageBig: {
    minHeight: 'unset',
    maxHeight: 'unset',

    '& > :first-child': {
      maxWidth: '85%',
      overflow: 'auto !important',
      position: 'static !important',
      borderColor: 'transparent',
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
  },
});

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
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
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
        className={clsx(classes.image, imageClassName)}
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