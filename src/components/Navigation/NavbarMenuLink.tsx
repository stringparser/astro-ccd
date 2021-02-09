import React from "react";
import NextLink from "next/link";

import MuiLink from "@material-ui/core/Link/Link";

export type NavbarMenuLinkProps = {
  href: string;
  text?: string;
  children?: React.ReactNode;
  className?: string;
};

const NavbarMenuLink: React.FC<NavbarMenuLinkProps> = (props) => {
  const { href, text, className } = props;

  return (
    <NextLink
      href={href}
      passHref={true}
    >
      <MuiLink className={className}>
        {text.replace(/\-/g, ' ')}
      </MuiLink>
    </NextLink>
  )
}

export default NavbarMenuLink;