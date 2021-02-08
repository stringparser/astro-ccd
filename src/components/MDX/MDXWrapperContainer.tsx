import Head from "next/head";
import React from "react";
import { useRouter } from "next/router";
import NavigationBreadcrumbs from "src/components/Navigation/NavigationBreadcrumbs";

const MDXWrapperContainer: React.FC = ({ children }) => {
  const router = useRouter();

  if (router.route === '/') {
    return (
      <>
        {children}
      </>
    );
  }

  const title = React.Children.toArray(children)
    .reduce((acc, el) => {
      // @ts-ignore
      const { children: child, mdxType } = el.props || {};

      if (!acc && /^h\d$/.test(mdxType) && typeof child === 'string') {
        return child;
      }

      return acc;
    }, '')
  ;

  if (title) {
    const routeParts = router.pathname.slice(1).split('/');

    return (
      <>
        <Head>
          <title>OACM Fuensanta | {title}</title>
        </Head>
        {children}
      </>
    )
  }

  return (
    <>
      {children}
    </>
  )
};

export default MDXWrapperContainer;