import Head from 'next/head';
import { Link } from '@material-ui/core';

import H1 from '../components/Typography/H1';
import H2 from '../components/Typography/H2';
import Image from '../components/Image/Image';
import DisqusEmbed from 'src/components/Disqus/DisqusEmbed';
import ReparacionSBIG from 'src/components/Destacado/ReparacionSBIG';

export const mdxComponents = {
  ReparacionSBIG,

  h1: H1,
  h2: H2,
  head: Head,

  a: Link,
  Link,

  Image,
  img: Image,
  Imagen: Image,

  Comentarios: DisqusEmbed,
};