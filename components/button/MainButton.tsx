import styles from './MainButton.module.css'
import Button, { ButtonProps } from './Button'

const MainButton = (props: ButtonProps) => {
  return <Button style={styles.main} {...props} />
}

export default MainButton
