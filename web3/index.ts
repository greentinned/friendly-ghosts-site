import { honorData } from '../data'
import { sleep } from '../helpers'

export async function walletFetcher(): Promise<any> {
    // TODO: Should throw if error
    await sleep(5000)
    return Promise.resolve('0xF00...BAR')
}

export async function honorariesFetcher(): Promise<any> {
    // TODO: Should throw if error
    return Promise.resolve(honorData)
}

export async function mintPriceFetcher(_url: string): Promise<any> {
    // TODO: Should throw if error
    return Promise.resolve(0.02)
}

export async function mintFetcher(_url: string, amount: number): Promise<any> {
    // TODO: Should throw if error
    await sleep(5000)
    return Promise.resolve(new Array(amount).map(() => '../pages/home/img/honoraries/1.jpeg'))
}
