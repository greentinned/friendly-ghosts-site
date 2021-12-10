/** @type {import('next').NextConfig} */

const basePath =
    process.env.NODE_ENV === 'production'
        ? process.env.NEXT_PUBLIC_HOST_ROOT
        : ''

module.exports = {
    basePath,
    assetPrefix: `${basePath}`,
    reactStrictMode: true,
    images: {
        loader: 'custom',
    },
}
