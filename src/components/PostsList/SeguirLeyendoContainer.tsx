import { Box, makeStyles } from "@material-ui/core";
import { useRouter } from "next/router";

import { ordenarPorFecha } from "src/lib/util";

import H2 from 'src/components/Typography/H2';
import PostsList from "src/components/PostsList/PostsList";

import registroFotosJSON from "cache/registro-fotografia.json";

const useStyles = makeStyles(() => ({
  root: {
    marginTop: '2rem',

    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',

    width: '100vw',
    paddingTop: '1rem',

    '@media (min-width: 562px)': {
      width: 'auto',
    },

    borderTop: '1px solid rgba(255, 255, 255, 0.15)',
  },
  seguirLeyendoItems: {
    maxWidth: '90vw',

    '@media (max-width: 562px)': {
      '& > :nth-child(n + 2)': {
        display: 'none',
      },
    },

    '@media (min-width: 563px) and (max-width: 1024px)': {
      '& > :nth-child(n + 3)': {
        display: 'none',
      }
    },

    '@media (min-width: 1024px)': {
      '& > :nth-child(n)': {
        display: 'flex',
      }
    },
  }
}));

const SeguirLeyendoContainer: React.FC = () => {
  const router = useRouter();
  const classes = useStyles();

  if (!/\/registro\/[^\s\/]+/.test(router.pathname)) {
    return null;
  }

  const urlId = router.pathname.replace(/\/$/, '').split('/').pop();

  if (!urlId) {
    return null;
  }

  const objeto = registroFotosJSON.find(el => el.urlId === urlId);
  const etiqueta = objeto.tipo || '';
  const etiquetaText = etiqueta.replace(/[-]/g, ' ');

  const filteredItems = registroFotosJSON
    .filter(el =>
      el.tipo === etiqueta
      && el.urlId !== urlId
    )
    .sort(ordenarPorFecha)
    .slice(0, 3)
  ;

  return (
    <Box className={classes.root}>
      <H2 style={{
        maxWidth: '50vw',
        margin: '0 auto',
        whiteSpace: 'pre-line'
      }}>
        Fotografía
        <span> de </span>
        <span>{etiquetaText}</span>
        <span> como </span>
        <span> {objeto.titulo}</span>
      </H2>
      <PostsList
        items={filteredItems}
        className={classes.seguirLeyendoItems}
      />
    </Box>
  );
}

export default SeguirLeyendoContainer;