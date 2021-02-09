import React from 'react';
import { NextRouter, useRouter } from 'next/router';

import Typography from '@material-ui/core/Typography';
import MuiBreadcrumbs from '@material-ui/core/Breadcrumbs';

import NavigationLink from 'src/components/Navigation/NavigationLink';
import { Box, makeStyles } from '@material-ui/core';

const mapRouteParts = (router: NextRouter) => {
  if (router.asPath === '/') {
    return [];
  }

  const routeParts = (router.asPath || router.pathname)
    .slice(1)
    .replace(/[?#][^\s]*$/, '')
    .split('/')
  ;

  return routeParts.map(value => {
    switch (value) {
      case 'fotografia': {
        return {
          href: '/fotografia',
          text: 'fotografía',
        };
      }
      case 'construccion': {
        return {
          href: '/construccion',
          text: 'construcción',
        };
      }
      case 'reparacion': {
        return {
          href: '/reparacion',
          text: 'reparación',
        };
      }
      default: {
        return {
          href: `/${value}`,
          text: value,
        };
      }
    }
  });
};

const useStyles = makeStyles(() => ({
  root: {
    margin: '1rem 1.5rem',
  },
}));

export type NavigationBreadcrumbsProps = {};

const NavigationBreadcrumbs: React.FC<NavigationBreadcrumbsProps> = () => {
  const router = useRouter();
  const classes = useStyles();

  const items = mapRouteParts(router);

  const links = items.slice(0, items.length - 1);

  const current = items.length > 0
    ? items[items.length - 1]
    : null
  ;

  return (
    <Box className={classes.root}>
      <MuiBreadcrumbs aria-label="breadcrumb">
        {current
          ? <NavigationLink
              href="/"
              text="inicio"
            />
          : <Typography color="textPrimary" style={{margin: 'unset'}}>
              inicio
            </Typography>
        }
        {links.map(({ text }, index, items) => {
          const href = items.slice(0, index + 1)
            .map(el => el.href)
            .join('')
          ;

          return (
            <NavigationLink
              key={href}
              href={href}
              text={text}
            />
          );
        })}
        {current && (
          <Typography color="textPrimary" style={{margin: 'unset'}}>
            {current.text}
          </Typography>
        )}
      </MuiBreadcrumbs>
    </Box>
  );
};

export default NavigationBreadcrumbs;