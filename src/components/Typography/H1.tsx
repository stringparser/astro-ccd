import React from "react";
import { Box, Typography, TypographyProps } from "@material-ui/core";

const H1: React.FC<TypographyProps> = props => (
  <Box margin="1rem 0">
    <Typography
      style={{color: 'spanishblue', fontSize: '1.25rem', fontWeight: 'bold'}}
      {...props}
    />
  </Box>
);

export default H1;