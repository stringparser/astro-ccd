import React from 'react';
import { NextRouter } from 'next/router';

import HomeIcon from '@material-ui/icons/Home';
import Typography from '@material-ui/core/Typography';
import makeStyles from '@material-ui/core/styles/makeStyles';
import MuiBreadcrumbs from '@material-ui/core/Breadcrumbs';

import NavigationLink from 'src/components/Navigation/NavigationLink';
import { Box } from '@material-ui/core';

export type NavigationBreadcrumbsProps = {
  router: NextRouter;
};

const useStyles = makeStyles(() => ({
  root: {
    margin: '1rem 3rem 2rem 3rem',
  }
}))

const mapRouteParts = (router: NextRouter) => {
  if (router.pathname === '/') {
    return [];
  }

  const routeParts = router.pathname.slice(1).split('/');

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
          href: '/reparaccion',
          text: 'reparacción',
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

const NavigationBreadcrumbs: React.FC<NavigationBreadcrumbsProps> = props => {
  const classes = useStyles();
  const { router } = props;

  const items = mapRouteParts(router);

  const links = items.slice(0, items.length - 1);

  const current = items.length > 0
    ? items[items.length - 1]
    : null
  ;

  return (
    <MuiBreadcrumbs
      className={classes.root}
      aria-label="breadcrumb"
    >
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
  );
};

export default NavigationBreadcrumbs;