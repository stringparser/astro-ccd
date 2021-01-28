import React from "react";
import { Box, makeStyles, Typography, TypographyProps } from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    padding: '2rem 0',
  },
  header: {
    color: 'white',
    fontSize: '2.25rem',
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
});

const H1: React.FC<TypographyProps> = ({ style, ...props }) => {
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