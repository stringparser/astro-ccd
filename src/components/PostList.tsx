
import React from "react";
import { Box, Link, makeStyles, Typography } from "@material-ui/core";

import H2 from "src/components/Typography/H2";

import Image from "./Image";
import { PageItemContents } from "src/types";

const useStyles = makeStyles({
  root: {
    margin: '0 auto',
    marginTop: '2rem',

    '@media (max-width: 376px)': {
      flexDirection: 'column',
    },
  },
  linkWrapper: {
    width: '25%',
    opacity: .9,

    '&:hover': {
      opacity: 1,
      textDecoration: 'none',
    },

    '@media (max-width: 376px)': {
      width: 'auto',
    },
  }
});

export type PostListProps<T = PageItemContents> =  {
  items: T[];
};

function PostList<T>({ items }: PostListProps) {
  const classes = useStyles();

  const uniqueItems = items.reduce((acc, item) => {
    const id = item.urlId.split('-').slice(1).join('-');
    const image = item.content.find(el =>
      el.type == 'image'
      && !/\/apj-logo.gif$/.test(el.src)
      && el.src !== 'https://astroccd.files.wordpress.com/2014/02/logodef.png'
      && el.src !== 'https://i0.wp.com/www.astrosurf.com/snweb2/images/rainbowl.gif'
    );

    if (acc[id] || !image || !image.src) {
      return acc;
    }

    return {
      ...acc,
      [id]: {
        ...item,
        image: image.src,
      },
    };
  }, {} as Record<string, PageItemContents & { image: string; }>)

  const orderedUniqueItems = Object.values(uniqueItems)
    .sort((a, b) => (a.fecha || '').localeCompare(b.fecha || ''))
    .reverse()
  ;

  return (
    <Box
      display="flex"
      flexWrap="wrap"
      alignItems="center"
      justifyContent="center"
      className={classes.root}
    >
      {orderedUniqueItems.map(el => {
        const dateString = (/(\d{4})(\d{2})(\d{2})/.exec(el.fecha) || [])
          .slice(1)
          .join('-')
        ;

        return (
          <Link
            key={el.urlId}
            href={`/objeto/${el.urlId.split('-').slice(1).join('-')}`}
            className={classes.linkWrapper}
          >
            <Box
                display="flex"
                alignItems="center"
                flexDirection="column"
                justifyContent="center"
              >
                <H2 style={{color: 'red'}}>
                  {el.objeto}
                </H2>
                <Image
                  src={el.image}
                  width="auto"
                  height="125px"
                  title={el.fecha}
                />
                <Typography variant="caption">
                  {new Date(dateString).toLocaleDateString('es')}
                </Typography>
              </Box>
          </Link>
        );
      })}
    </Box>
  )
}

export default PostList;