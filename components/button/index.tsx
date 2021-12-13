import { FC } from 'react'
import styles from './Button.module.css'

export interface ButtonProps {
    title?: string
    subtitle?: string
    disabled?: boolean
    invert?: boolean
    wide?: boolean
    max?: boolean
    style?: string
    onRelease(): void
}

const Button: FC<ButtonProps> = (props) => {
    const {
        title,
        subtitle,
        disabled,
        invert,
        wide,
        max,
        style,
        onRelease,
        children,
    } = props
    const cn = `${styles.main} ${disabled ? styles.disabled : ''} ${
        invert ? styles.invert : ''
    } ${wide ? styles.wide : ''} ${max ? styles.max : ''} ${style || ''}`.trim()

    return (
        <div className={cn} onClick={disabled ? undefined : onRelease}>
            {children || (
                <>
                    <div className={styles.title}>{title}</div>
                    <div className={styles.subtitle}>{subtitle}</div>
                </>
            )}
        </div>
    )
}

export default Button
