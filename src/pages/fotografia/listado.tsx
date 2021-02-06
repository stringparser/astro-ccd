import React from "react";
import { Box, makeStyles } from "@material-ui/core";
import { RegistroItem } from "types";
import { getEtiquetas, getRegistro } from "src/lib/staticProps";

import H1 from "src/components/Typography/H1";
import H2 from "src/components/Typography/H2";
import NavigationLink from "src/components/Navigation/NavigationLink";

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

export type ListadoCompletoDeFotografíasProps = {
  items: RegistroItem[];
  etiquetas: string[];
};

const ListadoCompletoDeFotografías: React.FC<ListadoCompletoDeFotografíasProps> = (props) => {
  const classes = useStyles();
  const { items, etiquetas } = props;

  return (
    <Box>
      <H1>
        Listado completo de fotografías
      </H1>
      <Box className={classes.seccionContainer}>
      {etiquetas.map(el => {
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
                .filter(it => it.etiquetas.includes(el))
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

export async function getStaticProps(): Promise<{ props: ListadoCompletoDeFotografíasProps; }> {
  return {
    props: {
      items: getRegistro(),
      etiquetas: getEtiquetas(),
    },
  };
};

export default ListadoCompletoDeFotografías;