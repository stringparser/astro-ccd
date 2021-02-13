import { Box, makeStyles } from "@material-ui/core";
import { useRouter } from "next/router";

import { mapTagTextTitle, ordenarPorFecha } from "src/lib/util";

import H2 from 'src/components/Typography/H2';
import PostsList from "src/components/PostsList/PostsList";

import registroSoloUltimaFoto from "cache/registro-solo-ultima-fotografia.json";

const useStyles = makeStyles(() => ({
  root: {
    margin: '4rem 0 2rem 0',

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
  const objeto = registroSoloUltimaFoto.find(el => el.urlId === urlId);

  if (!urlId || !objeto) {
    return null;
  }

  const etiquetas = (objeto.tipo || '').split(',');
  const etiquetaText = mapTagTextTitle(etiquetas.join(', '));

  const filteredItems = registroSoloUltimaFoto
    .filter(el => {
      if (el.urlId === urlId) {
        return false;
      }
      const parts = el.tipo.split(',');

      return parts.length == etiquetas.length
        ? parts.find(el => etiquetas.includes(el))
        : false
      ;
    })
    .sort(ordenarPorFecha)
    .slice(0, 3)
  ;

  if (filteredItems.length === 0) {
    return null;
  }

  const tipo = typeof router.query.tipo === 'string'
    ? router.query.tipo
    : undefined
  ;

  return (
    <Box className={classes.root}>
      <H2 style={{
        margin: '0.5rem auto',
        maxWidth: '300px',
        whiteSpace: 'pre-line',
        lineHeight: '1.5rem',
      }}>
        <span>Fotografía de </span>
        <span>{etiquetaText}</span>
        <span> como </span>
        <span>{objeto.titulo}</span>
      </H2>
      <PostsList
        tipo={tipo}
        items={filteredItems}
        className={classes.seguirLeyendoItems}
      />
    </Box>
  );
}

export default SeguirLeyendoContainer;