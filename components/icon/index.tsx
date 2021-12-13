import { FC } from 'react'
import styles from './Icon.module.css'

export interface IconProps {
    type: 'minus' | 'plus' | 'twitter'
    size?: 'm' | 'l'
    invert?: boolean
}

const Icon: FC<IconProps> = (props) => {
    const { type, size = 'm', invert = false } = props
    const cn = `${styles.main} ${styles[`type--${type}`]} ${
        styles[`size--${size}`]
    } ${invert ? styles.invert : ''}`.trim()
    return <div className={cn} />
}

export default Icon
