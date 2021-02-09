import Head from "next/head";
import React from "react";
import { useRouter } from "next/router";
import { Box } from "@material-ui/core";

const MDXWrapperContainer: React.FC = ({ children, ...rest }) => {
  const router = useRouter();

  if (router.route === '/') {
    return (
      <Box {...rest}>
        {children}
      </Box>
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
    return (
      <Box {...rest}>
        <Head>
          <title>OACM Fuensanta | {title}</title>
        </Head>
        {children}
      </Box>
    );
  }

  return (
    <Box {...rest}>
      {children}
    </Box>
  );
};

export default MDXWrapperContainer;