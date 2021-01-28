import clsx from 'clsx';
import { Box, makeStyles } from '@material-ui/core';
import NextImage, { ImageProps as NextImageProps } from 'next/image'

export type ImageProps = NextImageProps & {
  className?: string;
};

const useStyles = makeStyles(() => ({
  root: (props: ImageProps) => {
    const esObras = /obras[^.\s]+\.gif$/.test(props.src);

    return {
      cursor: 'pointer',
      position: 'relative',

      width: esObras
        ? 150
        : undefined
      ,

      height: esObras
        ? 150
        : 450
      ,

      margin: esObras
        ? '0 auto'
        : '2rem auto'
      ,
    };
  },
}));

const Image: React.FC<ImageProps> = props => {
  const classes = useStyles(props);

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      className={clsx(classes.root, props.className)}
    >
      <NextImage
        {...props}
        layout="fill"
        loading="lazy"
        objectFit="contain"
      />
    </Box>
  );
};

export default Image;