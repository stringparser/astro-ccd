import React from "react";
import { create } from "jss"
import { AppProps } from "next/app";
import { ThemeProvider, CssBaseline, StylesProvider, jssPreset } from "@material-ui/core";

import "src/css/main.css";

import Navigation from "src/components/Navigation";
import defaultTheme from "src/components/default-theme";

const jss = create({
  ...jssPreset(),
});

const WebApp: React.FC<AppProps> = ({ Component, pageProps }: AppProps) => {

  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector<HTMLElement>('#jss-server-side');

    if (jssStyles && jssStyles.parentElement) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <>
      <main>
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
