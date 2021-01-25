import React from "react";
import { create } from "jss"
import { MDXProvider } from '@mdx-js/react'
import { AppContext, AppProps } from "next/app";
import { ThemeProvider, CssBaseline, StylesProvider, jssPreset, makeStyles, Box } from "@material-ui/core";

import { mdxComponents } from "src/lib/constants";

import Footer from "src/components/Footer";
import Navigation from "src/components/Navigation";
import defaultTheme from "src/components/default-theme";
import ScrollToTopButton from "src/components/ScrollToTopButton";

const jss = create({
  ...jssPreset(),
});

const useStyles = makeStyles(theme => ({
  main: {
    margin: '0 auto',
    padding: '5rem 1rem',
    minHeight: '100vh',

    border: '0.25rem solid white',
    borderTop: 'none',
    borderColor: 'rgba(255,255,255, 0.05)',
    borderBottom: 'none',

    backgroundColor: theme.palette.common.black,

    '@media (min-width: 960px)': {
      maxWidth: '960px',
    },
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
            <Navigation />
            <main className={classes.main}>
              <Component {...pageProps} />
            </main>
            <Footer />
            <ScrollToTopButton />
          </StylesProvider>
        </MDXProvider>
      </ThemeProvider>
    </>
  );
}

export async function getStaticProps({ Component, router, ctx }: AppContext) {
  const props = typeof window === 'undefined' && Component.getInitialProps
    ? await Component.getInitialProps(ctx)
    : {}
  ;

  return {
    props
  };
}

export default WebApp;
