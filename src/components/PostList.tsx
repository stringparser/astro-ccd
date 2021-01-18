
import Link from "next/link";
import { Box } from "@material-ui/core";

import H2 from "src/components/Typography/H2";
import { PageItemProps } from "bin/lib/types";

export type PostListProps<T = PageItemProps> =  {
  items: T[];
}

function PostList<T>({ items }: PostListProps) {

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
    >
      {items.map(el => {
        return (
          <Link href={el.url} key={el.url}>
            <H2>{el.id}</H2>
          </Link>
        );
      })}
    </Box>
  )
}

export default PostList;