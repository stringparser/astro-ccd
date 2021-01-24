const frontmatter = require('remark-frontmatter');

const withMDX = require('@next/mdx')({
  options: {
    remarkPlugins: [
      frontmatter,
    ],
    rehypePlugins: [],
  },
  extension: /\.mdx?$/,
});

exports = module.exports = withMDX({
  i18n: {
    locales: ['es-ES', 'fr', 'nl-NL'],
    defaultLocale: 'es-ES',
  },

  images: {
    domains: [
      'astroccd.files.wordpress.com'
    ],
  },
  pageExtensions: [
    'js',
    'jsx',
    'mdx',
    'ts',
    'tsx'
  ],
});