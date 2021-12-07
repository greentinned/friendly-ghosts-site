import styles from './Header.module.css'
import WalletButton from '../wallet_button'
import Logo from '../logo'
import SocialButton from '../social_button'

export interface HeaderProps {
    walletAddress?: string
    walletError?: string
    isWalletDisabled?: boolean
    onConnectWallet(): void
}

const Header = (props: HeaderProps) => {
    const { walletAddress, walletError, isWalletDisabled, onConnectWallet } = props

    return (
        <div className={styles.main}>
            <div className={styles.lead}>
                <Logo />
                <div className={styles.social}>
                    <SocialButton
                        type="twitter"
                        url="https://twitter.com/FriendlyFantoms"
                    />
                    <SocialButton
                        type="discord"
                        url="https://discord.com/invite/gBNW4NwDMK"
                    />
                </div>
            </div>
            <div className={styles.trail}>
                <WalletButton
                    address={walletAddress}
                    error={walletError}
                    onRelease={onConnectWallet}
                    disabled={isWalletDisabled}
                />
            </div>
        </div>
    )
}

export default Header
