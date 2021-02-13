import React from 'react';
import { NextRouter, useRouter } from 'next/router';

import { mapTextToUrl } from 'src/lib/util';

import Typography from '@material-ui/core/Typography';
import MuiBreadcrumbs from '@material-ui/core/Breadcrumbs';
import { Box, Chip, makeStyles } from '@material-ui/core';

import NavigationLink from 'src/components/Navigation/NavigationLink';

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

const useStyles = makeStyles(theme => ({
  root: {
    margin: '0.75rem 0.5rem',

    [theme.breakpoints.up('sm')]: {
      margin: '1rem 1.5rem',
    },

    '& $clickable, $disabled': {
      fontSize: 'inherit',

      [theme.breakpoints.down('xs')]: {
        fontSize: '0.95rem',
      },
    },
  },
  clickable: {
    cursor: 'pointer',
  },
  disabled: {
    borderColor: 'transparent',
  }
}));

const normalizeText = (value: string) => (
  value
    .replace(/cion$/, 'ción')
    .replace(/^fotografia$/, 'fotografía')
);

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
      <MuiBreadcrumbs aria-label="breadcrumb" separator=">">
        {current
          ? <NavigationLink
              href="/"
            >
              <Chip
                label="inicio"
                variant="outlined"
                className={classes.clickable}
              />
            </NavigationLink>
          : <Chip
                label="inicio"
                className={classes.disabled}
            />
        }
        {links.map((value, index, items) => {
          const href = `/${items
            .slice(0, index + 1)
            .join('/')
          }`;

          const text = normalizeText(value);

          return (
            <NavigationLink
              key={href}
              href={href}
            >
              <Chip
                label={text}
                variant="outlined"
                className={classes.clickable}
              />
            </NavigationLink>
          );
        })}
        {current && (
          <Chip
            label={normalizeText(current)}
            variant="outlined"
            className={classes.disabled}
          />
        )}
      </MuiBreadcrumbs>
    </Box>
  );
};

export default NavigationBreadcrumbs;