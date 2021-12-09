import useSWR, { KeyedMutator } from 'swr'
import { useState } from 'react'
import {
    walletFetcher,
    mintPriceFetcher,
    mintMetaFetcher,
    mintFetcher,
    honorariesFetcher
} from '../web3'

export function useMintPrice(): {
    price?: number,
    isLoading: boolean,
} {
    const { data, error } = useSWR('/api/mint/price', mintPriceFetcher)
    const isLoading = !error && !data
    return {
        price: data,
        isLoading,
    }
}

export function useMintCalc(): {
    amount: number,
    minAmount?: number,
    maxAmount?: number,
    setAmount(newAmount: number): void,
    freeMint?: boolean,
    price?: string,
    isLoading: boolean,
    error?: string,
} {
    const [_amount, _setAmount] = useState(1)
    const priceData = useSWR('/api/mint/price', mintPriceFetcher)
    const { data, error } = useSWR('/api/mint/meta', mintMetaFetcher)
    const isLoading = !priceData.error && !priceData.data && !error && !data

    function setAmount(newAmount: number) {
        if (!data?.minAmount || !data?.maxAmount) return
        if (newAmount < data.minAmount || newAmount > data.maxAmount) return
        _setAmount(newAmount)
    }

    return {
        amount: _amount,
        setAmount,
        minAmount: data?.minAmount,
        maxAmount: data?.maxAmount,
        freeMint: data?.freeMint,
        price: isLoading ? '0' : ((priceData.data * _amount) - (data?.freeMint ? priceData.data : 0)).toFixed(2),
        isLoading,
        error: error?.message
    }
}

export function useMint(shouldMint: boolean, amount: number): {
    images?: Array<string>,
    isLoading: boolean,
    mutate: KeyedMutator<any>,
    error?: string
} {
    const { data, mutate, error } = useSWR(shouldMint ? ['/api/mint', amount] : null, mintFetcher)

    return {
        images: data,
        isLoading: shouldMint && !error && !data,
        mutate,
        error: error?.message
    }
}

export function useWallet(shouldConnect: boolean): {
    address?: string,
    isLoading: boolean,
    error?: string
} {
    const { data, error } = useSWR(shouldConnect ? '/api/wallet' : null, walletFetcher)
    return {
        address: data,
        isLoading: shouldConnect && !error && !data,
        error: error?.message
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
