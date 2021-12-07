import { FC, ReactNode } from "react"
import Button, { ButtonProps } from "../button"

export interface IconButtonProps extends ButtonProps {
    icon: ReactNode
}

const IconButton: FC<IconButtonProps> = (props) => {
    const { icon, ...restProps } = props
    return <Button {...restProps}>{icon}</Button>
}

export default IconButton
