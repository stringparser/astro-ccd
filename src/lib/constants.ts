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