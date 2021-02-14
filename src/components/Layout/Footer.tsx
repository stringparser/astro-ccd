import React from "react";
import Email from "@material-ui/icons/Email";
import { Box, Button, Typography, withStyles } from "@material-ui/core";

import { openContactEmail } from "src/lib/navigation";

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

const StyledButton = withStyles({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
  }
})(Button);

const Footer = () => {

  return (
    <StyledBox>
      <Typography
        color="textSecondary"
      >
        Las imágenes son de libre distribución siempre que se indique su procedencia.
      </Typography>
      <StyledButton
        variant="text"
        onClick={openContactEmail}
      >
        <Email fontSize="small" />
        <Box p="3px" />
        Contacto
      </StyledButton>
    </StyledBox>
  )
};

export default Footer;