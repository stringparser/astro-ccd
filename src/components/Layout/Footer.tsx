import React from "react";
import { Box, useTheme } from "@material-ui/core";

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
      <span>
        Las imagenes  son de libre distribucion  siempre que se indique  su  procedencia
      </span>
      <span>
        Contacto: jcgmilla@gmail.com
      </span>
    </Box>
  )
};

export default Footer;