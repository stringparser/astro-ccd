import React from "react";
import { create } from "jss"
import { MDXProvider } from '@mdx-js/react'
import { AppContext, AppProps } from "next/app";
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
  const { router, Component, pageProps } = props;

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
              <Navigation router={router} />
              <Box flex="1">
                <Component {...pageProps} />
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

// @ts-ignore
WebApp.getInitialProps = async (context: AppContext) => {
  const { getRegistro } = await import('src/lib/staticProps');

  const registro = await getRegistro();

  return {
    pageProps: {
      registro,
    }
  };
}

export default WebApp;
