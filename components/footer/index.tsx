import styles from './Footer.module.css'
import letteringSrc from './img/lettering_clouds.svg'
import { Paragraph } from '../text'
import Image from '../image'

const Footer = () => {
  return (
    <footer className={styles.main}>
      <div className={styles.content}>
        <div className={styles.lettering} />
      </div>
      <Paragraph styles={[styles.copy]}>
        <span className={styles.year}>2021</span> friendly ghosts
      </Paragraph>
    </footer>
  )
}

export default Footer
