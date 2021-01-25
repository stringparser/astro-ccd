const path = require('path');
const withImages = require('next-images');
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

exports = module.exports = withMDX(withImages({
  i18n: {
    locales: ['es-ES', 'fr', 'nl-NL'],
    defaultLocale: 'es-ES',
  },

  images: {
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
  },

  fileExtensions: [
    'jpg',
    'jpeg',
    'png',
    'gif'
  ],

  pageExtensions: [
    'js',
    'jsx',
    'mdx',
    'ts',
    'tsx'
  ],

  webpack(config, options) {
    return Object.assign(
      config,
      {
        resolve: Object.assign(
          config.resolve,
          {
            alias: Object.assign(
              config.resolve.alias,
              {
                '@imagenes': path.join(__dirname, 'public', 'imagenes')
              }
            )
          }
        )
      }
    )
  }
}));