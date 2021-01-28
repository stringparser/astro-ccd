import { Box, makeStyles } from '@material-ui/core';
import NextImage, { ImageProps as NextImageProps } from 'next/image'

const useStyles = makeStyles(() => ({
  image: (props: ImageProps) => ({
    width: /obras\S*\.gif/.test(props.src)
      ? 150
      : '75%'
    ,
    margin: '2rem 0',
    border: '1px solid rgba(255, 255, 255, 0.15)',
  })
}))

export type ImageProps = NextImageProps;

const Image: React.FC<ImageProps> = props => {
  const classes = useStyles(props);

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <img
        loading="lazy"
        className={classes.image}
        {...props}
      />
    </Box>
  );
};

export default Image;