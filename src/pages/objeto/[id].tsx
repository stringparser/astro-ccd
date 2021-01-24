import { Fragment } from 'react';
import { Box, Typography } from '@material-ui/core';

import Image from 'src/components/Image';
import H1 from 'src/components/Typography/H1';
import pagesData from 'src/registro/pages.json';
import DisqusEmbed from 'src/components/DisqusEmbed';
import { PageItemProps } from 'src/types';
import { mapTextToUrl } from 'src/lib/util';

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
  const searchIdRE = new RegExp(post.params.id, 'i');

  const results = Object.values(pagesData)
    .map(el => el.content as PageItemProps[])
    .flat()
    .filter(el => searchIdRE.test(el.urlId))
    .sort((a, b) => (a.fecha || '').localeCompare(b.fecha || ''))
    .reverse()
  ;

  const components = results.map((el, index) => {
    switch (el.type) {
      case 'text': {
        return (
          <Typography key={index}>
            {el.text}
          </Typography>
        );
      }
      case 'image': {
        const dateString = (/(\d{4})(\d{2})(\d{2})/.exec(el.fecha) || [])
          .slice(1)
          .join('-')
        ;

        return (
          <Fragment key={index}>
            {dateString && (
              <Box
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <Typography>
                  {new Date(dateString).toLocaleDateString('es')}
                </Typography>
              </Box>
            )}
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

  const [astroObject] = results || [{} as PageItemProps];
  const { nombre, objeto } = astroObject;

  const titulo = [
    nombre || objeto,
    nombre && !nombre.includes(objeto) && `(${objeto})`
  ].filter(v => v).join(' ');

  const identifier = `/objeto/${astroObject.urlId}`;

  return (
    <Box>
      <H1>
        {titulo}
      </H1>

      {components}

      <DisqusEmbed
          title={titulo}
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
      const id = el.objeto;

      if (!id || acc.includes(id)) {
        return acc;
      }

      return acc.concat(mapTextToUrl(id));
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