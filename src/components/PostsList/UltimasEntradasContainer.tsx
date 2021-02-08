import PostsList from "src/components/PostsList/PostsList";

import ultimasEntradas from "cache/ultimas-entradas.json";

const UltimasEntradasContainer = () => {
  return <PostsList items={ultimasEntradas} />
};

export default UltimasEntradasContainer;