import React from 'react';
import { ServerStyleSheets } from '@material-ui/core';
import Document, { Html, Head, Main, NextScript, DocumentContext } from 'next/document';

class ApplicationDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    // Render app and page and get the context of the page with collected side effects.
    const sheets = new ServerStyleSheets();
    const originalRenderPage = ctx.renderPage;

    ctx.renderPage = () =>
      originalRenderPage({
        enhanceApp: (App) => (props) => sheets.collect(<App {...props} />),
      })
    ;

    const initialProps = await Document.getInitialProps(ctx);

    return {
      ...initialProps,
      // Styles fragment is rendered after the app and page rendering finish.
      styles: [
        ...React.Children.toArray(initialProps.styles),
        sheets.getStyleElement()
      ],
    };
  }

  render() {
    return (
      <Html lang="es">
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default ApplicationDocument;