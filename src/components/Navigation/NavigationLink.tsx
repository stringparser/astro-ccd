import React, { forwardRef } from "react";
import NextLink from "next/link";

import BaseLink from "src/components/Navigation/BaseLink";

export type NavbarLinkProps = {
  id?: string
  href?: string;
  text?: string;
  className?: string;
  onClick?: (ev: React.MouseEvent<HTMLAnchorElement>) => void;
};

const NavigationLink: React.FC<NavbarLinkProps> = (props) => {
  const {
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
  );
}

export default NavigationLink;