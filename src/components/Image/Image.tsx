import clsx from 'clsx';
import { Box, makeStyles } from '@material-ui/core';
import NextImage, { ImageProps as NextImageProps } from 'next/image'
import { useCallback, useState } from 'react';
import ImageFullScreen from './ImageFullScreen';

const useStyles = makeStyles({
  root: (props: ImageProps) => ({
    margin: '2rem 0',

    cursor: 'pointer',
    position: 'relative',

    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

    width: 'auto',
    height: '400px',
  }),
});

export type ImageProps = NextImageProps & {
  width?: never;
  height?: never;
  className?: string;
  imageClassName?: string;
  canOpenOrginal?: boolean;
};

const Image: React.FC<ImageProps> = ({
  className,
  imageClassName,
  canOpenOrginal = true,
  ...props
}) => {
  const classes = useStyles(props);

  const handleOpen = useCallback(
    () => window.open(props.src, '_blank'),
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
        layout="fill"
        loading="lazy"
        objectFit="contain"
        {...props}
        onClick={canOpenOrginal ? handleOpen : undefined}
        className={imageClassName}
      />
    </Box>
  );
};

export default Image;