import { Fragment } from 'react';
import { Box, Typography } from '@material-ui/core';

import Image from 'src/components/Image';
import H1 from 'src/components/Typography/H1';
import pagesData from 'src/data/pages.json';
import DisqusEmbed from 'src/components/DisqusEmbed';
import { PageItemProps } from 'src/types';

type PostParams = {
  params: {
    id: string
  }
};

type ObjetoByIdProps = {
  post: PostParams;
};

const ObjetoById: React.FC<ObjetoByIdProps> = ({ post }) => {
  const searchId = post.params.id;

  const results = Object.values(pagesData)
    .filter(el => el.urlId === searchId)
    .map(el => el.content as PageItemProps[])
    .flat()
    .sort((a, b) => (a.fecha || '').localeCompare(b.fecha || ''))
    .reverse()
  ;

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
            {el.text && <br />}
            {el.text && (
              <Typography>
                {el.text}
              </Typography>
            )}
          </Fragment>
        )
      }
    }
  });

  const title = results[0].objeto || 'no-alias';
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

  const uniqueSlugIds = Object.values(pagesData)
    .map(el => el.content as PageItemProps[])
    .flat()
    .reduce((acc: string[], el) => {
      const id = el.urlId;

      if (!id || acc.includes(id)) {
        return acc;
      }

      return acc.concat(id);
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