import useSWR from 'swr'

const sleep = (milliseconds: number) => {
  return new Promise((resolve) => setTimeout(resolve, milliseconds))
}

async function fetcher(type: 'mintPrice' | 'wallet'): Promise<any> {
  if (type === 'mintPrice') {
    await sleep(1000)
    return Promise.resolve(0.02)
  }

  if (type === 'wallet') {
    await sleep(1000)
    return Promise.resolve({})
  }
}

export function useMintPrice(): {
  mintPrice: number
  isLoading: boolean
  error?: string
} {
  const { data, error } = useSWR('mintPrice', fetcher)

  return { mintPrice: data, isLoading: !error && !data, error: error }
}
