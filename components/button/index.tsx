import styles from './Button.module.css'

export interface ButtonProps {
  title: string
  subtitle?: string
  disabled?: boolean
  wide?: boolean
  style?: string
  onRelease(): void
}

const Button = (props: ButtonProps) => {
  const { title, subtitle, disabled, wide, style, onRelease } = props
  const cn = `${styles.main} ${disabled ? styles.disabled : ''} ${
    wide ? styles.wide : ''
  } ${style || ''}`.trim()

  return (
    <div className={cn} onClick={disabled ? undefined : onRelease}>
      <div className={styles.title}>{title}</div>
      <div className={styles.subtitle}>{subtitle}</div>
    </div>
  )
}

export default Button
