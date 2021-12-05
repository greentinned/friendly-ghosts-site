import styles from './Header.module.css'
import WalletButton from '../wallet_button'
import Logo from '../logo'
import SocialButton, { SocialButtonType } from '../social_button'

export interface HeaderProps {
  walletAddress?: string
  walletError?: string
  onConnectWallet(): void
}

const Header = (props: HeaderProps) => {
  const { walletAddress, walletError, onConnectWallet } = props

  return (
    <div className={styles.main}>
      <div className={styles.lead}>
        <Logo />
        <div className={styles.social}>
          <SocialButton
            type={SocialButtonType.twitter}
            url="https://twitter.com"
          />
          <SocialButton
            type={SocialButtonType.discord}
            url="https://discord.com"
          />
        </div>
      </div>
      <div className={styles.trail}>
        <WalletButton
          address={walletAddress}
          error={walletError}
          onRelease={onConnectWallet}
        />
      </div>
    </div>
  )
}

export default Header