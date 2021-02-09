
import clsx from "clsx";
import React from "react";
import { Box, makeStyles } from "@material-ui/core";

import { RegistroItem } from "types";
import { opacityMixin } from "src/components/mixins";

import PostsListItem from "src/components/PostsList/PostsListItem";

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    margin: '0 auto',

    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'start',
    flexDirection: 'column',
    justifyContent: 'center',

    [theme.breakpoints.up('sm')]: {
      width: 'auto',
      flexDirection: 'row',
    },
  },
}));

export type PostsListProps = {
    items: RegistroItem[];
    showTag?: boolean;
    selected?: string;
    className?: string;
    itemContainerClass?: string;
    imageContainerClass?: string;
  }
;

function PostsList(props: PostsListProps) {
  const classes = useStyles();
  const {
    items,
    showTag,
    selected,
    className,
    itemContainerClass,
    imageContainerClass,
  } = props;

  return (
    <Box className={clsx(classes.root, className)}>
      {items.map((el) => {
        const href = `/fotografia/registro/${el.urlId}`;
        const entrada = el.entradas.find(el => el.src);

        const item = {
          ...el,
          ...entrada,
        };

        return (
          <PostsListItem
            key={href}
            href={href}
            item={item}
            showTag={showTag}
            isSelected={selected === el.urlId}
            className={itemContainerClass}
            imageContainerClass={imageContainerClass}
          />
        );
      })}
    </Box>
  )
}

export default PostsList;