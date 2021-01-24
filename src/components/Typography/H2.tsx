import React from "react";
import { Box, makeStyles, Typography, TypographyProps } from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    color: 'royalblue',
    fontSize: '1rem',
    fontWeight: 'bold',
  },
});

const H2: React.FC<TypographyProps> = ({ style, ...props }) => {
  const classes = useStyles();

  return (
    <Box margin="1rem 0">
      <Typography
        variant="h2"
        className={classes.root}
        {...props}
      />
    </Box>
  );
};

export default H2;