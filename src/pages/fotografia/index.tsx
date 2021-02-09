import Head from "next/head";
import { useRouter } from "next/router";
import { Box, Chip, makeStyles } from "@material-ui/core";
import { useCallback, useEffect, useState } from "react";
import { InferGetStaticPropsType } from "next";

import { useIsomorphicLayoutEffect } from "src/lib/util";

import PostsList from "src/components/PostsList/PostsList";

export const getStaticProps = async () => {
  const items = (await import('cache/registro-fotografia.json')).default;
  const etiquetas = (await import('cache/registro-etiquetas.json')).default;

  return {
    props: {
      items,
      etiquetas,
    },
    revalidate: false,
  };
};

export type FotografiaProps = InferGetStaticPropsType<typeof getStaticProps>;

export type FotografiaQueryProps = {
  tipo: string | null;
  urlId: string | null;
};

const useStyles = makeStyles(() => ({
  chip: {
    margin: '0.25rem',
    textTransform: 'capitalize',
  },
}));

const Fotografia: React.FC<FotografiaProps> = props => {
  const router = useRouter();
  const classes = useStyles();

  const {
    items,
    etiquetas,
  } = props;

  const {
    tipo: initialSelectedTipo = null,
    urlId: initialSelectedId = null,
  } = (router.query || {}) as FotografiaQueryProps;

  const selectedItem = items.find(el => el.urlId === initialSelectedId);

  const initialId = selectedItem
    ? initialSelectedId
    : null
  ;

  const initialTipo = selectedItem
    ? selectedItem.tipo === initialSelectedTipo
      ? initialSelectedTipo
      : null
    : etiquetas.includes(initialSelectedTipo)
      ? initialSelectedTipo
      : null
  ;

  const [selectedTipo, setSelectedTipo] = useState<string | null>(initialTipo);
  const [selectedObjeto, setSelectedObjeto] = useState<string | null>(initialId);

  useEffect(() => {
    setSelectedTipo(initialTipo);
    setSelectedObjeto(initialId);
  }, [initialId, initialTipo])

  const handleObjetoClick = useCallback(
    (ev: React.MouseEvent<HTMLDivElement>) => {
      const { id, tipo } = ev.currentTarget.dataset;

      const nextId = selectedObjeto === id
        ? null
        : id
      ;

      setSelectedObjeto(nextId);

      const query = {} as FotografiaQueryProps;

      if (nextId) {
        query.urlId = nextId;
      }

      if (tipo || selectedTipo) {
        query.tipo = tipo || selectedTipo;
      }

      router.replace({ query }, undefined, { shallow: true });
    },
    [items, selectedObjeto]
  );

  const handleEtiquetaClick = useCallback(
    (ev: React.MouseEvent<HTMLDivElement>) => {
      const { id } = ev.currentTarget.dataset;

      const nextTipo =  id == null || selectedTipo === id
        ? null
        : id
      ;

      setSelectedTipo(nextTipo);

      const query = {} as FotografiaQueryProps;

      if (nextTipo) {
        query.tipo = nextTipo;
      }

      router.replace({ query }, undefined, { shallow: true });

    }
  , [etiquetas, selectedTipo]);

  const filteredItems = selectedTipo
    ? items.filter(el =>
        el.tipo.includes(selectedTipo)
      )
    : items
  ;

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

  return (
    <Box>
      <Head>
        <title>OACM Fuensanta | Fotografía</title>
      </Head>

      <Box
        margin="2rem"
        border="1px solid rgba(255, 255, 255, 0.15)"
        borderRadius="4px"
      >
        <Box
          p="0.75rem"
          pb="0.75rem"
          width="100%"
          display="flex"
          flexWrap="wrap"
          alignItems="center"
          justifyContent="start"
          borderBottom="1px solid rgba(255, 255, 255, 0.15)"
        >
          <Chip
            label="Seleccionar todo"
            variant={selectedTipo
              ? 'outlined'
              : 'default'
            }
            onClick={handleEtiquetaClick}
            className={classes.chip}
          />
          {etiquetas.map(name => {
            return (
              <Chip
                key={name}
                label={name.replace(/[-]+/, ' ')}
                variant={selectedTipo === name
                  ? 'default'
                  : 'outlined'
                }
                onClick={handleEtiquetaClick}
                data-id={name}
                className={classes.chip}
              />
            );
          })}
        </Box>
        <Box
          margin="0.5rem"
          width="100%"
          height="100px"
          overflow="scroll"
          display="flex"
          flexWrap="wrap"
          alignItems="center"
          justifyContent="start"
        >
          {items
            .filter(el => selectedTipo
              ? el.tipo === selectedTipo
              : true
            )
            .map(el => {
              const { tipo, urlId, objeto } = el;

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
        </Box>
      </Box>
      <PostsList
        items={filteredItems}
        selected={selectedObjeto}
        mostrarEtiquetas
      />
    </Box>
  );
};

export default Fotografia;