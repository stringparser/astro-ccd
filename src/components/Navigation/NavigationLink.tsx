import NextLink from "next/link";
import { useRouter } from "next/router";
import React, { useCallback } from "react";

import BaseLink from "src/components/Navigation/BaseLink";

export type NavbarLinkProps = {
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
    id,
    href,
    text,
    style,
    prefecth,
    children,
    className,
    onClick,
  } = props;

  const handleClick = useCallback(
    (ev: React.MouseEvent<HTMLAnchorElement>) => {
      ev.preventDefault();

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
      id={id}
      href={href}
      style={style}
      className={className}
      onClick={handleClick}
    >
      {text || children}
    </BaseLink>
  );
};

export default NavigationLink;