import Image from 'next/image'
import styles from './SocialButton.module.css'
import twitterSrc from './img/twitter.svg'
import discordSrc from './img/discord.svg'

export enum SocialButtonType {
  twitter = 'twitter',
  discord = 'discord',
}

export interface SocialButtonProps {
  url: string
  type: SocialButtonType
}

const SocialButton = (props: SocialButtonProps) => {
  const { url, type } = props

  const typeToSrc = {
    twitter: twitterSrc,
    discord: discordSrc,
  }

  return (
    <a href={url} target="_blank" rel="noreferrer" className={styles.main}>
      <Image src={typeToSrc[type]} alt="" width={56} height={56} />
    </a>
  )
}

export default SocialButton
