const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/,
});

exports = module.exports = withMDX({
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