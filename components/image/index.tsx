import NextImage, { ImageProps, ImageLoaderProps } from 'next/image'

const loader = (props: ImageLoaderProps) => {
  const { src, width, quality } = props
  return `https://greentinned.github.io/${src}?w=${width}&q=${quality || 75}`
}

const Image = (props: ImageProps) => {
  return <NextImage {...props} loader={loader} />
}

export default Image
