import { makeStyles } from "@material-ui/core";

import Image from "./Image";

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',

    margin: '0',

    width: 'auto !important',
    height: '150px',
    minHeight: 'unset !important',
    position: 'relative',

    border: 'none',

    '& > :first-child': {
      flex: 1,
      width: 'auto !important',
      borderColor: 'transparent !important',
    },

    [theme.breakpoints.up('sm')]: {
      '& > :first-child': {
        flex: 'unset',
      }
    }
  },
  image: {

    width: '150px !important',
    height: '150px !important',
    margin: '0 auto !important',

    [theme.breakpoints.up('sm')]: {
      minWidth: 'unset !important',
    }
  }
}));

const ImagenObras = () => {
  const classes = useStyles();

  return (
    <Image
      src={require('@public/img/obras.gif').default}
      link={false}
      isBig={false}
      layout="fill"
      objectFit="contain"
      className={classes.root}
      imageClassName={classes.image}
    />
  );
}

export default ImagenObras;