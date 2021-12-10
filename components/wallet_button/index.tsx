import styles from './WalletButton.module.css'
import Button from '../button'

export interface WalletButtonProps {
    address?: string | null
    error?: string
    disabled?: boolean
    onRelease(): void
}

const fmtAddress = (addr: string) => `${addr.slice(0, 5)}...${addr.slice(-4)}`

const WalletButton = (props: WalletButtonProps) => {
    const { address, disabled, error, onRelease } = props
    const cn = `${styles.main} ${error ? styles.error : ''}`.trim()

    return (
        <Button
            title={address ? fmtAddress(address) : 'connect'}
            subtitle={error}
            style={cn}
            onRelease={onRelease}
            disabled={disabled}
        />
    )
}

export default WalletButton
