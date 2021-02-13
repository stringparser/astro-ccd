import { createMuiTheme } from "@material-ui/core";

const fondoTintineo = require('@public/img/fondo-estrellas-tintineo.gif').default;

const defaultTheme = createMuiTheme({
  maxWidth: '1024px',

  palette: {
    type: 'dark',
    divider: 'rgba(255, 255, 255, 0.2)',
    background: {
      default: 'black',
    }
  },

  transitions: {
    easing: {
      easeIn: 'linear',
    },
    duration: {
      standard: 0.3,
    },
  },

  typography: {
    fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI","Roboto","Oxygen","Ubuntu","Cantarell","Fira Sans","Droid Sans","Helvetica Neue",sans-serif',
  },

  props: {
    MuiLink: {
      color: 'textSecondary',
    },
    MuiTypography: {
      variantMapping: {
        h1: 'h1',
        h2: 'h2',
        h3: 'h3',
        h4: 'h4',
        h5: 'h5',
        h6: 'h6',
        body1: 'p',
        body2: 'p',
        subtitle1: 'h2',
        subtitle2: 'h2',
      },
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

          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
          justifyContent: 'center',

          color: '#fff',
          backgroundImage: `url(${fondoTintineo})`,

          lineHeight: '1.43',
          textRendering: 'optimizeLegibility',
          scrollBehavior: 'smooth',

          '& > div': {
            display: 'flex',
            flexDirection: 'column',
          },

          '@media (min-width: 960px)': {
            textAlign: 'left',
          }
        },

        a: {
          color: 'currentColor',
        },

        p: {
          margin: '1rem auto',
          fontWeight: 'bold',
        },

        hr: {
          margin: '4rem 0 0 0',
          borderColor: 'rgba(255, 255, 255, 0.2)',
        },

        img: {
          maxWidth: '100%',

          '@media (min-width: 960px)': {
            margin: '0 auto',
          },
        },
      },
    },
  }
});

export default defaultTheme;