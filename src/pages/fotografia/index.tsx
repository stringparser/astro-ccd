import Head from "next/head";
import { Box, Chip } from "@material-ui/core";
import { useCallback, useState } from "react";

import { RegistroItem } from "types";
import { esEntradaValidaConImagen } from "src/lib/util";

import PostsList from "src/components/PostsList/PostsList";
import { getEtiquetas, getRegistro } from "src/lib/staticProps";
import { useRouter } from "next/router";

export type FotografiaProps = {
  items: RegistroItem[];
  etiquetas: string[];
};

const Fotografia: React.FC<FotografiaProps> = ({ items, etiquetas }) => {
  const router = useRouter();
  const [selectedEtiqueta, setSelectedEtiqueta] = useState<string | null>(null);

  const handleEtiquetaClick = useCallback(
    (ev: React.MouseEvent<HTMLDivElement>) => {
      const { id } = ev.currentTarget.dataset;

      setSelectedEtiqueta(selectedEtiqueta === id
        ? null
        : id
      );

      router.replace(`?etiqueta=${id}`);
    }
  , [etiquetas, selectedEtiqueta]);

  const filteredItems = selectedEtiqueta
    ? items.filter(el =>
        el.etiquetas.includes(selectedEtiqueta)
      )
    : items
  ;

  return (
    <Box>
      <Head>
        <title>OACM Fuensanta | Fotografía</title>
      </Head>
      <Box
        margin="3rem 0 2rem 0"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Box
          display="flex"
          alignItems="center"
        >
          {etiquetas.map(name => {
            return (
              <Chip
                key={name}
                label={name.replace(/[-]+/, ' ')}
                variant={selectedEtiqueta === name
                  ? 'default'
                  : 'outlined'
                }
                onClick={handleEtiquetaClick}
                data-id={name}
                style={{margin: '0 1rem 0 0'}}
              />
            );
          })}
        </Box>
      </Box>
      <PostsList
        items={filteredItems}
        mostrarEtiquetas
      />
    </Box>
  );
};

export async function getStaticProps(): Promise<{ props: FotografiaProps; }> {
  const registro = getRegistro();

  return {
    props: {
      items: registro
        .map(el => {
          return {
            ...el,
            entradas: el.entradas.filter(esEntradaValidaConImagen)
          }
        })
        .filter(el => el.entradas.length > 0)
      ,
      etiquetas: getEtiquetas(),
    },
  };
};

export default Fotografia;