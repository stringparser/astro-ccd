import React from "react";
import { Box, Typography, TypographyProps } from "@material-ui/core";

const H2: React.FC<TypographyProps> = ({ style, ...props }) => (
  <Box margin="1rem 0">
    <Typography
      style={{
        color: 'spanishblue',
        fontSize: '1rem',
        fontWeight: 'bold',
        ...style,
      }}
      {...props}
    />
  </Box>
);

export default H2;