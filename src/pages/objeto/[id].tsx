import fs from 'fs-extra';
import path from 'path';
import matter from 'gray-matter';
import { Box } from '@material-ui/core';

import hydrate from 'next-mdx-remote/hydrate'
import { MdxRemote } from 'next-mdx-remote/types';
import renderToString from 'next-mdx-remote/render-to-string';

import DisqusEmbed from 'src/components/Disqus/DisqusEmbed';

import { mdxComponents } from 'src/lib/constants';
import { ParsedMDXResult, parseMDX } from 'src/lib/parseMDX';

type PostParams = {
  params: {
    id: string
  }
};

type ObjetoByIdProps = ParsedMDXResult & {
  urlId: string;
  mdxSource: MdxRemote.Source;
};

const ObjetoById: React.FC<ObjetoByIdProps> = (props) => {
  const { urlId, meta, mdxSource } = props;
  const { titulo } = meta;

  const children = hydrate(mdxSource, { components: mdxComponents })

  return (
    <Box>
      {children}

      <DisqusEmbed
        title={titulo}
        identifier={`/objeto/${urlId}`}
      />
    </Box>
  )
};

export async function getStaticProps({ params }: PostParams): Promise<{ props: ObjetoByIdProps; }> {
  const result = await parseMDX(`src/registro/${params.id}.mdx`);
  const mdxSource = await renderToString(result.content);

  return {
    props: {
      ...result,
      mdxSource,
      urlId: params.id,
    },
  };
};

export async function getStaticPaths() {
  const objectPages = await fs.readdir('src/registro');

  const uniqueSlugIds = objectPages
    .reduce((acc: string[], el) => {
      return /\.mdx$/.test(el)
        ? acc.concat(path.basename(el, path.extname(el)))
        : acc
      ;
    }, [])
  ;

  return {
    paths: uniqueSlugIds.map(id => {
      return {
        params: {
          id,
        },
      }
    }),

    fallback: false,
  }
}

export default ObjetoById;