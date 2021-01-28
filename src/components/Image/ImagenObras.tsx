import { makeStyles } from "@material-ui/core";

import Image from "./Image";

const useStyles = makeStyles({
  root: {

    width: '150px',
    height: '150px',
    margin: '0 auto',
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
    />
  );
}

export default ImagenObras;