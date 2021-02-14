import React from "react";
import { RegistroItem, RegistroItemEntrada } from "types";
import { GetStaticProps } from "next";
import { Box, Typography, TableRow, Table, TableBody, TableCell, TableHead, TableContainer } from "@material-ui/core";

import { mapRegistroURL } from "src/lib/navigation";
import { mapFormattedDate, mapTagTextTitle } from "src/lib/util";

import H1 from "src/components/Typography/H1";
import NavigationLink from "src/components/Navigation/NavigationLink";

type RegistroListItem =
  Omit<RegistroItem, 'entradas'>
  & RegistroItemEntrada
;

type RegistroItemColumn = {
  width?: number;
  field?: keyof RegistroListItem;
  header: string;
  getValue?: (value: RegistroListItem) => React.ReactNode;
};

const columns: RegistroItemColumn[] = [
  {
    header: 'FECHA',
    getValue(el) {
      const href = mapRegistroURL(el, (el.tipo || '').split(',')[0], el.src);

      const { date = '' } = el;

      const dateString = mapFormattedDate(date, ' ') || '?';

      return (
        <>
          <NavigationLink href={href}>
            <Typography>
              {dateString.replace(/^[0\s]+/, '')}
            </Typography>
          </NavigationLink>
        </>
      );
    }
  },
  {
    field: 'tipo',
    header: 'TIPO',
    getValue(el) {
      return (
        el.tipo.split(',').map(tipo => {
          return (
            <NavigationLink
              key={tipo}
              href={`/fotografia/${tipo}`}
            >
              <Typography>
                {mapTagTextTitle(tipo)}
              </Typography>
            </NavigationLink>
          );
        })
      );
    }
  },
  {
    field: 'objeto',
    header: 'OBJETO',
    getValue(el) {
      const href = mapRegistroURL(el);

      return (
        <NavigationLink href={href}>
          <Typography>
            {el.titulo || el.objeto}
          </Typography>
        </NavigationLink>
      );
    }
  },
];

export type RegistroFotografíasProps = {
  items: RegistroItem[];
};

const RegistroFotografías: React.FC<RegistroFotografíasProps> = (props) => {
  const items = props.items
    .flatMap(({ entradas, ...el }) =>
      entradas.map(it => ({ ...el, ...it }))
    )
    .sort((a, b) => {
      return (b.date || '').localeCompare(a.date || '');
    })
  ;

  return (
    <>
      <H1>
        Registro completo
      </H1>

      <TableContainer
        component={Box}
        style={{
          width: 'auto',
          marginTop: '2rem',

          borderRadius: '4px',
        }}
      >
        <Table
          style={{
            width: 'auto',
            border: '1px solid rgba(255,255,255,0.15)',
            margin: '0 auto'
          }}
          size="small"
          stickyHeader={true}
        >
          <TableHead>
            <TableRow>
              {columns.map(el => {
                return (
                  <TableCell key={el.field || el.header}>
                    {el.header}
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map(row => {
              return (
                <TableRow key={row.urlId}>
                  {columns.map(({ field, header, getValue }) => {
                    return (
                      <TableCell
                        key={field || header}
                        align="left"
                      >
                        {getValue
                          ? getValue(row)
                          : row[field]
                        }
                      </TableCell>
                    )
                  })}
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
};

export const getStaticProps: GetStaticProps<RegistroFotografíasProps> = async () => {
  const items = (await import('cache/registro-fotografia.json')).default;

  return {
    props: {
      items,
    },
    revalidate: false,
  };
};

export default RegistroFotografías;