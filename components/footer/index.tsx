import styles from './Footer.module.css'
import letteringSrc from './img/lettering.svg'
import { Paragraph } from '../text'
import Image from '../image'

const Footer = () => {
  return (
    <footer className={styles.main}>
      <Image src={letteringSrc} alt="Even Ghosts Deserve Love" />
      <Paragraph styles={[styles.copy]}>
        <span className={styles.year}>2021</span> friendly ghosts
      </Paragraph>
    </footer>
  )
}

export default Footer
