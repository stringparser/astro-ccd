import React from "react";
import { Box, makeStyles, Typography } from "@material-ui/core";

import Image from "src/components/Image/Image";
import { PageBasename } from "types";
import NavigationLink from "src/components/Navigation/NavigationLink";
import H2 from "src/components/Typography/H2";

const useStyles = makeStyles(theme => ({
  root: {
    margin: '1rem 0',
    position: 'relative',

    color: '#00ff00',
    fontSize: '1.25rem',
    fontWeight: 'bold',

    borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
  },
  enlace: {
    color: 'currentColor',
    userSelect: 'none',
  },
  imagen: {
    height: '150px !important',
    borderColor: 'transparent !important',
  },
  imageWrapper: {
    width: '80%',
    margin: '1rem 0',
    height: '150px',
    minHeight: 'unset !important',

    [theme.breakpoints.down('sm')]: {
      margin: '1rem auto',
    }
  },
  titulo: {
    color: 'currentColor',
    fontWeight: 'bold',
  },
}));

const ReparacionSBIG = () => {
  const classes = useStyles();

  return (
    <Box
      width="100%"
      display="flex"
      position="relative"
      flexDirection="column"
      justifyContent="center"
      className={classes.root}
    >
      <NavigationLink
        href={`/${PageBasename.reparacionCCD}`}
        className={classes.enlace}
      >
        <H2 className={classes.titulo}>
          REPARACIÓN DE CCD SBIG
        </H2>
        <Image
          src={require('./img/franja.jpg').default}
          link={false}
          isBig={false}
          layout="fill"
          className={classes.imageWrapper}
          imageClassName={classes.imagen}
        />
      </NavigationLink>
    </Box>
  )
};

export default ReparacionSBIG;