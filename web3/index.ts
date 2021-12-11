import { honorData } from '../data'

import { ethers } from 'ethers'
import { TOKEN_ADDRESS, TOKEN_ABI } from '../data/chain-info'

const tokenBlueprint = new ethers.Contract(TOKEN_ADDRESS, TOKEN_ABI)

const readConnection = new ethers.providers.InfuraProvider(
    'homestead',
    'be30c314d2a548e0ac38d1c4bda60782'
)

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

export async function mintSupplyFetcher(_url: string): Promise<{
    supply: number
    totalSupply: number
}> {
    const token = tokenBlueprint.connect(readConnection)

    const [totalSupply, maxSupply] = await Promise.all([
        token.totalSupply(),
        token.maxSupply(),
    ])

    return Promise.resolve({
        supply: maxSupply - totalSupply,
        totalSupply: maxSupply,
    })
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
