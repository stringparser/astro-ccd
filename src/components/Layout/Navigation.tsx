import clsx from "clsx";
import Link from "next/link";
import { makeStyles, Link as MuiLink, Box } from "@material-ui/core";

import { PageBasename } from "src/types";
import { NextRouter, withRouter } from 'next/router';

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
    margin: '0 auto',
    padding: '1.5rem 1rem',
    maxWidth: theme.maxWidth,

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
    padding: '0 2rem',
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
    justifyContent: 'space-between',
  },

  linkBox: {
    width: '80px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  link: {
    opacity: .8,
    fontWeight: 'bold',
    transition: 'all linear 0.3s',
    textTransform: 'uppercase',

    '&:hover': {
      opacity: 1,
      textDecoration: 'none',
    }
  },

  currentLink: {
    color: 'rgb(200, 0, 0, 0.9)',
    fontWeight: 'bold',
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