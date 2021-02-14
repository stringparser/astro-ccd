import React from "react";
import Email from "@material-ui/icons/Email";
import { Box, Typography, withStyles } from "@material-ui/core";

import NavigationLink from "src/components/Navigation/NavigationLink";

const StyledBox = withStyles(theme => ({
  root:  {
    display: 'flex',
    flexDirection: 'column',

    alignItems: 'center',
    justifyContent: 'center',

    padding: '2rem 1rem 3rem 1rem',
    borderTop: `1px solid ${theme.palette.divider}`,

    '& > :not(:first-child)': {
      marginTop: '1rem',
    },

    [theme.breakpoints.up('sm')]: {
      flexDirection: 'row',
      justifyContent: 'space-between',

      '& > :not(:first-child)': {
        marginTop: 'unset',
      },
    },
  }
}))(Box);

const Footer = () => {

  return (
    <StyledBox>
      <Typography
        color="textSecondary"
      >
        Las imágenes son de libre distribución siempre que se indique su procedencia.
      </Typography>
      <NavigationLink
        href="/contacto"
      >
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-around"
        >
          <Email fontSize="small" />
          <Box p="3px" />
          Contacto
        </Box>
      </NavigationLink>
    </StyledBox>
  )
};

export default Footer;