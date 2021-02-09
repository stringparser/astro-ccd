import clsx from "clsx";
import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Typography, { TypographyProps } from "@material-ui/core/Typography/Typography";

const useStyles = makeStyles(theme => ({
  root: {
    margin: '0 auto',
    padding: '2rem 0',
    textAlign: 'center',

    color: 'royalblue',
    fontSize: '2.25rem',
    fontWeight: 'bold',

    [theme.breakpoints.up('md')]: {
      textAlign: 'left',
    },
  },
}));

const H1: React.FC<TypographyProps> = ({ className, ...props }) => {
  const classes = useStyles();

  return (
    <Typography
      variant="h1"
      {...props}
      className={clsx(classes.root, className)}
    />
  );
};

export default H1;