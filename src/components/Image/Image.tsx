import clsx from 'clsx';
import { Box, makeStyles } from '@material-ui/core';
import NextImage, { ImageProps as NextImageProps } from 'next/image'
import { useCallback, useState } from 'react';
import ImageFullScreen from './ImageFullScreen';

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

export type ImageProps = NextImageProps & {
  width?: never;
  height?: never;
  className?: string;
  imageClassName?: string;
  canOpenOrginal?: boolean;
};

const Image: React.FC<ImageProps> = ({
  src,
  className,
  imageClassName,
  canOpenOrginal,
  ...props
}) => {
  const classes = useStyles(props);

  const handleOpen = useCallback(
    () => {
      if (canOpenOrginal && /(\/objeto\/)/.test(location.pathname)) {
        window.open(src, '_blank')
      }
    },
    []
  );

  const hasPriority = /(\/objeto\/)/.test(typeof window === 'undefined'
    ? '/'
    : window.location.pathname
  );

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      className={clsx(classes.root, className)}
    >
      <NextImage
        src={src}
        layout="fill"
        loading={hasPriority ? 'eager' : 'lazy'}
        priority={hasPriority}
        objectFit="contain"
        {...props}
        onClick={canOpenOrginal
          ? handleOpen
          : undefined
        }
        className={clsx(classes.image, imageClassName)}
      />
    </Box>
  );
};

export default Image;