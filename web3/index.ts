import { honorData } from '../data'
import { sleep } from '../helpers'

export async function walletFetcher(): Promise<any> {
    // TODO: Should throw if error
    // https://swr.vercel.app/docs/error-handling
    await sleep(3000)
    return Promise.resolve('0xF00...BAR')
}

export async function honorariesFetcher(): Promise<any> {
    // TODO: Should throw if error
    // https://swr.vercel.app/docs/error-handling
    return Promise.resolve(honorData)
}

export async function mintPriceFetcher(_url: string): Promise<any> {
    // TODO: Should throw if error
    // https://swr.vercel.app/docs/error-handling
    return Promise.resolve(0.02)
}

export async function mintMetaFetcher(_url: string): Promise<{
    minAmount: number,
    maxAmount: number,
    freeMint: boolean,
}> {
    await sleep(1000)
    // TODO: Should throw if error
    // https://swr.vercel.app/docs/error-handling
    return {
        minAmount: 1,
        maxAmount: 20,
        freeMint: false
    }
}

export async function mintFetcher(_url: string, amount: number): Promise<any> {
    await sleep(3000)

    // TODO: Should throw if error
    // https://swr.vercel.app/docs/error-handling
    if (amount == 4) { // this error if for testing
        const error = new Error('An error occurred while fetching the data.')
        throw error
    }

    const data: Array<string> = []
    for (let i = 1; i <= amount; i++) {
        data.push('https://friendlyghosts.xyz//_next/static/media/17.331e9a80.jpeg?w=1200&q=75')
    }

    return Promise.resolve(data)
}
