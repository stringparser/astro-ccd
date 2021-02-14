import React from "react";
import { Box, makeStyles, Button, withStyles } from "@material-ui/core";

import { PageBasename } from "types";

import H3 from "src/components/Typography/H3";
import Image from "src/components/Image/Image";
import NavigationLink from "src/components/Navigation/NavigationLink";
import { Email } from "@material-ui/icons";

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

    margin: '1rem 0 0 0',
    maxHeight: '150px',
    minHeight: 'unset !important',

    [theme.breakpoints.down('sm')]: {
      margin: '1rem 0 0 1rem',
    }
  },
  titulo: {
    marginBottom: 0,

    color: 'currentColor',
    fontWeight: 'bold',
  },
}));

const StyledButton = withStyles(theme => ({
  root: {
    display: 'inline-flex',
    alignItems: 'center',

    margin: '0 0 2rem 0',

    [theme.breakpoints.up('sm')]: {
      marginTop: '0.75rem',
    }
  },
  label: {
    fontWeight: 'bold',

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
        <H3 className={classes.titulo}>
          REPARACIÓN DE CCD SBIG
        </H3>
        <Image
          sinBorde
          src={require('./img/franja.jpg').default}
          link={false}
          width={634}
          height={125}
          className={classes.imageWrapper}
          imageClassName={classes.imagen}
        />
      </NavigationLink>
      <Box>
        <NavigationLink
          href="/contacto"
          target="_blank"
        >
          <StyledButton
            size="small"
            variant="contained"
          >
            <Email fontSize="small" />
            <Box p="0.25rem" />
            CONTACTO
          </StyledButton>
        </NavigationLink>
      </Box>
    </Box>
  )
};

export default ReparacionSBIG;