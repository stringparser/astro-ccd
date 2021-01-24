import clsx from "clsx";
import Link from "next/link";
import { makeStyles, Link as MuiLink, Box } from "@material-ui/core";

import H2 from "./Typography/H2";
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
    display: 'flex',
    padding: '1.25rem 0',
    marginBottom: '3rem',
    justifyContent: 'center',

    borderBottom: `1px solid ${theme.palette.divider}`,
  },

  nav: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  homeLink: {
    flex: '0.25',
    display: 'flex',
    fontSize: '1.45rem',
    alignItems: 'center',
    marginRight: '0.75rem',
    justifyContent: 'center',

    '@media (max-width: 376px)': {
      flex: '1',
    },
  },

  pageLinks: {
    flex: '0.9',
    margin: '0 auto',
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    marginLeft: '0.75rem',
  },

  linkBox: {
    flexBasis: '17%',
    marginTop: '0.5rem',

    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  link: {
    width: '100px',
    opacity: .8,
    transition: 'all linear 0.3s',
    textTransform: 'uppercase',

    '&:hover': {
      opacity: 1,
      textDecoration: 'none',
    }
  },

  currentLink: {
    color: 'red',
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