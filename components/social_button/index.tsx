import Icon, { IconProps } from '../icon'
import styles from './SocialButton.module.css'

export interface SocialButtonProps extends IconProps {
    url: string
}

const SocialButton = (props: SocialButtonProps) => {
    const { url, ...rest } = props

    return (
        <a href={url} target="_blank" rel="noreferrer" className={styles.main}>
            <Icon {...rest} size="l" />
        </a>
    )
}

export default SocialButton
