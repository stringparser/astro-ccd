import React from "react";

import clsx from "clsx";

import MuiLink from "@material-ui/core/Link/Link";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  root: {
    cursor: 'pointer',
  },
}))

export type NavbarMenuLinkProps = {
  href?: string;
  text?: string;
  className?: string;
  onClick?: (ev: React.MouseEvent<HTMLAnchorElement>) => void;
};

const BaseLink: React.FC<NavbarMenuLinkProps> = (props) => {
  const {
    href,
    text,
    className,
    onClick,
    ...rest
  } = props;

  const classes = useStyles();

  return (
    <MuiLink
      href={href}
      onClick={onClick}
      className={clsx(classes.root, className)}
      {...rest}
    >
      {text || props.children}
    </MuiLink>
  )
}

export default BaseLink;