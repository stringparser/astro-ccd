import clsx from 'clsx';
import { useCallback } from 'react';
import { Box, makeStyles } from '@material-ui/core';
import NextImage, { ImageProps as NextImageProps } from 'next/image'

const useStyles = makeStyles({
  root: {
    margin: '2rem 1rem',

    cursor: 'pointer',
    position: 'relative',

    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

    width: 'auto',
    minHeight: '350px',
    maxHeight: '400px',
  },
  image: {
    width: 'auto !important',
    height: 'auto !important',
    margin: '0 auto !important',
    minWidth: 'unset !important',
    // @ts-ignore
    position: 'unset !important',

    border: '1px solid rgba(255, 255, 255, 0.15) !important',
    borderRadius: '4px',
  }
});

export const mapImageSrc = (src: string) => {
  return /^(\/_next\/|data:image)/.test(src)
    ? src
    : require(`@public/${src}`).default
  ;
};

export type ImageProps = NextImageProps & {
  fecha?: string;
  width?: never;
  height?: never;
  className?: string;
  imageClassName?: string;
  canOpenOrginial?: boolean;
};

const Image: React.FC<ImageProps> = ({
  src,
  fecha,
  className,
  imageClassName,
  canOpenOrginial = true,
  ...props
}) => {
  const classes = useStyles(props);

  const handleOpen = useCallback(
    () => {
      if (canOpenOrginial) {
        window.open(mapImageSrc(src), '_blank')
      }
    },
    []
  );

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      className={clsx(classes.root, className)}
    >
      <NextImage
        src={mapImageSrc(src)}
        layout="fill"
        loading="lazy"
        objectFit="contain"
        {...props}
        onClick={canOpenOrginial
          ? handleOpen
          : undefined
        }
        className={clsx(classes.image, imageClassName)}
      />
    </Box>
  );
};

export default Image;