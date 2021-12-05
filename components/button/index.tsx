import styles from './Button.module.css'

export interface ButtonProps {
  title: string
  subtitle?: string
  style?: string
  onRelease(): void
}

const Button = (props: ButtonProps) => {
  const { title, subtitle, style, onRelease } = props
  const cn = `${styles.main} ${style || ''}`.trim()

  return (
    <div className={cn} onClick={onRelease}>
      <div className={styles.title}>{title}</div>
      <div className={styles.subtitle}>{subtitle}</div>
    </div>
  )
}

export default Button
