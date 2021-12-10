import { honorData } from '../data'

import { ethers } from 'ethers'
import { TOKEN_ADDRESS, TOKEN_ABI } from '../data/chain-info'

const tokenBlueprint = new ethers.Contract(TOKEN_ADDRESS, TOKEN_ABI)

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

export async function mintMetaFetcher(connection: any): Promise<{
    minAmount: number
    maxAmount: number
    freeMint: boolean
}> {
    const signer = await connection.library.getSigner()
    const token = tokenBlueprint.connect(signer)

    const [reservedId, currentId, maxSupply] = await Promise.all([
        token.reservers(connection.account),
        token.currentId(),
        token.maxSupply(),
    ])

    const maxAmount = Math.min(20, maxSupply - currentId)
    const minAmount = Math.min(1, maxAmount)

    console.log({
        maxAmount,
        minAmount,
        currentId,
        maxSupply,
    })

    return {
        minAmount,
        maxAmount,
        freeMint: !!reservedId,
    }
}

export async function mintFetcher(
    connection: any,
    amount: string
): Promise<any> {
    try {
        const signer = await connection.library.getSigner()
        const token = tokenBlueprint.connect(signer)

        const tx = await token.mint({
            value: ethers.utils.parseEther(String(amount)),
        })
        const recipe = await tx.wait()

        const tokenIds = recipe.events.map((e: any) => e.args[2].toNumber())

        return Promise.resolve(tokenIds)
    } catch (err) {
        console.error(err)
        throw new Error('Transaction error')
    }
}
