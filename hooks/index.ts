import useSWR from 'swr'
import { honorData } from '../data'

const sleep = (milliseconds: number) => {
  return new Promise((resolve) => setTimeout(resolve, milliseconds))
}

async function fetcher(
  type: 'mintPrice' | 'wallet' | 'honorData'
): Promise<any> {
  if (type === 'mintPrice') {
    await sleep(1000)
    return Promise.resolve(0.02)
  }

  if (type === 'wallet') {
    await sleep(1000)
    return Promise.resolve({})
  }

  if (type === 'honorData') {
    return Promise.resolve(honorData)
  }
}

export function useMintPrice(): {
  price: number
  isLoading: boolean
  error?: string
} {
  const { data, error } = useSWR('mintPrice', fetcher)

  return { price: data, isLoading: !error && !data, error: error }
}

export function useHonoraries(): {
  data: Array<{
    src: StaticImageData
    name: string
    twitterUrl: string
  }>
  isLoading: boolean
} {
  const { data, error } = useSWR('honorData', fetcher)
  return { data, isLoading: !error && !data }
}
