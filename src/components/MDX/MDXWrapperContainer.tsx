import { Box } from "@material-ui/core";
import { useRouter } from "next/router";
import React, { Fragment } from "react";

import { getOrigin } from "src/lib/navigation";

import H2 from "src/components/Typography/H2";
import SEOHead, { SeoHeadProps } from "src/components/SEO/SEOHead";

export type MDXChild = {
  key: string | null;
  type?: React.ElementType;
  props?: {
    src?: string;
    desc?: string;
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

    if (typeof child === 'string') {
      return (
        <Fragment key={index}>
          {el}
        </Fragment>
      );
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
      <Fragment>
        <SEOHead title="Inicio" />
        {mapChildren(children)}
      </Fragment>
    );
  }

  const origin = getOrigin();

  const meta: SeoHeadProps['meta'] = [];

  const arrayChildren = React.Children.toArray(children) as MDXChild[];

  const imageChild = arrayChildren.find(el => {
    const { src, mdxType } = el?.props || {};
    return mdxType === 'Imagen' && src;
  });

  if (imageChild) {
    const { src, desc } = imageChild?.props;
    const content = `${origin}${require(`@public/${src}`).default}`;

    meta.push({
      property: 'og:image',
      content,
    });

    if (desc) {
      meta.push({
        property: 'og:image:alt',
        content: desc,
      });
    }
  }

  const descriptionChild = arrayChildren
    .find(el => {
      const { children: child, mdxType } = el?.props || {};
      return /^h\d$/.test(mdxType) && typeof child === 'string';
    })
  ;

  if (descriptionChild) {
    const { children: description } = descriptionChild?.props;
    const content = `${description}`;

    meta.push(
      {
        content,
        name: 'description',
      },
      {
        content,
        property: 'og:description'
      }
    );
  }

  return (
    <Fragment>
      <SEOHead meta={meta} />
      {mapChildren(children)}
    </Fragment>
  );
};

export default MDXWrapperContainer;