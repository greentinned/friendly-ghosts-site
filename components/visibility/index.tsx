import { FC } from 'react'
import helperStyles from '../../styles/helpers.module.css'

export const visibility = (
  cn: string,
  ...platform: Array<'desktop' | 'mobile'>
): string => {
  return `${cn} ${helperStyles.visibility} ${platform
    .map((i) => helperStyles[i])
    .join(' ')}`.trim()
}

export interface VisibilityProps {
  mobile?: boolean
  desktop?: boolean
}

const Visibility: FC<VisibilityProps> = ({ mobile, desktop, children }) => {
  const cn = `${helperStyles.visibility} ${mobile ? helperStyles.mobile : ''} ${
    desktop ? helperStyles.desktop : ''
  }`.trim()
  return <div className={cn}>{children}</div>
}

export default Visibility
