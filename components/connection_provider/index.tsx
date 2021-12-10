import { ethers } from 'ethers'
import { Web3ReactProvider } from '@web3-react/core'
import { memo } from 'react'

function getLibrary(provider: any) {
    return new ethers.providers.Web3Provider(provider)
}

const UpdateInterceptor = memo(
    function UpdateInterceptorImpl({ children }) {
        return <>{children}</>
    },
    () => false
)

export const ConnectionProvider: React.FC = ({ children }) => {
    return (
        <Web3ReactProvider getLibrary={getLibrary}>
            <UpdateInterceptor>{children}</UpdateInterceptor>
        </Web3ReactProvider>
    )
}
