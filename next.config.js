/** @type {import('next').NextConfig} */

const basePath =
  process.env.NODE_ENV === 'production' ? '/friendly-ghosts-site' : ''

module.exports = {
  basePath,
  assetPrefix: `${basePath}/`,
  reactStrictMode: true,
  images: {
    loader: 'custom',
  },
}
