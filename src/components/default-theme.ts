import { createMuiTheme } from "@material-ui/core";

const defaultTheme = createMuiTheme({
  palette: {
    type: 'dark',
  },

  typography: {
    fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI","Roboto","Oxygen","Ubuntu","Cantarell","Fira Sans","Droid Sans","Helvetica Neue",sans-serif',
  },

  props: {
    MuiLink: {
      color: 'textSecondary',
    },
  },

  overrides: {
    MuiCssBaseline: {
      '@global': {
        body: {
          margin: '0',
          padding: '0',
          minHeight: '100vh',
          textAlign: 'center',
          fontWeight: 'bold',

          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
          justifyContent: 'center',

          color: '#fff',
          backgroundImage: 'url("https://astroccd.files.wordpress.com/2012/12/fondo-estrellas-tintineo.gif")',

          lineHeight: '1.43',
          textRendering: 'optimizeLegibility',
          scrollBehavior: 'smooth',
        },

        a: {
          color: '#ff0000',
          fontWeight: 'bold',
        },

        img: {
          margin: '0 auto',
          maxWidth: '100%',
        },
      },
    },
  }
});

export default defaultTheme;