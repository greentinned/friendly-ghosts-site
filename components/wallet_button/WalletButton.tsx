import styles from './WalletButton.module.css'
import { Button } from '../button'

export interface WalletButtonProps {
  address?: string
  error?: string
  onRelease(): void
}

const WalletButton = (props: WalletButtonProps) => {
  const { address, error, onRelease } = props
  const cn = `${styles.wallet} ${error ? styles.wallet__error : ''}`.trim()

  return (
    <Button
      title={address || 'connect'}
      subtitle={error}
      style={cn}
      onRelease={onRelease}
    />
  )
}

export default WalletButton
