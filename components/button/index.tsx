import styles from './Button.module.css'

export interface ButtonProps {
  title: string
  subtitle?: string
  wide?: boolean
  style?: string
  onRelease(): void
}

const Button = (props: ButtonProps) => {
  const { title, subtitle, wide, style, onRelease } = props
  const cn = `${styles.main} ${wide ? styles.wide : ''} ${style || ''}`.trim()

  return (
    <div className={cn} onClick={onRelease}>
      <div className={styles.title}>{title}</div>
      <div className={styles.subtitle}>{subtitle}</div>
    </div>
  )
}

export default Button
