import { useCallback, useState } from "react";
import { Box, Chip, Typography } from "@material-ui/core";

import { RegistroItem } from "types";

import H1 from "src/components/Typography/H1";
import PostsList from "src/components/PostsList/PostsList";
import { getEtiquetas, getRegistro } from "src/lib/staticProps";
import NavigationLink from "src/components/Navigation/NavigationLink";
import { ChevronRight } from "@material-ui/icons";

export type FotografiaProps = {
  items: RegistroItem[];
  etiquetas: string[];
};

const Fotografia: React.FC<FotografiaProps> = ({ items, etiquetas }) => {

  const [selectedEtiquetas, setSelectedEtiquetas] = useState<string[]>([]);

  const handleEtiquetaClick = useCallback(
    (ev: React.MouseEvent<HTMLDivElement>) => {
      const { id } = ev.currentTarget.dataset;

      setSelectedEtiquetas(selectedEtiquetas.includes(id)
        ? selectedEtiquetas.filter(el => el !== id)
        : selectedEtiquetas.concat(id)
      );
    }
  , [etiquetas, selectedEtiquetas]);

  const filteredItems = selectedEtiquetas.length > 0
    ? items.filter(el =>
        selectedEtiquetas.find(name =>
          el.etiquetas.includes(name)
        ) != null
      )
    : items
  ;

  return (
    <Box>
      <H1 style={{ marginBottom: '0.25rem' }}>
        Fotografía
      </H1>
      <Box
        margin="0 auto 2rem auto"
        maxWidth="60%"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <ChevronRight style={{height: '15px'}} />
        <span> </span>
        <NavigationLink
          href="/fotografia/listado"
          text="Listado completo"
        />
      </Box>
      <Box
        margin="0 auto 2rem auto"
        maxWidth="60%"
        alignItems="center"
        justifyContent="start"
      >
        <Box
          flex={1}
          display="flex"
          alignItems="center"
          justifyContent="space-between"
        >
          {etiquetas.map(name => {
            return (
              <Chip
                key={name}
                label={name.replace(/[-]+/, ' ')}
                variant={selectedEtiquetas.includes(name)
                  ? 'default'
                  : 'outlined'
                }
                onClick={handleEtiquetaClick}
                data-id={name}
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
  return {
    props: {
      items: await getRegistro(),
      etiquetas: getEtiquetas(),
    },
  };
};

export default Fotografia;