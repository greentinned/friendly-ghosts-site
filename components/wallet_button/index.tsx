import styles from './WalletButton.module.css'
import Button from '../button'

export interface WalletButtonProps {
  address?: string
  error?: string
  disabled?: boolean
  onRelease(): void
}

const WalletButton = (props: WalletButtonProps) => {
  const { address, disabled, error, onRelease } = props
  const cn = `${styles.main} ${error ? styles.main__error : ''}`.trim()

  return (
    <Button
      title={address || 'connect'}
      subtitle={error}
      style={cn}
      onRelease={onRelease}
      disabled={disabled}
    />
  )
}

export default WalletButton
