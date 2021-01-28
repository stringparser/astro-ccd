import { makeStyles } from "@material-ui/core";

import Image from "./Image";

const useStyles = makeStyles({
  root: {
    width: 'auto !important',
    height: '150px',
    minHeight: 'unset !important',

    border: 'none',
  },
  image: {

    width: '150px !important',
    height: '150px !important',
    margin: '0 auto !important',

    borderColor: 'transparent !important',
  }
});

const ImagenObras = () => {
  const classes = useStyles();

  return (
    <Image
      src={require('@public/img/obras.gif').default}
      layout="fill"
      objectFit="contain"
      className={classes.root}
      imageClassName={classes.image}
    />
  );
}

export default ImagenObras;