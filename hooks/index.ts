import useSWR, { KeyedMutator, useSWRConfig } from 'swr'
import { useState } from 'react'
import {
    mintPriceFetcher,
    mintMetaFetcher,
    mintFetcher,
    honorariesFetcher,
} from '../web3'

export function useMintPrice(): {
    price?: number
    isLoading: boolean
} {
    const { data, error } = useSWR('/api/mint/price', mintPriceFetcher)
    const isLoading = !error && !data
    return {
        price: data,
        isLoading,
    }
}

export function useMintCalc(connection: any): {
    amount: number
    amountToPay: number
    minAmount?: number
    maxAmount?: number
    setAmount(newAmount: number): void
    freeMint?: boolean
    price: string
    isLoading: boolean
    error?: string
    invalidateMintMeta: () => void
} {
    console.log(connection.account)
    const { mutate } = useSWRConfig()
    const [_amount, _setAmount] = useState(1)
    const priceData = useSWR('/api/mint/price', mintPriceFetcher)
    const { data, error } = useSWR(
        () => '/api/mint/meta/' + connection.account,
        () => mintMetaFetcher(connection)
    )
    console.log(data, error)
    const isLoading = !priceData.error && !priceData.data && !error && !data

    let maxAmount = data?.maxAmount ?? 20
    let minAmount = data?.minAmount ?? 1

    if (data?.freeMint) {
        maxAmount = Math.max(maxAmount, 1)
        minAmount = Math.max(minAmount, 1)
    }

    function setAmount(newAmount: number) {
        if (newAmount < minAmount || newAmount > maxAmount) return
        _setAmount(newAmount)
    }

    const amount = Math.min(Math.max(_amount, minAmount), maxAmount)

    return {
        amount,
        setAmount,
        minAmount: minAmount,
        maxAmount: maxAmount,
        freeMint: data?.freeMint,
        price: isLoading
            ? '0'
            : (
                  priceData.data * amount -
                  (data?.freeMint ? priceData.data : 0)
              ).toFixed(2),
        isLoading,
        error: error?.message,
        invalidateMintMeta: () => {
            mutate('/api/mint/meta/' + connection.account)
        },
        amountToPay: data?.freeMint ? amount - 1 : amount,
    }
}

type FetchState<P, E> =
    | { type: 'NOT_REQUESTED' }
    | { type: 'LOADING' }
    | { type: 'SUCCEED'; payload: P }
    | { type: 'FAILED'; error: E }

export function useMint(connection: any) {
    const [state, setState] = useState<FetchState<Array<number>, Error>>({
        type: 'NOT_REQUESTED',
    })

    return {
        mint: (amount: string) => {
            setState({
                type: 'LOADING',
            })
            mintFetcher(connection, amount)
                .then((ids) => {
                    setState({
                        type: 'SUCCEED',
                        payload: ids,
                    })
                })
                .catch((err) => {
                    setState({
                        type: 'FAILED',
                        error: err,
                    })
                })
        },
        mintState: state,
        invalidate: () => {
            setState({
                type: 'NOT_REQUESTED',
            })
        },
    }
}

export function useHonoraries(): {
    data: Array<{
        src: StaticImageData
        name: string
        twitterUrl: string
    }>
    isLoading: boolean
} {
    const { data, error } = useSWR('/api/honoraries', honorariesFetcher)
    return { data, isLoading: !error && !data }
}
