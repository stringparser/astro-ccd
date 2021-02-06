import clsx from "clsx";
import React from "react";
import NextLink from "next/link";

import MuiLink from "@material-ui/core/Link/Link";

export type NavbarMenuLinkProps = {
  href: string;
  text: string;
  className?: string;
};

const NavigationLink: React.FC<NavbarMenuLinkProps> = (props) => {
  const { href, text, className } = props;

  return (
    <NextLink
      href={href}
      passHref={true}
    >
      <MuiLink
        className={className}
      >
        {text}
      </MuiLink>
    </NextLink>
  )
}

export default NavigationLink;