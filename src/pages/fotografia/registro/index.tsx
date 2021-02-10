import React from "react";
import { RegistroItem } from "types";
import { GetStaticProps } from "next";
import { Box, Typography, TableRow, Table, TableBody, TableCell, TableHead, TableContainer } from "@material-ui/core";

import { mapRegistroURL } from "src/lib/navigation";
import { mapFormattedDate, mapTagTextTitle, mapTextToUrl } from "src/lib/util";

import H1 from "src/components/Typography/H1";
import NavigationLink from "src/components/Navigation/NavigationLink";

type RegistroItemColumn = {
  width?: number;
  field?: keyof RegistroItem;
  header: string;
  align?: 'one',
  getValue?: (value: RegistroItem) => React.ReactNode;
};

const columns: RegistroItemColumn[] = [
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
  {
    field: 'tipo',
    header: 'TIPO',
    getValue(el) {
      return (
        <NavigationLink href={`/fotografia/${el.tipo}`}>
          <Typography>
            {mapTagTextTitle(`${el.tipo}`)}
          </Typography>
        </NavigationLink>
      );
    }
  },
  {
    header: 'ÚLTIMA FOTO',
    getValue(el) {
      const href = mapRegistroURL(el);
      const { urlId } = el;

      const [entrada] = el.entradas.slice()
        .filter(el => el.date)
        .sort((a, b) => (b.date || '').localeCompare(a.date || ''))
      ;

      const { src, date = '' } = entrada;

      const dateString = mapFormattedDate(date) || '?';

      return (
        <>
          <NavigationLink
            href={dateString == '?'
              ? href
              : `${href}#${mapTextToUrl(src)}`
            }
          >
            <Typography>
              {dateString}
            </Typography>
          </NavigationLink>
        </>
      );
    }
  }
];

export type RegistroFotografíasProps = {
  items: RegistroItem[];
};

const RegistroFotografías: React.FC<RegistroFotografíasProps> = (props) => {
  const { items } = props;

  return (
    <Box>
      <H1>
        Registro de Fotografías
      </H1>
      <TableContainer>
        <Table>
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
    </Box>
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