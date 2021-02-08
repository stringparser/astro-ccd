import { Box } from "@material-ui/core";
import { useRouter } from "next/router";
import PostsList from "src/components/PostsList/PostsList";
import H1 from "src/components/Typography/H1";
import { RegistroItem } from "types";

export type FotografiaTipoObjeto = {
  params: {
    tipo: string;
  };
  items: RegistroItem[];
};

const FotografiaTipoObjeto: React.FC<FotografiaTipoObjeto> = (props) => {
  const {
    items,
    params: { tipo },
  } = props;

  return (
    <Box>
      <H1 style={{textTransform: 'capitalize'}}>
        {tipo.replace(/[-]/g, ' ')}
      </H1>
      <PostsList items={items} />
    </Box>
  )
}

export async function getStaticProps({ params }: Pick<FotografiaTipoObjeto, 'params'>) {
  const { tipo } = params;
  const entradasConImagenes = (await import('cache/registro-observaciones.json')).default;

  return {
    props: {
      params,
      items: entradasConImagenes.filter(el => el.tipo === tipo)
    }
  };
}

export async function getStaticPaths() {
  const tiposDeEntradas = (await import('cache/tipos.json')).default;

  return {
    paths: tiposDeEntradas.map(tipo =>
      ({
        params: { tipo }
      })
    ),
    fallback: false,
  };
}

export default FotografiaTipoObjeto;