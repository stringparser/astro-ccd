import { Fragment } from 'react';
import { Box, Divider, Typography } from '@material-ui/core';

import Image from 'src/components/Image';
import H1 from 'src/components/Typography/H1';
import cometas from 'src/data/cometas-asteroides.json';
import DisqusEmbed from 'src/components/DisqusEmbed';

type PostParams = {
  params: {
    id: string
  }
};

type ObjetoByIdProps = {
  post: PostParams;
};

const ObjetoById: React.FC<ObjetoByIdProps> = ({ post }) => {

  const results = cometas.items.filter(el =>
    el.id === post.params.id
  );

  const result = results[0] || {};

  const components = results.map((el, index) => {
    switch (el.type) {
      case 'text': {
        return <Typography key={index}>{el.text}</Typography>;
      }
      case 'image': {
        return (
          <Fragment key={index}>
            <Image
              src={el.src}
              alt={el.alt}
              loading="lazy"
            />
            {el.descripcion && <br />}
            {el.descripcion && (
              <Typography>
                {el.descripcion}
              </Typography>
            )}
          </Fragment>
        )
      }
    }
  });

  const title = results[0].alias || 'no-alias';
  const identifier = `/objeto/${post.params.id}`;

  return (
    <Box>
      <H1>
        {post.params.id}
      </H1>

      {components}

      <DisqusEmbed
          title={title}
          identifier={identifier}
      />
    </Box>
  )
};

export async function getStaticProps({ params }: PostParams): Promise<{ props: ObjetoByIdProps }> {
  return {
    props: {
      post: { params },
    },
  };
};

export async function getStaticPaths() {

  const uniqueSlugIds = cometas.items.reduce((acc: string[], el) => {
    const { id } = el;

    if (!id || acc.includes(id)) {
      return acc;
    }

    return acc.concat(id);
  }, []);

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