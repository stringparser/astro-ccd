import React, { useCallback } from "react";

import BaseLink from "src/components/Navigation/BaseLink";
import { useRouter } from "next/router";

export type NavbarLinkProps = {
  id?: string
  href?: string;
  text?: string;
  style?: React.CSSProperties;
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
    children,
    className,
    onClick,
  } = props;

  const handleClick = useCallback(
    (ev: React.MouseEvent<HTMLAnchorElement>) => {
      ev.preventDefault();

      router.push(ev.currentTarget.href);

      if (onClick) {
        onClick(ev);
      }
    },
    [router]
  );

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