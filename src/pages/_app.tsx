import React from "react";
import { create } from "jss"
import { AppProps } from "next/app";
import { ThemeProvider, CssBaseline, StylesProvider, jssPreset, makeStyles } from "@material-ui/core";

import Navigation from "src/components/Navigation";
import defaultTheme from "src/components/default-theme";

const jss = create({
  ...jssPreset(),
});

const useStyles = makeStyles(theme => ({
  root: {
    margin: '0 auto',
    maxWidth: '960px',
    minHeight: '100vh',

    border: '0.25rem solid white',
    borderTop: 'none',
    borderBottom: 'none',
    borderColor: 'rgba(255,255,255, 0.05)',

    backgroundColor: 'black',

    padding: '2rem 1rem',
    paddingTop: 0,
  }
}));

const WebApp: React.FC<AppProps> = ({ Component, pageProps }: AppProps) => {
  const classes = useStyles();

  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector<HTMLElement>('#jss-server-side');

    if (jssStyles && jssStyles.parentElement) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <>
      <main className={classes.root}>
        <ThemeProvider theme={defaultTheme}>
          <StylesProvider jss={jss}>
            <CssBaseline />
            <Navigation />
            <Component {...pageProps} />
          </StylesProvider>
        </ThemeProvider>
      </main>
    </>
  );
}

export default WebApp;
