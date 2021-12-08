import { FC, ReactNode } from "react"
import Button, { ButtonProps } from "../button"
import styles from './IconButton.module.css'

export interface IconButtonProps extends ButtonProps {
    icon: ReactNode
}

const IconButton: FC<IconButtonProps> = (props) => {
    const { icon, ...restProps } = props
    return <Button {...restProps} style={styles.main}>{icon}</Button>
}

export default IconButton
