import clsx from "clsx";
import Link from "next/link";
import { Fragment } from 'react';
import { makeStyles, Link as MuiLink } from "@material-ui/core";

import { NextRouter, withRouter } from 'next/router';
import { PageBasename } from "src/types";

const items = Object.entries(PageBasename)
  .map(([key, href]) => {
    switch (href) {
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
    display: 'flex',
    padding: '1.25rem 0',
    boxShadow: `0 1px 1px ${theme.palette.divider}`,
    justifyContent: 'center',
  },

  nav: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  pageLinks: {
    flex: '1',
    margin: '0 auto',
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
  },

  link: {
    opacity: .8,
    flexBasis: '20%',
    marginTop: '0.5rem',
    transition: 'all linear 0.3s',
    textTransform: 'uppercase',

    '&:hover': {
      opacity: 1,
      textDecoration: 'none',
    }
  },

  homeLink: {
    flex: '0.20',
    fontSize: '1.45rem',
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
              <Fragment key={index}>
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
              </Fragment>
            )}
          </aside>
        </nav>
      </header>
  );
}

export default withRouter(Navigation);