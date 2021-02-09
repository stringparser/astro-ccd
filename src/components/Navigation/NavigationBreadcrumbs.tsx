import React from 'react';
import { NextRouter, useRouter } from 'next/router';

import Typography from '@material-ui/core/Typography';
import MuiBreadcrumbs from '@material-ui/core/Breadcrumbs';

import NavigationLink from 'src/components/Navigation/NavigationLink';
import { Box, makeStyles } from '@material-ui/core';

import registroMetadata from 'cache/registro-metadata.json';

const mapRouteParts = (router: NextRouter) => {
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

  return routeParts.map(value => {
    switch (value) {
      case 'registro': {
        if (itemProps && itemProps.tipo) {
          return itemProps.tipo;
        }

        return value;
      }
      default: {
        return value;
      }
    }
  });
};

const useStyles = makeStyles(theme => ({
  root: {
    margin: '0.75rem 0.5rem',

    [theme.breakpoints.up('sm')]: {
      margin: '1rem 1.5rem',
    },

    '& a,p': {
      [theme.breakpoints.down('xs')]: {
        fontSize: '0.85rem',
      },
    },
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
        {links.map((value, index, items) => {
          const href = `/${items.slice(0, index + 1)
            .join('/')
          }`;

          const text = value
            .replace(/cion$/, 'ción')
            .replace(/^fotografia$/, 'fotografía')
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
            {current}
          </Typography>
        )}
      </MuiBreadcrumbs>
    </Box>
  );
};

export default NavigationBreadcrumbs;