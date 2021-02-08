import React from "react";
import NextLink from "next/link";

import BaseLink from "src/components/Navigation/BaseLink";

export type NavbarMenuLinkProps = {
  href?: string;
  text?: string;
  className?: string;
  onClick?: (ev: React.MouseEvent<HTMLAnchorElement>) => void;
};

const NavigationLink: React.FC<NavbarMenuLinkProps> = (props) => {
  const {
    // @ts-ignore
    ref,
    href,
    text,
    children,
    ...rest
  } = props;

  return (
    <NextLink
      href={href}
      passHref={true}
    >
      <BaseLink {...rest}>
        {text || children}
      </BaseLink>
    </NextLink>
  )
}

export default NavigationLink;