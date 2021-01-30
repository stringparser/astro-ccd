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
  // i18n: {
  //   locales: ['es-ES', 'fr', 'nl-NL'],
  //   defaultLocale: 'es-ES',
  // },

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

  async redirects() {
    return [
      {
        source: '/fuensanta-3',
        permanent: false,
        destination: '/fuensanta',
      },
      {
        source: '/cometasasteroides',
        permanent: false,
        destination: '/cometas-asteroides',
      },
      {
        source: '/planetas-satelites',
        permanent: false,
        destination: '/sistema-solar',
      },
      {
        source: '/construccion-del-observatorio',
        permanent: false,
        destination: '/observatorio',
      },
      {
        source: '/ccd-2',
        permanent: false,
        destination: '/reparacion/ccd',
      },
      {
        source: '/reparacion',
        permanent: false,
        destination: '/reparacion/ccd',
      },
    ];
  },

  webpack(config, options) {
    const { isServer } = options;

    if (!isServer) {
      config.node = {
        fs: 'empty',
      };
    }

    const baseConfig = {
      basePath: "",
      assetPrefix: "",
      inlineImageLimit: 0,
      fileExtensions: ["jpg", "jpeg", "png", "svg", "gif", "ico", "webp", "jp2", "avif"],
    };

    const result = Object.assign(config, {
      resolve: Object.assign(config.resolve, {

        alias: Object.assign(config.resolve.alias, {
          '@public': path.join(__dirname, 'public'),
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
            publicPath: `${baseConfig.assetPrefix ||
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