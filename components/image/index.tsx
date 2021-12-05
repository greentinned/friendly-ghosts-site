import NextImage, { ImageProps, ImageLoaderProps } from 'next/image'

const basePath =
  process.env.NODE_ENV === 'production' ? 'https://greentinned.github.io' : './'

const loader = (props: ImageLoaderProps) => {
  const { src, width, quality } = props
  return `${basePath}${src}?w=${width}&q=${quality || 75}`
}

const Image = (props: ImageProps) => {
  return <NextImage {...props} loader={loader} />
}

export default Image
