import React from "react";
import { Box, Link, makeStyles, Typography } from "@material-ui/core";

import Image from "src/components/Image/Image";
import { PageBasename } from "src/types";

const useStyles = makeStyles(() => ({
  root: {
    margin: '1rem 0',
    position: 'relative',

    color: '#00ff00',
    fontSize: '1.25rem',
    fontWeight: 'bold',
  },
  enlace: {
    color: 'currentColor',
    userSelect: 'none',
  },
  imagen: {
    height: '150px',
  },
  imageWrapper: {
    width: '80%',
    margin: '1rem auto',
    height: '150px',
  },
  titulo: {
    color: 'currentColor',
    fontWeight: 'bold',
  },
}));

export type ReparacionSBIGProps = {
  titulo?: string;
};

const ReparacionSBIG: React.FC<ReparacionSBIGProps> = ({
  titulo = 'REPARACIÓN CCD SBIG'
}) => {
  const classes = useStyles();

  return (
    <Box
      width="100%"
      height="200px"
      display="flex"
      position="relative"
      flexDirection="column"
      justifyContent="center"
      className={classes.root}
    >
      <Link
        href={PageBasename.reparacionCCD}
        className={classes.enlace}
      >
        <Typography
          component="h2"
          className={classes.titulo}
        >
          {titulo}
        </Typography>
        <Image
          src={require('@public/observatorio/franja.jpg').default}
          layout="fill"
          className={classes.imageWrapper}
          imageClassName={classes.imagen}
        />
      </Link>
    </Box>
  )
}



export default ReparacionSBIG;