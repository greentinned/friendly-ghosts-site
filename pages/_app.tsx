import '../styles/globals.css'
import '../components/modal/modal.css'
import type { AppProps } from 'next/app'
import { ConnectionProvider } from '../components/connection_provider'

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <ConnectionProvider>
            <Component {...pageProps} />
        </ConnectionProvider>
    )
}

export default MyApp
