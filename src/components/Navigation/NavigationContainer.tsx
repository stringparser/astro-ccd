import clsx from "clsx";
import Link from "next/link";
import HomeIcon from '@material-ui/icons/Home';
import { useRouter } from 'next/router';
import { useCallback } from "react";
import { makeStyles, Link as MuiLink, Box } from "@material-ui/core";

import { opacityMixin } from "src/components/mixins";
import { PageBasename, RegistroItem } from "src/types";
import Busqueda from "../Busqueda/Busqueda";
import { mapRegistroURL } from "src/lib/navigation";
import FotosMenu, { fotosMenuItems } from "./FotosMenu";
import NavbarMenuLink from "./NavbarMenuLink";

const items = Object.entries(PageBasename)
  .map(([key, href]) => {
    switch (href) {
      case PageBasename.reparacionCCD: {
        return {
          href: `/${href}`,
          text: 'reparación DE CCD SBIG',
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
          text: 'contrucción del observatorio',
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

const isCurrentPage = (currentHref: string, href: string) => (
  currentHref === href
);

const isPhotosMenuPage = (route: string) => {
  console.log('route', route);
  return fotosMenuItems.find(el => el.href === route) != null;
};

const useStyles = makeStyles(theme => ({
  header: {
    padding: '0.5rem',

    display: 'flex',
    justifyContent: 'center',

    borderBottom: `1px solid ${theme.palette.divider}`,
    backgroundColor: theme.palette.background.default,
  },

  nav: {
    width: '100%',

    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },

  pageHomeAndSearch: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  homeLink: {
    display: 'flex',
    fontSize: '1.45rem',
    alignItems: 'center',
    justifyContent: 'center',

    ...opacityMixin
  },

  pagesSearch: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },

  pageLinks: {
    width: '100%',
    marginTop: '1.5rem',

    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  },

  linkContainer: {
    margin: '0.5rem 1.5rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  link: {
    padding: '0.25rem 0',

    fontWeight: 'bold',
    borderBottom: '1px solid transparent',
    textTransform: 'uppercase',

    transition: 'all linear 0.3s',

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

  return (
    <header className={classes.header}>
        <nav className={classes.nav}>
          <aside className={classes.pageHomeAndSearch}>
            <MuiLink
              href="/"
              className={classes.homeLink}
            >
              <HomeIcon />
              <Box p="0.25rem" />
              OACM Fuensanta
            </MuiLink>
            <Box className={classes.pagesSearch}>
              <Busqueda onChange={handleBusquedaChange} />
            </Box>
          </aside>
          <aside  className={classes.pageLinks}>
            <Box className={classes.linkContainer}>
              <NavbarMenuLink
                href={`/${PageBasename.fuensanta}`}
                text="Fuensanta"
                className={clsx(
                  classes.link,
                  isCurrentPage(router.route, `/${PageBasename.fuensanta}`) && classes.currentLink,
                )}
              />
            </Box>
            <Box className={classes.linkContainer}>
              <FotosMenu
                className={clsx(
                  classes.link,
                  isPhotosMenuPage(router.route)
                  ? classes.currentLink
                  : undefined
                )}
              />
            </Box>
            <Box className={classes.linkContainer}>
              <NavbarMenuLink
                href={`/${PageBasename.construccionObservatorio}`}
                text="Construcción del Observatorio"
                className={clsx(
                  classes.link,
                  isCurrentPage(router.route, `/${PageBasename.construccionObservatorio}`) && classes.currentLink,
                )}
              />
            </Box>
            <Box className={classes.linkContainer}>
              <NavbarMenuLink
                href={`/${PageBasename.reparacionCCD}`}
                text="Reparación de CCD SBIG"
                className={clsx(
                  classes.link,
                  isCurrentPage(router.route, `/${PageBasename.reparacionCCD}`) && classes.currentLink,
                )}
              />
            </Box>
          </aside>
        </nav>
      </header>
  );
};

export default Navigation;