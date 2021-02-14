import React from "react";
import { Box, makeStyles, Button, withStyles } from "@material-ui/core";

import { PageBasename } from "types";

import H2 from "src/components/Typography/H2";
import Image from "src/components/Image/Image";
import NavigationLink from "src/components/Navigation/NavigationLink";

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
    position: 'relative',
    userSelect: 'none',
  },
  imagen: {
    height: '150px !important',
    borderColor: 'transparent !important',
  },
  imageWrapper: {
    position: 'relative',

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

const StyledButton = withStyles(theme => ({
  root: {
    position: 'absolute',

    right: '5px',
    bottom: '20px',
    backgroundColor: 'royalblue',

    [theme.breakpoints.up('sm')]: {
      bottom: '30px',
    },
  },
  label: {
    fontWeight: 'bold',

    color: theme.palette.common.white,
    opacity: .7,
  }
}))(Button);

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
          sinBorde
          src={require('./img/franja.jpg').default}
          link={false}
          width={634}
          height={125}
          className={classes.imageWrapper}
          imageClassName={classes.imagen}
        >
          <NavigationLink
            href="/contacto"
          >
            <StyledButton
              size="small"
              variant="contained"
            >
              CONTACTO
            </StyledButton>
          </NavigationLink>
        </Image>
      </NavigationLink>
    </Box>
  )
};

export default ReparacionSBIG;