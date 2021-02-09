import Head from "next/head";
import React, { useEffect } from "react";
import { create } from "jss"
import { AppProps } from "next/app";
import { MDXProvider } from '@mdx-js/react'
import { ThemeProvider, CssBaseline, StylesProvider, jssPreset, makeStyles, Box } from "@material-ui/core";

import { maxWidthMixin } from "src/components/mixins";
import { APP_ROOT_PORTAL_ID } from "src/lib/portal";

import Footer from "src/components/Layout/Footer";
import Navigation from "src/components/Navigation/NavigationContainer";
import DisqusEmbed from "src/components/Disqus/DisqusEmbed";
import defaultTheme from "src/components/default-theme";
import ScrollToTopButton from "src/components/Layout/ScrollToTopButton";
import NavigationBreadcrumbs from "src/components/Navigation/NavigationBreadcrumbs";
import SeguirLeyendoContainer from "src/components/PostsList/SeguirLeyendoContainer";

import { mdxComponents } from "src/components/MDX/components";

const jss = create({
  ...jssPreset(),
});

const useStyles = makeStyles(theme => ({
  main: {
    flex: 1,
    margin: '0 auto',
    padding: '1rem 0.5rem 0 0.5rem',

    width: '100%',
    minHeight: '100vh',

    display: 'flex',
    flexDirection: 'column',

    backgroundColor: theme.palette.common.black,

    [theme.breakpoints.up('md')]: {
      width: theme.breakpoints.values.md,
      border: '0.25rem solid white',
      borderTop: 'none',
      borderColor: 'rgba(255,255,255, 0.05)',
      borderBottom: 'none',
    }
  },
  content: {
    margin: '1rem 2.5%',
    textAlign: 'left',

    [theme.breakpoints.up('sm')]: {
      margin: '2rem 5%'
    }
  }
}));

const WebApp: React.FC<AppProps> = (props: AppProps) => {
  const classes = useStyles();
  const { Component, pageProps, router } = props;

  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector<HTMLElement>('#jss-server-side');

    if (jssStyles && jssStyles.parentElement) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, [router]);

  return (
    <>
      <ThemeProvider theme={defaultTheme}>
        <MDXProvider components={mdxComponents}>
          <StylesProvider jss={jss}>
            <CssBaseline />
            <Head>
              <title>
                {router.route === '/'
                  ? 'OACM Fuensanta | Inicio'
                  : 'OACM Fuensanta'
                }
              </title>
              <link
                rel="icon"
                href={require('@public/favicon.png').default}
              />
            </Head>
            <main className={classes.main}>
              <Navigation />
              <Box flex="1">
                <NavigationBreadcrumbs />
                <Component
                  {...pageProps}
                  className={classes.content}
                />
                <SeguirLeyendoContainer />
                {/^(\/|\/404)$/.test(router.pathname)
                  ? null
                  : <DisqusEmbed />
                }
              </Box>
              <Footer />
            </main>
            <ScrollToTopButton />
          </StylesProvider>
        </MDXProvider>
      </ThemeProvider>
      <div id={APP_ROOT_PORTAL_ID}></div>
    </>
  );
};

export default WebApp;
