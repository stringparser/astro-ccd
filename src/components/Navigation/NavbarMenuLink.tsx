import clsx from "clsx";
import React from "react";
import NextLink from "next/link";

import Box from "@material-ui/core/Box/Box";
import MuiLink from "@material-ui/core/Link/Link";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  link: {},
  linkContainer: {},
});

export type NavbarMenuLinkProps = {
  href: string;
  text: string;
  className?: string;
};

const NavbarMenuLink: React.FC<NavbarMenuLinkProps> = (props) => {
  const classes = useStyles();
  const { href, text, className } = props;

  return (
    <NextLink
      href={href}
      passHref={true}
    >
      <MuiLink
        className={className}
      >
        {text.replace(/\-/g, ' ')}
      </MuiLink>
    </NextLink>
  )
}

export default NavbarMenuLink;