import { FC } from 'react'
import styles from './Icon.module.css'

export interface IconProps {
    type: 'minus' | 'plus' | 'twitter'
    size?: 'm' | 'l'
}

const Icon: FC<IconProps> = (props) => {
    const { type, size = 'm' } = props
    const cn = `${styles.main} ${styles[`type--${type}`]} ${styles[`size--${size}`]}`
    return <div className={cn} />
}

export default Icon
