import clsx from "clsx";
import Link from "next/link";
import { Fragment } from 'react';
import { makeStyles, Link as MuiLink } from "@material-ui/core";

import { NextRouter, withRouter } from 'next/router';

const items = [
  {
    href: '/cometas-asteroides',
    text: 'cometas-asteroides',
  },
  {
    href: '/fuensanta',
    text: 'fuensanta',
  },
  {
    href: '/galaxias',
    text: 'galaxias',
  },
  {
    href: '/nebulosas',
    text: 'nebulosas',
  },
  {
    href: '/construccion-del-observatorio',
    text: 'construccion-del-observatorio',
  },
  {
    href: '/planetas-satelites',
    text: 'planetas-satelites',
  },
];

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
  },

  pageLinks: {
    margin: '0 1rem',
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
  },

  link: {
    fontWeight: 'bold',
    marginTop: '0.5rem',
    marginRight: '1rem',
    textTransform: 'uppercase',
  },

  homeLink: {
    fontSize: '1.45rem',
  },

  currentLink: {
    textDecoration: 'underline',
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
            <MuiLink href="/">
              OACM Fuensanta
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
                    {text}
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