import { getRegistro } from "src/lib/staticProps";
import { esEntradaValidaConImagen, ordenarPorFecha } from "src/lib/util";
import PostsList from "./PostsList";

const UltimasEntradasContainer = () => {
  const items = getRegistro()
    .map(el => {
      return {
        ...el,
        entradas: el.entradas.filter(esEntradaValidaConImagen)
      }
    })
    .filter(el => el.entradas.length)
    .sort(ordenarPorFecha)
    .slice(0, 10)
  ;

  return <PostsList items={items} />
};

export default UltimasEntradasContainer;