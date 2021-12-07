import styles from './MintButton.module.css'
import Button, { ButtonProps } from '../button'

export interface MintButtonProps extends ButtonProps {
    main?: boolean
}

const MintButton = (props: MintButtonProps) => {
    const { main, ...restProps } = props
    return <Button style={main ? styles.main : styles.minor} {...restProps} />
}

export default MintButton
