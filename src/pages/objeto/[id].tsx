import NextImage from 'next/image';
import { Fragment } from 'react';
import { Box, makeStyles, Typography } from '@material-ui/core';
import { getRegistro, ordenarPorFecha, RegistroItem } from 'src/lib/staticProps';

import H1 from 'src/components/Typography/H1';
import DisqusEmbed from 'src/components/Disqus/DisqusEmbed';
import Image from 'src/components/Image/Image';
import clsx from 'clsx';
import { opacityMixin } from 'src/components/styles';

const useStyles = makeStyles({
  imageDefaults: {
    ...opacityMixin,

    margin: '2rem auto',
  },
  image: {
    width: '60%',
    height: '400px',
  },
  image_APLLogo: {
    height: '50px',
  },
});

type PostParams = {
  params: {
    id: string
  }
};

type ObjetoByIdProps = {
  post: PostParams;
  results: RegistroItem[];
};

const ObjetoById: React.FC<ObjetoByIdProps> = ({ results }) => {
  const classes = useStyles();

  const components = results
    .flatMap(el => el.entradas)
    .map((el, index) => {
      if (el.texto != null && el.imagen == null) {
        return (
          <Typography key={index}>
            {el.texto}
          </Typography>
        );
      }

      if (el.imagen != null) {
        const dateString = (/(\d{4})(\d{2})(\d{2})?/.exec(el.fecha) || [])
          .slice(1)
          .reverse()
          .filter(el => el !== '00')
          .join('/')
        ;

        const isAPLLogo = /apj-logo\.gif/.test(el.imagenOriginal || el.imagen);

        return (
          <Fragment key={index}>
            {dateString && (
              <Box
                key={index}
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <Typography>
                  {dateString}
                </Typography>
              </Box>
            )}
            <Image
              src={require(`@registro/${el.imagen}`).default}
              className={clsx(
                classes.imageDefaults,
                isAPLLogo
                  ? classes.image_APLLogo
                  : classes.image,
              )}
            />
            {el.texto && <br />}
            {el.texto && (
              <Typography>
                {el.texto}
              </Typography>
            )}
          </Fragment>
        )
      }
    })
  ;

  const [{
    urlId,
    objeto,
    titulo: text,
  }] = results || [{} as RegistroItem];

  const titulo = [
    text || objeto,
    text && !new RegExp(objeto, 'i').test(objeto) && `(${objeto})`
  ].filter(v => v).join(' ');

  const identifier = `/objeto/${urlId}`;

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

export async function getStaticProps({ params }: PostParams): Promise<{ props: ObjetoByIdProps; }> {
  const pagesData = await getRegistro();

  const searchIdRE = params.id
    ? new RegExp(params.id, 'i')
    : /[]/
  ;

  const results = pagesData
    .filter(el => searchIdRE.test(el.urlId))
    .sort(ordenarPorFecha)
  ;

  return {
    props: {
      results,
      post: { params },
    },
  };
};

export async function getStaticPaths() {
  const pageData = await getRegistro();

  const uniqueSlugIds = Object.values(pageData)
    .reduce((acc: string[], el) => {
      const { urlId } = el;

      if (!urlId || acc.includes(urlId)) {
        return acc;
      }

      return acc.concat(urlId);
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