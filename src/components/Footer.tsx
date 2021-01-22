import React from "react";
import { Box, useTheme } from "@material-ui/core";

const Footer = () => {
  const theme = useTheme();

  return (
    <Box
      color="red"
      display="flex"
      marginTop="3rem"
      boxShadow={`0 -1px 1px ${theme.palette.divider}`}
      alignItems="center"
      flexDirection="column"
      justifyContent="center"
    >
      <div style={{padding: '0.5rem'}} />
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