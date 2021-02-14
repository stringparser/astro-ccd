import { NextRouter } from "next/router";
import { mapTextToUrl } from "src/lib/util";
import { RegistroItem, RegistroItemEntrada } from "types";

import registroMetadata from 'cache/registro-metadata.json';

export const mapRegistroURL = (
  el: Pick<RegistroItem, 'urlId'>,
  tipo?: string,
  src?: string,
) => {
  const base = `/fotografia/registro/${el.urlId}`;

  const href = tipo
    ? `${base}?tipo=${tipo}`
    : base
  ;

  return src
    ? `${href}#${mapTextToUrl(src.split('/').pop())}`
    : href
  ;
};

export const openContactEmail = (ev: React.MouseEvent<HTMLElement>) => {
  ev.preventDefault();
  ev.stopPropagation();

  const mailto = window.atob('bWFpbHRvOmpjZ21pbGxhQGdtYWlsLmNvbQ==');
  window.open(mailto, '_blank');
};

export const getOrigin  = () => (typeof window === 'undefined'
  ? 'http://local.astro-ccd.com:3000'
  : window.location.origin
).replace(/\/$/, '');

export const mapRouteParts = (router: NextRouter) => {
  if (router.asPath === '/') {
    return [];
  }

  const routeParts = (router.asPath || router.pathname)
    .slice(1)
    .replace(/[?#][^\s]*$/, '')
    .split('/')
  ;

  const urlId = routeParts[routeParts.length - 1];
  const itemProps = registroMetadata.find(el => el.urlId === urlId);

  const tipo = typeof router.query.tipo === 'string'
    ? router.query.tipo
    : itemProps && itemProps.tipo
  ;

  return routeParts.map(value => {
    switch (value) {
      case 'registro': {
        if (tipo) {
          return tipo.split(',')[0];
        }

        return value;
      }
      default: {
        return value;
      }
    }
  });
};