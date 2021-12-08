import useSWR, { KeyedMutator } from 'swr'
import { useState } from 'react'
import {
    walletFetcher,
    mintPriceFetcher,
    mintFetcher,
    honorariesFetcher
} from '../web3'

export function useMintPrice(): {
    amount: number,
    minAmount: number,
    maxAmount: number,
    setAmount(newAmount: number): void,
    price?: number
    isLoading: boolean
    error?: string
} {
    const [_amount, _setAmount] = useState(1)
    const minAmount = 1
    const maxAmount = 20
    const { data, error } = useSWR('mintPrice', mintPriceFetcher)
    const isLoading = !error && !data

    function setAmount(newAmount: number) {
        if (newAmount < minAmount || newAmount > maxAmount) return
        _setAmount(newAmount)
    }

    return {
        amount: _amount,
        minAmount,
        maxAmount,
        setAmount,
        price: isLoading ? 0 : (data * _amount),
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
    const { data, mutate, error } = useSWR(shouldMint ? ['mint', amount] : null, mintFetcher)

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
    const { data, error } = useSWR(shouldConnect ? 'wallet' : null, walletFetcher)
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
    const { data, error } = useSWR('honorData', honorariesFetcher)
    return { data, isLoading: !error && !data }
}
