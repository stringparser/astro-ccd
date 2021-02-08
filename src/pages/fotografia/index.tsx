import Head from "next/head";
import { useRouter } from "next/router";
import { useCallback, useEffect, useLayoutEffect, useState } from "react";
import { Box, Chip, Typography } from "@material-ui/core";

import { RegistroItem } from "types";

import PostsList from "src/components/PostsList/PostsList";
import { GetServerSidePropsContext } from "next";

export type FotografiaProps = {
  items: RegistroItem[];
  etiquetas: string[];
  query: Partial<{
    urlId: string;
    tipo: string;
  }>
};

const useIsomorphicLayoutEffect =
  typeof window !== 'undefined' ? useLayoutEffect : useEffect
;

const Fotografia: React.FC<FotografiaProps> = props => {
  const router = useRouter();

  const {
    items,
    etiquetas,
    query: {
      tipo: initialTipo,
      urlId: initialId,
    },
  } = props;

  const [selectedTipo, setSelectedTipo] = useState<string | null>(initialTipo);
  const [selectedObjeto, setSelectedObjeto] = useState<string | null>(initialId);

  const handleObjetoClick = useCallback(
    (ev: React.MouseEvent<HTMLDivElement>) => {
      const { id } = ev.currentTarget.dataset;

      const nextId = selectedObjeto === id
        ? null
        : id
      ;

      setSelectedObjeto(nextId);

      router.replace(`?${
        [
          selectedTipo ? `tipo=${selectedTipo}` : '',
          nextId && `urlId=${nextId}`
        ]
        .filter(v => v)
        .join('&')
      }`);
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

      router.replace(nextTipo
        ? `?tipo=${nextTipo}`
        : router.pathname
      );

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
        margin="3rem 2rem"
        border="1px solid rgba(255, 255, 255, 0.15)"
        borderRadius="4px"
      >
        <Box
          p="0.75rem"
          pb="0.75rem"
          width="100%"
          display="flex"
          alignItems="center"
          justifyContent="start"
          borderBottom="1px solid rgba(255, 255, 255, 0.15)"
        >
          <Chip
            label="Seleccionar todos"
            variant={selectedTipo
              ? 'outlined'
              : 'default'
            }
            onClick={handleEtiquetaClick}
            style={{margin: '0.5rem'}}
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
                style={{margin: '0 1rem 0 0', textTransform: 'capitalize'}}
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
              const { urlId, objeto } = el;

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
                  style={{margin: '0.5rem', textTransform: 'capitalize'}}
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

export async function getServerSideProps(context: GetServerSidePropsContext): Promise<{ props: FotografiaProps; }> {
  const items = (await import('cache/registro-observaciones.json')).default;
  const etiquetas = (await import('cache/tipos.json')).default;

  const {
    tipo: selectedTipo = null,
    urlId: selectedId = null,
  } = (context.query || {}) as FotografiaProps['query'];

  const selectedItem = items.find(el => el.urlId === selectedId);

  return {
    props: {
      items,
      etiquetas,
      query: {
        urlId: selectedItem
          ? selectedId
          : null
        ,
        tipo: selectedItem
           ? selectedItem.tipo === selectedTipo
            ? selectedTipo
            : null
           : etiquetas.includes(selectedTipo)
            ? selectedTipo
            : null
          ,
      },
    },
  };
};

export default Fotografia;