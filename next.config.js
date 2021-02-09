/* eslint-disable no-undef */
const path = require('path');

const withMDX = require('@next/mdx')({
  options: {
    remarkPlugins: [],
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

    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384, 640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    deviceSizes: [320, 640, 750, 828, 1080, 1200, 1920, 2048, 3840],
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
        destination: '/fotografia?tipo=cometas-asteroides',
      },
      {
        source: '/planetas-satelites',
        permanent: false,
        destination: '/fotografia?tipo=sistema-solar',
      },
      {
        source: '/galaxias',
        permanent: false,
        destination: '/fotografia?tipo=galaxias',
      },
      {
        source: '/nebulosas',
        permanent: false,
        destination: '/fotografia?tipo=nebulosas',
      },
      {
        source: '/construccion',
        permanent: false,
        destination: '/construccion/observatorio',
      },
      {
        source: '/construccion-del-observatorio',
        permanent: false,
        destination: '/construccion/observatorio',
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

      {
        source: '/observatorio',
        permanent: false,
        destination: '/construccion/observatorio',
      },
      {
        source: '/construccion',
        permanent: false,
        destination: '/construccion/observatorio',
      },
    ];
  },

  webpack(config, options) {
    const { isServer } = options;

    if (!isServer) {
      config.node = {
        fs: 'empty',
        'fs-extra': 'empty',
      };
    }

    const baseConfig = {
      basePath: '',
      assetPrefix: '',
      inlineImageLimit: 1,
      fileExtensions: [
        'jpg',
        'jpeg',
        'png',
        'svg',
        'gif',
        'ico',
        'webp',
        'jp2',
        'avif'
      ],
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
          loader: require.resolve('file-loader'),
          options: {
            name: '[name]-[hash].[ext]',
            outputPath: `${isServer ? '../' : ''}static/images/`,
            publicPath: `${baseConfig.assetPrefix || baseConfig.basePath || ''}/_next/static/images/`,
          }
        }
      ]
    });

    return result;
  }
});