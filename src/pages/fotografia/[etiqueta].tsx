import Head from 'next/head';
import { useRouter } from 'next/router';
import { Box, Chip, makeStyles } from '@material-ui/core';
import { GetStaticPaths, GetStaticProps } from 'next';
import React, { useState, useEffect, useCallback } from 'react';

import { RegistroItem } from 'types';
import { mapTagTextTitle, useIsomorphicLayoutEffect } from 'src/lib/util';

import H1 from 'src/components/Typography/H1';
import Alert from '@material-ui/lab/Alert/Alert';
import PostsList from 'src/components/PostsList/PostsList';
import AllImagesTitle from 'src/components/Typography/AllImagesTitle';
import ObservadoresSupernovas from 'src/components/Logo/ObservadoresSupernovas';

export type EntradasPorEtiquetaParams = {
  etiqueta: string;
};

export const getStaticPaths: GetStaticPaths<EntradasPorEtiquetaParams> =
  async () => {
    const etiquetas = (await import('cache/registro-etiquetas.json')).default;

    return {
      paths: etiquetas.map(etiqueta => {
        return { params: { etiqueta } };
      }),
      fallback: false,
    };
  }
;

export type EntradasPorEtiquetaProps = {
  items: RegistroItem[];
  etiqueta: string;
};

export const getStaticProps: GetStaticProps<EntradasPorEtiquetaProps, EntradasPorEtiquetaParams> =
  async ({ params }) => {
    const etiqueta = typeof params.etiqueta === 'string'
      ? params.etiqueta
      : ''
    ;

    const items = (await import(`cache/registro-${etiqueta}.json`)).default as RegistroItem[];

    return {
      props: {
        items,
        etiqueta,
      },
      revalidate: false,
    };
  }
;

const useStyles = makeStyles(theme => ({
  root: {
    margin: '0 1rem',

    [theme.breakpoints.up('md')]: {
      margin: '0 2rem',
    }
  },
  chip: {
    margin: '0.25rem',
    textTransform: 'capitalize',
  },
  etiquetasContainer: {
    margin: '0 0 2rem 0',
    padding: '.25rem'
  },
  postsItemContainer: {
    marginTop: '1rem',

    [theme.breakpoints.up('md')]: {
      marginTop: '2rem',
    },
  },
}));

const EntradasPorEtiqueta: React.FC<EntradasPorEtiquetaProps> = (props) => {
  const router = useRouter();
  const classes = useStyles();
  const etiqueta = (props.etiqueta || '').trim() || router.asPath.split('/').pop();

  const { items } = props;

  const {
    urlId: initialSelectedId = null,
  } = (router.query || {}) as { urlId: string; };

  const selectedItem = items.find(el => el.urlId === initialSelectedId);

  const initialId = selectedItem
    ? initialSelectedId
    : null
  ;

  const [selectedObjeto, setSelectedObjeto] = useState<string | null>(initialId);

  useEffect(() => {
    setSelectedObjeto(initialId);
  }, [initialId])

  const handleObjetoClick = useCallback(
    (ev: React.MouseEvent<HTMLDivElement>) => {
      const { id, tipo } = ev.currentTarget.dataset;

      const nextId = selectedObjeto === id
        ? null
        : id
      ;

      setSelectedObjeto(nextId);

      const query = {
        urlId: nextId,
        etiqueta: tipo,
      };

      router.replace({ query }, undefined, { shallow: true });
    },
    [items, selectedObjeto]
  );

  useIsomorphicLayoutEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const el = document.getElementById(selectedObjeto);

    if (el == null) {
      return;
    }

    const timer = setTimeout(() => {
      el.scrollIntoView();
    }, 300);

    return () => clearTimeout(timer);
  }, [selectedObjeto]);

  const tagTextTitle = mapTagTextTitle(etiqueta);

  return (
    <Box className={classes.root}>
      <Head>
        <title>OACM Fuensanta | {tagTextTitle}</title>
      </Head>

      <AllImagesTitle
        title={tagTextTitle}
        component={H1}
      >
        {/galaxia|supernova/i.test(tagTextTitle)
          ? <ObservadoresSupernovas />
          : null
        }
      </AllImagesTitle>

      <Box
        width="80%"
        margin="1rem auto"
      >
        <Alert
          severity="info"
        >
          Últimas capturas. Fotos anteriores en cada entrada.
        </Alert>
      </Box>

      {items.length > 6 && (<Box
        width="100%"
        height="100px"
        overflow="scroll"
        display="flex"
        flexWrap="wrap"
        alignItems="center"
        justifyContent="start"
        border="1px solid rgba(255, 255, 255, 0.15)"
        borderRadius="4px"
        className={classes.etiquetasContainer}
      >
        {items
          .map(el => {
            const { urlId, objeto, tipo } = el;

            return (
              <Chip
                key={urlId}
                label={objeto}
                variant={selectedObjeto === urlId
                  ? 'default'
                  : 'outlined'
                }
                onClick={handleObjetoClick}
                data-id={urlId}
                data-tipo={tipo}
                className={classes.chip}
              />
            );
          })
        }
      </Box>)}
      <PostsList
        items={items}
        selected={selectedObjeto}
      />
    </Box>
  );
};

export default EntradasPorEtiqueta;