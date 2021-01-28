import React from "react";
import { Box, Link, makeStyles, Typography } from "@material-ui/core";

import Image from "src/components/Image/Image";
import { PageBasename } from "src/types";

const useStyles = makeStyles(() => ({
  root: {
    color: '#00ff00',
    fontSize: '1.25rem',
    position: 'relative',
    fontWeight: 'bold',
  },
  enlace: {
    color: 'currentColor',
    userSelect: 'none',
  },
  imagen: {
    width: '80%',
    height: '150px',
    margin: '0 auto',
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
      height="250px"
      display="flex"
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
          className={classes.imagen}
        />
      </Link>
    </Box>
  )
}



export default ReparacionSBIG;