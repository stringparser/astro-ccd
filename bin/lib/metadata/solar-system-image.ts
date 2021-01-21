import { PageItemProps } from "../types";
import { urlIdsHarcoded } from "../util";

export function mapSolarSystemImageMetadata(props: PageItemProps): PageItemProps {
  const { src, urlId, objectId: id } = props;

  if (src === 'https://astroccd.files.wordpress.com/2020/12/1_152049_l5_ap666.png') {
    return {
      ...props,
      fecha: '20201201',
      urlId: '20201201-sol',
      objectId: 'sol'
    };
  }

  if (
    src === 'https://astroccd.files.wordpress.com/2020/12/jupiter-saturno--2.png'
    || src === 'https://astroccd.files.wordpress.com/2020/12/conjuncion.gif'
    || src === 'https://astroccd.files.wordpress.com/2020/12/jupiter-saturno-20diciembre2020-2.png'
  ) {
    const id = urlIdsHarcoded.jupiterSaturno;

    return {
      ...props,
      fecha: '20211221',
      urlId: id,
      objectId: 'conjuncion-jupiter-saturno',
    };
  }

  if (src === 'https://astroccd.files.wordpress.com/2014/04/luna_14noviembre2016.jpg') {
    return {
      ...props,
      fecha: '20161114',
      urlId: '20161114-luna',
      objectId: 'luna'
    }
  }

  if (id === '1_152049_l5_ap666') {
    return {
      ...props,
      fecha: '20201201',
      urlId: '20201200-sol',
      objectId: 'sol',
    };
  }

  if (src === 'https://astroccd.files.wordpress.com/2020/11/img-20201030-wa0020.jpg?w=736') {
    return {
      ...props,
      fecha: '20201029',
      urlId: '20201029-marte',
      objectId: 'marte',
    }
  }

  return props;
};