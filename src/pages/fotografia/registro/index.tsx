import React from "react";
import { Box, makeStyles } from "@material-ui/core";
import { RegistroItem } from "types";

import H1 from "src/components/Typography/H1";
import H2 from "src/components/Typography/H2";
import NavigationLink from "src/components/Navigation/NavigationLink";
import NavigationBreadcrumbs from "src/components/Navigation/NavigationBreadcrumbs";
import { useRouter } from "next/router";

const useStyles = makeStyles(() => ({
  seccionContainer: {
    width: '80%',
    margin: '0 auto',

    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between'
  },
  seccionEtiqueta: {
    width: '150px',
    display: 'flex',
    alignItems: 'start',
    flexDirection: 'column',
  },
  tituloEtiqueta: {
    margin: '1rem 0',
    textTransform: 'uppercase',
  },
  listadoEtiqueta: {
    maxWidth: '300px',
    margin: 0,
    textAlign: 'left',
  },
}));

export type RegistroFotografíasProps = {
  tipos: string[];
  items: RegistroItem[];
};

const RegistroFotografías: React.FC<RegistroFotografíasProps> = (props) => {
  const classes = useStyles();
  const { items, tipos } = props;

  return (
    <Box>
      <H1>
        Registro de Fotografías
      </H1>
      <Box className={classes.seccionContainer}>
      {tipos.map(el => {
        return (
          <Box
            key={el}
            className={classes.seccionEtiqueta}
          >
            <H2 className={classes.tituloEtiqueta}>
              {(el === 'cometas-asteroides' && 'Cometas y Asteroides'
                || el === 'sistema-solar' && 'Sistema y Solar'
                || el
              )}
            </H2>
            <ul className={classes.listadoEtiqueta}>
              {items
                .filter(it => it.tipo.includes(el))
                .map(el => {

                  return (
                    <li key={el.urlId}>
                      <NavigationLink
                        href={`/registro/${el.urlId}`}
                        text={el.objeto}
                      />
                    </li>
                  )
                })
              }
            </ul>
          </Box>
        )
      })}
      </Box>
    </Box>
  )
};

export async function getStaticProps(): Promise<{ props: RegistroFotografíasProps; }> {
  const tipos = (await import('cache/registro-etiquetas.json')).default;
  const items = (await import('cache/registro-fotografia.json')).default;

  return {
    props: {
      tipos,
      items,
    },
  };
};

export default RegistroFotografías;