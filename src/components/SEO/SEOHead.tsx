import Head from "next/head";
import { useRouter } from "next/router";

import { capitalize } from "src/lib/util";
import { getOrigin, mapRouteParts } from "src/lib/navigation";

export type SeoHeadProps = {
  meta?: React.MetaHTMLAttributes<HTMLMetaElement>[];
  title?: string;
};

const origin = getOrigin();

const defaultMeta: SeoHeadProps['meta'] = [
  {
    charSet: 'UTF-8',
  },
  {
    httpEquiv: 'X-UA-Compatible',
    content: 'IE=edge',
  },
  {
    property: 'og:type',
    content: 'website',
  },
  {
    property: 'og:site_name',
    content: 'OACM Fuensanta',
  },
  {
    property: 'og:description',
    content: 'Observación astrónomica. Construcción del observatorio, telescopio y CCD'
  },
  {
    property: 'og:image',
    content: `${origin}${require('@public/favicon.png').default}`,
  }
];

const SEOHead: React.FC<SeoHeadProps> = ({ title, meta: initialMeta = [] }) => {
  const router = useRouter();
  const [, page] = mapRouteParts(router);

  const meta: React.MetaHTMLAttributes<HTMLMetaElement>[] = [
    ...defaultMeta,
    ...initialMeta,
    {
      property: 'og:url',
      content: `${origin}${router.asPath}`,
    },
  ];

  const pageName = page === 'ccd'
    ? 'CCD'
    : page
      ? capitalize(page)
      : undefined
  ;

  return (
    <Head>
      <title>
        {title || pageName}
      </title>
      {meta.length === 0
        ? null
        : meta.map((props, index) =>
            <meta
              key={props.property || props.name || `${index}`}
              {...props}
            />
          )
      }
    </Head>
  )
};

export default SEOHead;