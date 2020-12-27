import React from "react";
import { AppProps } from "next/app";

import "src/css/main.css";

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return <Component {...pageProps} />;
}

export default MyApp;
