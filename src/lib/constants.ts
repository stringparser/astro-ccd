import Head from 'next/head';
import { Link } from '@material-ui/core';

import H1 from 'src/components/Typography/H1';
import H2 from 'src/components/Typography/H2';
import Image from 'src/components/Image/Image';
import ImagenObras from 'src/components/Image/ImagenObras';
import DisqusEmbed from 'src/components/Disqus/DisqusEmbed';
import ReparacionSBIG from 'src/components/Destacado/ReparacionSBIG';

export const mdxComponents = {
  head: Head,

  h1: H1,
  h2: H2,

  a: Link,
  Link,

  Image,
  img: Image,
  Imagen: Image,

  ImagenObras,
  ReparacionSBIG,

  Comentarios: DisqusEmbed,
};