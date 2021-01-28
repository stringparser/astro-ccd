
import React from "react";
import { Box, Link, makeStyles, Typography } from "@material-ui/core";

import H2 from "src/components/Typography/H2";

import Image from "./Image/Image";
import { PageBasename, PageItemContents } from "src/types";

const useStyles = makeStyles({
  root: {
    margin: '0 auto',
    marginTop: '2rem',

    '@media (max-width: 376px)': {
      flexDirection: 'column',
    },
  },
  linkWrapper: {
    width: '33%',
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
    const id = item.urlId;
    const image = item.content.find(el =>
      el.type == 'image'
      && !/\/apj-logo.gif$/.test(el.src)
      && !/2014\/02\/logodef\.png$/.test(el.src)
      && !/\/snweb2\/images\/rainbowl\.gif$/.test(el.src)
    );

    if (acc[id] || !image || !image.dest) {
      return acc;
    }

    return {
      ...acc,
      [id]: {
        ...item,
        image: image.dest,
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
      justifyContent="center"
      className={classes.root}
    >
      {orderedUniqueItems.map(el => {
        const dateString = (/(\d{4})(\d{2})(\d{2})/.exec(el.fecha) || [])
          .slice(1)
          .reverse()
          .filter(el => el !== '00')
          .join('/')
        ;

        return (
          <Link
            key={el.urlId}
            href={`/objeto/${el.urlId}`}
            className={classes.linkWrapper}
          >
            <Box
                display="flex"
                flexDirection="column"
                justifyContent="center"
              >
                <H2 style={{color: 'red', maxWidth: '50%', margin: '0 auto'}}>
                  {el.label === PageBasename.sistemaSolar
                    ? el.title.replace(/^\s*#\s+/, '')
                    : el.objeto
                  }
                </H2>
                <Typography variant="caption" style={{marginTop: '1rem'}}>
                  {dateString}
                </Typography>
                <Image
                  src={require(`@registro/${el.image}`).default}
                />
              </Box>
          </Link>
        );
      })}
    </Box>
  )
}

export default PostList;