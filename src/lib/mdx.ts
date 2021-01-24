
import matter from 'gray-matter';
import renderToString from 'next-mdx-remote/render-to-string';
import { mdxComponents } from 'src/lib/constants';

export const renderMDX = async (source: string) => {
  const { content, data } = matter(source);

  const result = await renderToString(content, {
    components: mdxComponents,
    // Optionally pass remark/rehype plugins
    mdxOptions: {
      remarkPlugins: [],
      rehypePlugins: [],
    },
    scope: data,
  });

  return {
    data,
    result,
  };
};