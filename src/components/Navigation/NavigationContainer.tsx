import clsx from "clsx";
import NextLink from "next/link";
import HomeIcon from '@material-ui/icons/Home';
import { useRouter } from 'next/router';
import { useCallback } from "react";
import { makeStyles, Link as MuiLink, Box, Typography } from "@material-ui/core";

import Busqueda from "../Busqueda/Busqueda";
import NavbarMenuLink from "./NavbarMenuLink";
import { opacityMixin } from "src/components/mixins";
import { mapRegistroURL } from "src/lib/navigation";
import { PageBasename, RegistroItem } from "types";

const items = Object.entries(PageBasename)
  .map(([key, href]) => {
    switch (href) {
      case PageBasename.reparacionCCD: {
        return {
          href: `/${href}`,
          text: 'reparación',
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
          text: 'Observatorio',
        };
      }
      default: {
        return {
          href: `/${href}`,
          text: key,
        };
      }
    }
  })
  .filter(v => v)
;

const isCurrentPage = (currentPathname: string, pagePathname: string) => (
  currentPathname.startsWith(pagePathname)
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
  },

  homeLinkContainer: {
    display: 'flex',

    alignItems: 'center',
    justifyContent: 'start',
  },

  homeLink: {
    display: 'flex',
    fontSize: '1.45rem',
    alignItems: 'center',
    justifyContent: 'start',

    ...opacityMixin
  },

  homeLinkSubtitle: {
    opacity: .8,
    margin: '0 0 0 1rem',
    maxWidth: '50vw',
    textAlign: 'left',
    whiteSpace: 'pre-wrap',
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
    alignItems: 'center',
    justifyContent: 'space-around'
  },

  linkContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',

    marginBottom: '-1px',
  },

  link: {
    padding: '1rem 1.5rem',

    fontWeight: 'bold',
    borderBottom: '1px solid transparent',
    textTransform: 'uppercase',

    '&:hover': {
      textDecoration: 'none',
    },

    ...opacityMixin
  },

  currentLink: {
    borderBottomColor: 'rgb(255, 0, 0, 0.6)',
  },
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
      text: 'Fotografía',
    },
    ...items
  ];

  return (
    <header className={classes.header}>
        <nav className={classes.nav}>
          <aside className={classes.pageHomeAndSearch}>
            <Box flex={1} className={classes.homeLinkContainer}>
              <Box
                display="flex"
                alignItems="center"
                justifyContent="center"
                flexDirection="column"
                className={classes.homeLink}
              >
                <span>OACM</span>
                <span>Fuensanta</span>
              </Box>
              <Typography
                variant="caption"
                className={classes.homeLinkSubtitle}
              >
                Observación astrónomica. <br/>
                Construcción de observatorio, <br/>
                telescopio y CCD.
              </Typography>
            </Box>
            <Box className={classes.pagesSearch}>
              <Busqueda onChange={handleBusquedaChange} />
            </Box>
          </aside>
          <aside  className={classes.pageLinks}>
              <Box
                className={classes.linkContainer}
              >
                <NavbarMenuLink
                  href="/"
                  text="Inicio"
                  className={clsx(
                    classes.link,
                    router.route === '/' && classes.currentLink,
                  )}
                />
              </Box>
            {navigationItems.map(({ href, text }, index) =>
              <Box
                key={index}
                className={classes.linkContainer}
              >
                <NavbarMenuLink
                  href={href}
                  text={text.replace(/\-/g, ' ')}
                  className={clsx(
                    classes.link,
                    isCurrentPage(router.route, href) && classes.currentLink,
                  )}
                />
              </Box>
            )}
          </aside>
        </nav>
      </header>
  );
};

export default Navigation;