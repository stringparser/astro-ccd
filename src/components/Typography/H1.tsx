import React from "react";
import { Box, makeStyles, Typography, TypographyProps } from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    padding: '2rem 0',
  },
  header: {
    color: 'royalblue',
    fontSize: '2.25rem',
    fontWeight: 'bold',
  },
});

const H1: React.FC<TypographyProps> = (props) => {
  const classes = useStyles();

  return (
    <Box margin="1rem 0" className={classes.root}>
      <Typography
        variant="h1"
        className={classes.header}
        {...props}
      />
    </Box>
  );
};

export default H1;