import Head from "next/head";
import { useRouter } from "next/router";
import { Box, Chip } from "@material-ui/core";
import { useCallback, useState } from "react";

import { RegistroItem } from "types";

import PostsList from "src/components/PostsList/PostsList";

export type FotografiaProps = {
  tipos: string[];
  items: RegistroItem[];
};

const Fotografia: React.FC<FotografiaProps> = ({ tipos, items }) => {
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
  , [tipos, selectedEtiqueta]);

  const filteredItems = selectedEtiqueta
    ? items.filter(el =>
        el.tipo.includes(selectedEtiqueta)
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
          {tipos.map(name => {
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
  const tiposDeEntradas = (await import('cache/tipos.json')).default;
  const entradasConImagenes = (await import('cache/registro-observaciones.json')).default;

  return {
    props: {
      tipos: tiposDeEntradas,
      items: entradasConImagenes,
    },
  };
};

export default Fotografia;