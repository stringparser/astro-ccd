import React from 'react';
import { useRouter } from 'next/router';

import NavigateNextIcon from '@material-ui/icons/NavigateNext';

import MuiBreadcrumbs from '@material-ui/core/Breadcrumbs';
import { Box, Chip, makeStyles } from '@material-ui/core';

import NavigationLink from 'src/components/Navigation/NavigationLink';
import { mapRouteParts } from 'src/lib/navigation';

const useStyles = makeStyles(theme => ({
  root: {
    margin: '0.55rem 0.1rem',

    [theme.breakpoints.up('sm')]: {
      margin: '1rem 1.5rem',
    },

    '& $clickable, $disabled': {
      fontSize: 'inherit',

      [theme.breakpoints.down('xs')]: {
        fontSize: '0.95rem',
      },
    },

    [theme.breakpoints.down('xs')]: {
      '& .MuiChip-label': {
        height: 'auto',
        padding: '0 8px',
      },
      '& .MuiBreadcrumbs-separator': {
        margin: '0',
      },
    }
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
      <MuiBreadcrumbs
        separator={<NavigateNextIcon fontSize="inherit" />}
        aria-label="breadcrumb"
      >
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
                variant="outlined"
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