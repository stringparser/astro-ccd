import Head from "next/head";
import React from "react";
import { Box } from "@material-ui/core";
import { useRouter } from "next/router";
import H2 from "src/components/Typography/H2";

export type MDXChild = {
  key: string | null;
  type?: React.ElementType;
  props?: {
    mdxType: string;
    children: string | MDXChild | MDXChild[];
    originalType: string;
  }
};

const mapChildren = (input: any[], key = '') => {
  const children = Array.isArray(input)
    ? input
    : [input]
  ;

  return children.map((el, index) => {
    const child = el?.props?.children || el;
    const elType = el?.props?.mdxType || el.props?.originalType;

    if (elType !== 'h1' && typeof child === 'string' && (/^\s*#{2,}/.test(child) || /h(\d)/.test(elType))) {
      return (
        <H2 key={key ? `${key}.${index}` : index}>
          {child.replace(/^[\s#]+/, '')}
        </H2>
      );
    }

    if (Array.isArray(child)) {
      return mapChildren(child, `${index}`);
    } else if (typeof child === 'string') {
      return el;
    }

    return React.cloneElement(el as any, {
      ...el.props,
      key: `${index}`
    });
  });
};

export type MDXWrapperContainerProps = {
  children: MDXChild[];
};

const MDXWrapperContainer: React.FC<MDXWrapperContainerProps> = ({ children, ...rest }) => {
  const router = useRouter();

  if (router.route === '/') {
    return (
      <Box {...rest}>
        {mapChildren(children)}
      </Box>
    );
  }

  const description = React.Children.toArray(children)
    .reduce((acc, el) => {
      // @ts-ignore
      const { children: child, mdxType } = el.props || {};

      if (!acc && /^h\d$/.test(mdxType) && typeof child === 'string') {
        return child;
      }

      return acc;
    }, '')
  ;

  if (description) {
    return (
      <Box {...rest}>
        <Head>
          <meta property="og:description" content={`${description}`} />
        </Head>
        {mapChildren(children)}
      </Box>
    );
  }

  return (
    <Box {...rest}>
      {mapChildren(children)}
    </Box>
  );
};

export default MDXWrapperContainer;