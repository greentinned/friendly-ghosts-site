import styles from './Logo.module.css'
import logoGhost from './img/logo_ghost.svg'
import logoText from './img/logo_text.svg'
import Image from '../image'

const Logo = () => {
  return (
    <div className={styles.main}>
      <Image
        className={styles.ghost}
        src={logoGhost}
        alt="Friendly Ghosts Logo"
      />
      <Image
        className={styles.text}
        src={logoText}
        alt="Friendly Ghosts Logo Text"
      />
    </div>
  )
}

export default Logo
