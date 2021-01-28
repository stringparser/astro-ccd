import clsx from 'clsx';
import { Box, makeStyles } from '@material-ui/core';
import NextImage, { ImageProps as NextImageProps } from 'next/image'

const useStyles = makeStyles({
  root: {
    margin: '2rem auto',

    cursor: 'pointer',
    position: 'relative',

    height: '400px',
    maxWidth: '80%',
  },
});

export type ImageProps = NextImageProps & {
  width?: never;
  height?: never;
  className?: string;
  imageClassName?: string;
};

const Image: React.FC<ImageProps> = ({ className, imageClassName, ...props }) => {
  const classes = useStyles(props);

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      className={clsx(classes.root, className)}
    >
      <NextImage
        layout="fill"
        objectFit="contain"
        {...props}
        className={imageClassName}
      />
    </Box>
  );
};

export default Image;