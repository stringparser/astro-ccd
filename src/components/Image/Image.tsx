import clsx from 'clsx';
import { useCallback } from 'react';
import { Box, makeStyles } from '@material-ui/core';
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
  link?: boolean;
  fecha?: string;
  width?: never;
  height?: never;
  className?: string;
  imageClassName?: string;
};

const Image: React.FC<ImageProps> = ({
  link = true,
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

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      className={clsx(classes.root, className)}
    >
      <NextImage
        layout="fill"
        loading="lazy"
        objectFit="contain"
        {...props}
        src={mapImageSrc(src)}
        onClick={handleOpen}
        className={clsx(classes.image, imageClassName)}
      />
    </Box>
  );
};

export default Image;