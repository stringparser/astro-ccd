import clsx from "clsx";
import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import { useRouter } from "next/router";
import Typography, { TypographyProps } from "@material-ui/core/Typography/Typography";
import { mapIdPropsFromChildren } from "src/lib/util";

const useStyles = makeStyles(theme => ({
  root: {
    margin: '1rem 0',
    textAlign: 'center',

    color: 'royalblue',
    fontSize: '1rem',
    fontWeight: 'bold',

    [theme.breakpoints.up('md')]: {
      textAlign: 'left',
    },
  },
}));

const H2: React.FC<TypographyProps> = ({ className, ...props }) => {
  const router = useRouter();
  const classes = useStyles();

  return (
    <Typography
      {...mapIdPropsFromChildren(props, router)}
      variant="h2"
      {...props}
      className={clsx(classes.root, className)}
    />
  );
};

export default H2;