import clsx from "clsx";
import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import { useRouter } from "next/router";
import { mapIdPropsFromChildren } from "src/lib/util";

import Typography, { TypographyProps } from "@material-ui/core/Typography/Typography";

const useStyles = makeStyles(theme => ({
  root: {
    margin: '1rem 0',
    textAlign: 'center',

    color: 'royalblue',
    fontSize: '1.25rem',
    fontWeight: 'bold',

    [theme.breakpoints.up('md')]: {
      textAlign: 'left',
    },
  },
}));

const H3: React.FC<TypographyProps> = ({ className, ...props }) => {
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

export default H3;