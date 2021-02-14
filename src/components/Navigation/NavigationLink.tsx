import { LinkProps } from "@material-ui/core";
import NextLink from "next/link";
import { useRouter } from "next/router";
import React, { useCallback } from "react";

import BaseLink from "src/components/Navigation/BaseLink";

export type NavbarLinkProps = LinkProps & {
  id?: string
  href?: string;
  text?: string;
  style?: React.CSSProperties;
  prefecth?: boolean;
  className?: string;
  onClick?: (ev: React.MouseEvent<HTMLAnchorElement>) => void;
};

const NavigationLink: React.FC<NavbarLinkProps> = (props) => {
  const router = useRouter();

  const {
    href,
    text,
    prefecth,
    children,
    onClick,
    ...rest
  } = props;

  const handleClick = useCallback(
    (ev: React.MouseEvent<HTMLAnchorElement>) => {
      ev.preventDefault();
      ev.stopPropagation();

      router.push(href);

      if (onClick) {
        onClick(ev);
      }
    },
    [href, router, onClick]
  );

  <NextLink
    href={href}
    prefetch={prefecth}
  />

  return (
    <BaseLink
      {...rest}
      href={href}
      onClick={handleClick}
    >
      {text || children}
    </BaseLink>
  );
};

export default NavigationLink;