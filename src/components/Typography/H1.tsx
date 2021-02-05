import clsx from "clsx";
import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Typography, { TypographyProps } from "@material-ui/core/Typography/Typography";

const useStyles = makeStyles({
  root: {
    margin: '1rem 0',
    padding: '2rem 0',

    color: 'royalblue',
    fontSize: '2.25rem',
    fontWeight: 'bold',
  },
});

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