import styles from './Footer.module.css'
import Image from '../image'
import { Caption } from '../text'
import cczeroLogo from './img/cc0.svg'

const Footer = () => {
    return (
        <footer className={styles.main}>
            <div className={styles.content}>
                <div className={styles.lettering} />
            </div>
            <div
                xmlns:dct="http://purl.org/dc/terms/"
                xmlns:vcard="http://www.w3.org/2001/vcard-rdf/3.0#"
                className={styles.copy}
            >
                <Caption center>
                    To the extent possible under law,{' '}
                    <a rel="dct:publisher" href="https://friendlyghosts.xyz">
                        <span property="dct:title">Friendly&nbsp;Ghosts</span>
                    </a>{' '}
                    has waived all copyright and related or&nbsp;neighboring
                    rights to
                    <span property="dct:title"> Friendly Ghosts</span>. This
                    work is published from{' '}
                    <span
                        property="vcard:Country"
                        datatype="dct:ISO3166"
                        content="RU"
                        about="https://friendlyghosts.xyz"
                    >
                        Russian Federation
                    </span>
                    .
                </Caption>
                <a
                    rel="license"
                    href="http://creativecommons.org/publicdomain/zero/1.0/"
                >
                    <Image src={cczeroLogo} alt="cc0" />
                </a>
            </div>
        </footer>
    )
}

export default Footer
