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
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
  },

  pageExtensions: [
    'js',
    'jsx',
    'mdx',
    'ts',
    'tsx'
  ],
});