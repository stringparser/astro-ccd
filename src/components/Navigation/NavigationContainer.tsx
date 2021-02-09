import clsx from "clsx";
import { useRouter } from 'next/router';
import { useCallback } from "react";
import { makeStyles, Box, Typography, Avatar } from "@material-ui/core";

import etiquetas from "cache/registro-etiquetas.json";
import { opacityMixin } from "src/components/mixins";
import { mapRegistroURL } from "src/lib/navigation";
import { PageBasename, RegistroItem } from "types";

import Busqueda from "src/components/Busqueda/Busqueda";
import NavigationLink from "src/components/Navigation/NavigationLink";

const isCurrentPage = (currentPathname: string, pagePathname: string) => (
  currentPathname.startsWith(pagePathname) ||
  pagePathname === '/fotografia' && currentPathname.startsWith('/registro')
);

const useStyles = makeStyles(theme => ({
  header: {
    paddingBottom: 0,

    display: 'flex',
    justifyContent: 'center',

    borderBottom: `1px solid ${theme.palette.divider}`,
    backgroundColor: theme.palette.background.default,
  },

  nav: {
    width: '100%',

    display: 'flex',
    alignItems: 'space-between',
    justifyContent: 'center',
    flexDirection: 'column',
  },

  pageHomeAndSearch: {
    padding: '0.5rem 1.25rem 0.25rem 1.25rem',

    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',

    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
    }
  },

  homeLinkContainer: {
    display: 'flex',
    flexDirection: 'column',

    alignItems: 'start',
    justifyContent: 'center',

    [theme.breakpoints.down('xs')]: {
      alignItems: 'center',
      marginBottom: '1rem',
    },
  },

  homeLink: {
    display: 'flex',
    alignItems: 'center',
    justifyItems: 'center',
    flexDirection: 'row',

    fontSize: '1.45rem',

    [theme.breakpoints.up('md')]: {
      fontSize: '1.65rem',
    },

    ...opacityMixin
  },

  pagesSearch: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },

  pageLinks: {
    width: '100%',
    marginTop: '0.75rem',

    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-around',

    [theme.breakpoints.up('sm')]: {
      justifyContent: 'flex-start',
    }
  },

  pageDescription: {
    maxWidth: '320px',

    opacity: .8,
    textAlign: 'center',
    marginTop: '0.5rem',

    [theme.breakpoints.up('sm')]: {
      maxWidth: '90%',
      textAlign: 'left',
    }
  },

  linkContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  link: {
    padding: '0.85rem',

    fontWeight: 'bold',
    borderBottom: '1px solid transparent',

    userSelect: 'none',
    textTransform: 'uppercase',

    '&:hover': {
      textDecoration: 'none',
    },

    [theme.breakpoints.up('sm')]: {
      padding: '1rem 2rem',
    },

    ...opacityMixin
  },

  currentLink: {
    color: 'rgb(255, 0, 0, 0.6)',

    [theme.breakpoints.up('sm')]: {
      color: theme.palette.text.primary,
      borderBottomColor: 'rgb(255, 0, 0, 0.6)',
    }
  },

  hiddenSM: {
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    }
  }
}));

export type NavigationProps = {};

const Navigation: React.FC<NavigationProps> = () => {
  const router = useRouter();
  const classes = useStyles();

  const handleBusquedaChange = useCallback((value: RegistroItem) => {
    const url = mapRegistroURL(value);
    router.push(url);
  }, []);

  const navigationItems = [
    {
      href: '/fotografia',
      children: 'Fotografía',
    },
    ...Object.entries(PageBasename)
    .map(([key, href]) => {
      switch (href) {
        case PageBasename.reparacionCCD: {
          return {
            href: `/${href}`,
            children: (
              <>
                Reparación
                <span className={classes.hiddenSM}> de CDD SBIG</span>
              </>
            ),
          };
        }
        case PageBasename.galaxias:
        case PageBasename.nebulosas:
        case PageBasename.sistemaSolar:
        case PageBasename.cometasAsteroides: {
          return null;
        }
        case PageBasename.construccionObservatorio: {
          return {
            href: `/${href}`,
            children: 'Observatorio',
          };
        }
        default: {
          return {
            href: `/${href}`,
            children: key,
          };
        }
      }
    })
    .filter(v => v)
  ];

  return (
    <header className={classes.header}>
        <nav className={classes.nav}>
          <aside className={classes.pageHomeAndSearch}>
            <Box
              flex={1}
              className={classes.homeLinkContainer}
            >
              <NavigationLink
                href="/"
                className={classes.homeLink}
              >
                <Avatar
                  src={require('@public/favicon.png').default}
                />
                <Box ml="1rem" />
                OACM Fuensanta
              </NavigationLink>

              <Box className={classes.pageDescription}>
                <Typography variant="caption">
                  Observación astrónomica. Construcción de observatorio, telescopio y CCD.
                </Typography>
              </Box>
            </Box>
            <Box className={classes.pagesSearch}>
              <Busqueda onChange={handleBusquedaChange} />
            </Box>
          </aside>
          <aside  className={classes.pageLinks}>
            {navigationItems.map(({ href, children }, index) =>
              <Box
                key={index}
                className={classes.linkContainer}
              >
                <NavigationLink
                  href={href}
                  className={clsx(
                    classes.link,
                    isCurrentPage(router.route, href) && classes.currentLink,
                  )}
                >
                  {children}
                </NavigationLink>
              </Box>
            )}
          </aside>
        </nav>
      </header>
  );
};

export default Navigation;