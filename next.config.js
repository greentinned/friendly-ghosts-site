/** @type {import('next').NextConfig} */

const basePath = process.env.NODE_ENV === 'production' ? '/repo' : ''

module.exports = {
  basePath,
  assetPrefix: `${basePath}/`,
  reactStrictMode: true,
  images: {
    loader: 'custom',
  },
}
