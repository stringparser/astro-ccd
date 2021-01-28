import clsx from "clsx";
import Link from "next/link";
import { makeStyles, Link as MuiLink, Box } from "@material-ui/core";

import { PageBasename } from "src/types";
import { NextRouter, withRouter } from 'next/router';
import { maxWidthMixin } from "../styles";

const items = Object.entries(PageBasename)
  .map(([key, href]) => {
    switch (href) {
      case PageBasename.cometasAsteroides: {
        return {
          href: `/${href}`,
          text: 'cometas y asteroides',
        };
      }
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
    width: '100%',
    margin: '0 auto',
    padding: '0.5rem',

    display: 'flex',
    justifyContent: 'center',

    borderBottom: `1px solid ${theme.palette.divider}`,
    backgroundColor: theme.palette.background.default,
  },

  nav: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  homeLink: {
    padding: '0.5rem 2rem',
    display: 'flex',
    fontSize: '1.45rem',
    alignItems: 'center',
    justifyContent: 'center',
  },

  pageLinks: {
    flex: 1,

    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',

    ...maxWidthMixin,
  },

  linkBox: {
    margin: '0.5rem 2rem',
    width: '80px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  link: {
    padding: '0.25rem 0',

    opacity: .8,
    fontWeight: 'bold',
    borderBottom: '1px solid transparent',
    textTransform: 'uppercase',

    transition: 'all linear 0.3s',

    '&:hover': {
      opacity: 1,
      textDecoration: 'none',
    }
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
          <aside className={classes.homeLink}>
            <MuiLink href="/" style={{color: 'royalblue'}}>
              OACM<br />Fuensanta
            </MuiLink>
          </aside>
          <aside  className={classes.pageLinks}>
            {items.map(({ href, text }, index) =>
              <Box
                key={index}
                className={classes.linkBox}
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
}

export default withRouter(Navigation);