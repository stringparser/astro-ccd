import React from "react";
import { Box, Link, makeStyles, Typography } from "@material-ui/core";

import Image from "src/components/Image/Image";
import { PageBasename } from "src/types";

const useStyles = makeStyles(() => ({
  root: {
    color: '#00ff00',
    fontSize: '1.25rem',
    fontWeight: 'bold',
    textDecoration: 'none',
    position: 'relative',
  },
  link: {
    color: 'currentColor',
    userSelect: 'none',
  },
  image: {
    width: '80%',
    height: '150px',
    margin: '0 auto',
  },
  content: {
    color: 'currentColor',
    fontWeight: 'bold',
  },
}))

const ReparacionSBIG = () => {
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
        className={classes.link}
      >
        <Typography
          component="h2"
          className={classes.content}
        >
          REPARACIÓN CCD SBIG
        </Typography>
        <Image
          src={require('@public/observatorio/franja.jpg').default}
          className={classes.image}
        />
      </Link>
    </Box>
  )
}



export default ReparacionSBIG;