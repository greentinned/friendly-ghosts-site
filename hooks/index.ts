import useSWR, { KeyedMutator, useSWRConfig } from 'swr'
import { useLayoutEffect, useState } from 'react'
import {
    mintPriceFetcher,
    mintMetaFetcher,
    mintFetcher,
    honorariesFetcher,
    mintSupplyFetcher,
} from '../web3'

const fut = new Date('12/11/2021 06:00 PM UTC')

const second = 1000
const minute = second * 60
const hour = minute * 60
const day = hour * 24

export function useCountdown(): {
    time: string
    isDone: boolean
} {
    const [time, setTime] = useState('')
    const [isDone, setIsdone] = useState(false)

    useLayoutEffect(() => {
        const processTick = () => {
            const now = new Date()
            const distance = fut.getTime() - now.getTime()

            if (distance <= 0) {
                setIsdone(true)
                return
            }

            const hours = Math.floor((distance % day) / hour)
                .toString()
                .padStart(2, '0')
            const minutes = Math.floor((distance % hour) / minute)
                .toString()
                .padStart(2, '0')
            const seconds = Math.floor((distance % minute) / second)
                .toString()
                .padStart(2, '0')
            const timeString = `${hours}:${minutes}:${seconds}`

            setTime(timeString)
        }

        const intervalId = setInterval(() => {
            processTick()
        }, 1000)

        processTick()

        return () => clearInterval(intervalId)
    }, [])

    return {
        time: time,
        isDone: isDone,
    }
}

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

export function useMintSupply(): {
    supply?: number
    totalSupply?: number
    isLoading: boolean
} {
    const { data, error } = useSWR('/api/mint/supply', mintSupplyFetcher, {
        refreshInterval: 5000,
    })
    const isLoading = !error && !data
    return {
        supply: data?.supply,
        totalSupply: data?.totalSupply,
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
    const { mutate } = useSWRConfig()
    const [_amount, _setAmount] = useState(1)
    const priceData = useSWR('/api/mint/price', mintPriceFetcher)
    const { data, error } = useSWR(
        () => '/api/mint/meta/' + connection.account,
        () => mintMetaFetcher(connection)
    )
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
