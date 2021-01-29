import React from "react";
import { create } from "jss"
import { AppProps } from "next/app";
import { MDXProvider } from '@mdx-js/react'
import { ThemeProvider, CssBaseline, StylesProvider, jssPreset, makeStyles, Box } from "@material-ui/core";

import { mdxComponents } from "src/lib/constants";

import Footer from "src/components/Layout/Footer";
import Navigation from "src/components/Layout/Navigation";
import defaultTheme from "src/components/default-theme";
import ScrollToTopButton from "src/components/Layout/ScrollToTopButton";
import { maxWidthMixin } from "src/components/styles";
import { APP_ROOT_PORTAL_ID } from "src/lib/portal";

const jss = create({
  ...jssPreset(),
});

const useStyles = makeStyles(theme => ({
  main: {
    flex: 1,
    margin: '0 auto',
    padding: '1rem 0.5rem 0 0.5rem',
    minHeight: '100vh',

    border: '0.25rem solid white',
    borderTop: 'none',
    borderColor: 'rgba(255,255,255, 0.05)',
    borderBottom: 'none',

    display: 'flex',
    flexDirection: 'column',

    backgroundColor: theme.palette.common.black,

    ...maxWidthMixin,
  }
}));

const WebApp: React.FC<AppProps> = (props: AppProps) => {
  const classes = useStyles();
  const { Component, pageProps } = props;

  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector<HTMLElement>('#jss-server-side');

    if (jssStyles && jssStyles.parentElement) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <>
      <ThemeProvider theme={defaultTheme}>
        <MDXProvider components={mdxComponents}>
          <StylesProvider jss={jss}>
            <CssBaseline />
            <main className={classes.main}>
              <Navigation />
              <Box flex="1">
                <Component {...pageProps} />
              </Box>
              <Footer />
            </main>
            <div id={APP_ROOT_PORTAL_ID}></div>
            <ScrollToTopButton />
          </StylesProvider>
        </MDXProvider>
      </ThemeProvider>
    </>
  );
}

export function getStaticProps() {
  console.log('app static props');
}

export default WebApp;
