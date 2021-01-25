/* eslint-disable no-undef */
const path = require('path');
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

  webpack(config, options) {
    const { isServer } = options;

    const baseConfig = {
      basePath: "",
      assetPrefix: "",
      inlineImageLimit: 8192,
      fileExtensions: ["jpg", "jpeg", "png", "svg", "gif", "ico", "webp", "jp2", "avif"],
    };

    const result = Object.assign(config, {
      resolve: Object.assign(config.resolve, {

        alias: Object.assign(config.resolve.alias, {
          '@registro': path.join(__dirname, 'public', 'registro')
        })
      })
    });

    result.module.rules.push({
      test: new RegExp(`\.(${baseConfig.fileExtensions.join('|')})$`),
      include: [
        path.join(__dirname, 'src'),
        path.join(__dirname, 'public')
      ],
      use: [
        {
          loader: require.resolve("url-loader"),
          options: {
            limit: baseConfig.inlineImageLimit,
            fallback: require.resolve("file-loader"),
            outputPath: `${isServer ? "../" : ""}static/images/`,
            publicPath: `${
              baseConfig.assetPrefix ||
              baseConfig.basePath ||
              ''
            }/_next/static/images/`,
            name: "[name]-[hash].[ext]",
          }
        }
      ]
    });

    return result;
  }
});