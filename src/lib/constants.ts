import { Link } from '@material-ui/core';

import Head from 'next/head';

import H1 from '../components/Typography/H1';
import H2 from '../components/Typography/H2';
import Image from '../components/Image';
import ImagenLink from '../components/ImagenLink';
import DisqusEmbed from 'src/components/DisqusEmbed';

export const mdxComponents = {
  Link,
  Image,
  ImagenLink,

  h1: H1,
  h2: H2,
  img: Image,
  head: Head,
  Imagen: Image,

  Comentarios: DisqusEmbed
};

export const mesMap = {
  enero: '01',
  febrero: '02',
  marzo: '03',
  abril: '04',
  mayo: '05',
  junio: '06',
  julio: '07',
  ago: '08',
  agosto: '08',
  Aagosto: '08',
  sep: '09',
  septiembre: '09',
  ocubre: '10',
  octubre: '10',
  noviembre: '11',
  diciembre: '12',
};