
import { Box, Link } from "@material-ui/core";

import H2 from "src/components/Typography/H2";
import { PageItemContents } from "src/types";
import Image from "./Image";

export type PostListProps<T = PageItemContents> =  {
  items: T[];
}

function PostList<T>({ items }: PostListProps) {
  const uniqueItems = items.reduce((acc, item) => {
    const id = item.urlId.split('-').slice(1).join('-');
    const image = item.content.find(el => el.type == 'image');

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
    >
      {orderedUniqueItems.map(el => {
        return (
          <Link
            key={el.urlId}
            href={`/objeto/${el.urlId.split('-').slice(1).join('-')}`}
            style={{width: '25%'}}
          >
            <H2>
              {el.objeto}
            </H2>
            <Image
              src={el.image}
              width="auto"
              height="125px"
              title={el.fecha}
            />
          </Link>
        );
      })}
    </Box>
  )
}

export default PostList;