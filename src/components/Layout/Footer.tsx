import React from "react";
import { Box, useTheme } from "@material-ui/core";

const Footer = () => {
  const theme = useTheme();

  return (
    <Box
      color="red"
      margin="0 auto"
      display="flex"
      padding="0.5rem 0"
      maxWidth={theme.maxWidth}
      borderTop={`1px solid ${theme.palette.divider}`}
      alignItems="center"
      flexDirection="column"
      justifyContent="center"
      style={{
        backgroundColor: theme.palette.background.default
      }}
    >
      <p>
        Las imagenes  son de libre distribucion  siempre que se indique  su  procedencia
      </p>
      <p>
        Contacto: jcgmilla@gmail.com
      </p>
    </Box>
  )
};

export default Footer;