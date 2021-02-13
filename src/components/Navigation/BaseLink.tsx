import React from "react";

import clsx from "clsx";

import { makeStyles } from "@material-ui/core";
import MuiLink, { LinkProps as MuiLinkProps } from "@material-ui/core/Link/Link";

const useStyles = makeStyles(() => ({
  root: {
    cursor: 'pointer',
    overflowWrap: 'anywhere',

    '&:hover': {
      textDecoration: 'none',
    },
  },
}))

export type NavbarMenuLinkProps = MuiLinkProps & {
  text?: string;
};

const BaseLink: React.FC<NavbarMenuLinkProps> = (props) => {
  const {
    href,
    text,
    target,
    className,
    onClick,
    ...rest
  } = props;

  const classes = useStyles();

  return (
    <MuiLink
      href={href}
      target={target || '_blank'}
      onClick={onClick}
      className={clsx(classes.root, className)}
      {...rest}
    >
      {text || props.children}
    </MuiLink>
  );
}

export default BaseLink;