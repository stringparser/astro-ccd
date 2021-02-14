import Head from "next/head";
import { useRouter } from "next/router";

import { capitalize } from "src/lib/util";
import { getOrigin, mapRouteParts } from "src/lib/navigation";

export type SeoHeadProps = {
  meta?: React.MetaHTMLAttributes<HTMLMetaElement>[];
  title?: string;
};

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
  }
];

const SEOHead: React.FC<SeoHeadProps> = ({ title, meta: initialMeta = [] }) => {
  const router = useRouter();
  const origin = getOrigin();
  const [, page] = mapRouteParts(router);

  const meta: React.MetaHTMLAttributes<HTMLMetaElement>[] = [
    ...defaultMeta,
    ...initialMeta,
    {
      property: 'og:url',
      content: `${origin}${router.asPath}`,
    },
  ];

  return (
    <Head>
      <title>
        {[
          'OACM Fuensanta',
          capitalize(title || page || '')
        ].filter(v => v).join(' | ')}
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