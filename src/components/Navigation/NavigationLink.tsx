import React, { forwardRef } from "react";
import NextLink from "next/link";

import BaseLink from "src/components/Navigation/BaseLink";

export type NavbarLinkProps = {
  id?: string
  href?: string;
  text?: string;
  style?: React.CSSProperties;
  className?: string;
  onClick?: (ev: React.MouseEvent<HTMLAnchorElement>) => void;
};

const NavigationLink: React.FC<NavbarLinkProps> = (props) => {
  const {
    id,
    href,
    text,
    style,
    children,
    className,
  } = props;

  return (
    <NextLink
      href={href}
      passHref={true}
    >
      <BaseLink
        id={id}
        style={style}
        className={className}
      >
        {text || children}
      </BaseLink>
    </NextLink>
  );
};

export default NavigationLink;