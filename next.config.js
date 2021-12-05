/** @type {import('next').NextConfig} */

const basePath =
  process.env.NODE_ENV === 'production' ? process.env.HOST_ROOT : ''

module.exports = {
  basePath,
  assetPrefix: `${basePath}/`,
  reactStrictMode: true,
  images: {
    loader: 'custom',
  },
}
