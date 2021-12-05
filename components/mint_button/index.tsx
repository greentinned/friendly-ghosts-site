import styles from './MintButton.module.css'
import Button, { ButtonProps } from '../button'

const MintButton = (props: ButtonProps) => {
  return <Button style={styles.main} {...props} />
}

export default MintButton
