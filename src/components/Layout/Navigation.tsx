import clsx from "clsx";
import Link from "next/link";
import HomeIcon from '@material-ui/icons/Home';
import { NextRouter } from 'next/router';
import { makeStyles, Link as MuiLink, Box, TextField } from "@material-ui/core";

import { PageBasename } from "src/types";
import { opacityMixin } from "src/components/styles";

const items = Object.entries(PageBasename)
  .map(([key, href]) => {
    switch (href) {
      case PageBasename.sistemaSolar: {
        return {
          href: `/${href}`,
          text: 'sistema solar',
        };
      }
      case PageBasename.reparacionCCD: {
        return {
          href: `/${href}`,
          text: 'reparación DE CCD SBIG',
        };
      }
      case PageBasename.cometasAsteroides: {
        return {
          href: `/${href}`,
          text: 'cometas y asteroides',
        };
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
;

const isCurrentPage = (currentHref: string, href: string) => (
  currentHref === href
);

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

    maxWidth: '80px',
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

export type NavigationProps = {
  router: NextRouter;
};

const Navigation: React.FC<NavigationProps> = ({ router }) => {
  const classes = useStyles();

  return (
    <header className={classes.header}>
        <nav className={classes.nav}>
          <aside className={classes.pageHomeAndSearch}>
            <MuiLink href="/" className={classes.homeLink}>
              <HomeIcon />
              <Box p="0.25rem" />
              OACM Fuensanta
            </MuiLink>
            <Box className={classes.pagesSearch}>
              <TextField placeholder="Buscar" />
            </Box>
          </aside>
          <aside  className={classes.pageLinks}>
            {items.map(({ href, text }, index) =>
              <Box
                key={index}
                className={classes.linkContainer}
              >
                <Link
                  href={href}
                  passHref={true}
                >
                  <MuiLink
                    className={clsx(
                      classes.link,
                      isCurrentPage(router.route, href) && classes.currentLink,
                    )}
                  >
                    {text.replace(/\-/g, ' ')}
                  </MuiLink>
                </Link>
              </Box>
            )}
          </aside>
        </nav>
      </header>
  );
};

export default Navigation;