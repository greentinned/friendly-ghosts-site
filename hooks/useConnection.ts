import { useCallback, useEffect } from 'react'
import { useWeb3React, UnsupportedChainIdError } from '@web3-react/core'
import {
    InjectedConnector,
    NoEthereumProviderError,
} from '@web3-react/injected-connector'
import { CHAIN_ID, CHAIN_ID_HEX } from '../data/chain-info'

const injected = new InjectedConnector({ supportedChainIds: [CHAIN_ID] })

const getReadableError = (error?: Error) => {
    if (error instanceof NoEthereumProviderError) {
        return 'MetaMask not found'
    }

    if (error instanceof UnsupportedChainIdError) {
        return 'Wrong network'
    }
}

export const useConnection = () => {
    const connection = useWeb3React()

    useEffect(() => {
        if (!connection.active && !connection.error) {
            connection.activate(injected)
        }
    }, [connection])

    useEffect(() => {
        const isNoEthereumProviderError =
            connection.error instanceof NoEthereumProviderError

        const isUnsupportedChainIdError =
            connection.error instanceof UnsupportedChainIdError

        if (isNoEthereumProviderError) {
            window.open(
                'https://metamask.io/download.html',
                '_blank',
                'noopener,noreferrer'
            )
        }

        if (isUnsupportedChainIdError) {
            ;(window as any).ethereum
                .request({
                    method: 'wallet_switchEthereumChain',
                    params: [{ chainId: CHAIN_ID_HEX }],
                })
                .catch(console.log)
        }
    }, [connection.error])

    const activate = useCallback(() => {
        if (connection.active) {
            return Promise.resolve()
        }

        return connection.activate(injected, undefined, true).catch((err) => {
            connection.setError(err)
            throw err
        })
    }, [connection])

    return {
        connection,
        activate,
        readableError: getReadableError(connection.error),
    }
}
