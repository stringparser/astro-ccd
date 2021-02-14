import React from "react";
import Email from "@material-ui/icons/Email";
import { Box, Typography, useTheme } from "@material-ui/core";

import NavigationLink from "src/components/Navigation/NavigationLink";

const Footer = () => {
  const theme = useTheme();

  return (
    <Box
      mt="3rem"
      color="red"
      display="flex"
      padding="2rem 1rem 3rem 1rem"
      borderTop={`1px solid ${theme.palette.divider}`}
      alignItems="center"
      justifyContent="space-between"
    >
      <Typography color="textSecondary">
        Las imagenes  son de libre distribucion  siempre que se indique  su  procedencia
      </Typography>
      <NavigationLink href="/contacto">
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
    </Box>
  )
};

export default Footer;