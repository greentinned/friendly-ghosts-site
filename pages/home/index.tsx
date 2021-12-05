import { FC, ReactNode, useState } from 'react'
import Modal from 'react-modal'
import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import useSystemTheme from 'use-system-theme'
import constStyles from '../../styles/constants.module.css'
import helperStyles from '../../styles/helpers.module.css'
import styles from './Home.module.css'
import ghostClouds from './img/ghost_clouds.svg'
import moonClouds from './img/moon_clouds.svg'
import {
  Header,
  MintButton,
  Footer,
  Hero,
  Paragraph,
  Caption,
} from '../../components'

Modal.setAppElement('#__next')

const Home: NextPage = () => {
  const systemTheme = useSystemTheme(true)
  console.log(systemTheme)

  const [modalIsOpen, setModalOpen] = useState(false)
  const [walletAddress, setWalletAddress] = useState<string | undefined>(
    undefined
  )
  const [walletError, setWalletError] = useState<string | undefined>(undefined)

  const cn = `${styles.container} ${constStyles.media} ${constStyles.typo} ${
    constStyles['theme__' + systemTheme] || constStyles.theme__light
  }`.trim()

  return (
    <div className={cn}>
      <Head>
        <title>Friendly Ghosts</title>
        <meta
          name="description"
          content="Even ghosts deserve love. Collectibles for supportive and friendly comunity behind it."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalOpen(false)}
        contentLabel="Post modal"
      />

      <main className={styles.main}>
        <Header
          walletAddress={walletAddress}
          walletError={walletError}
          onConnectWallet={() => {
            if (walletAddress) {
              setWalletError('wrong network')
            } else {
              setWalletAddress('0x83...f7ae')
            }
          }}
        />
        <Moon />
        <div className={styles.contentWrapper}>
          <MainSection
            center={
              <>
                <Hero styles={[styles.titleLineLead]}>Even ghosts</Hero>
                <Hero styles={[styles.titleLineTrail]}>deserve love</Hero>
                <Paragraph styles={[styles.description]}>
                  Collectibles for supportive and friendly comunity behind it
                </Paragraph>
                <div className={styles.mintWrapper}>
                  <Paragraph styles={[helperStyles.mobileVisible]}>
                    Became a friendly ghost
                  </Paragraph>
                  <div className={styles.mintButtonWrapper}>
                    <MintButton
                      title="Mint"
                      subtitle="0.02 eth"
                      onRelease={() => setModalOpen(true)}
                      wide
                    />
                    <Caption styles={[helperStyles.mobileHidden]}>
                      Became <br /> a friendly ghost
                    </Caption>
                  </div>
                </div>
              </>
            }
            trail={
              <div className={styles.ghostClouds}>
                <Image src={ghostClouds} alt="Misty ghost in the clouds" />
              </div>
            }
          />
          <DetailSection />
        </div>
      </main>
      <Footer />
    </div>
  )
}

const Moon = () => {
  return (
    <div className={styles.moonClouds}>
      <div className={styles.moonCloudsImage}>
        <Image src={moonClouds} alt="Misty moon in the clouds" />
      </div>
    </div>
  )
}

const MainSection: FC<{
  lead?: ReactNode
  center: ReactNode
  trail: ReactNode
}> = (props) => {
  return (
    <div className={styles.mainSection}>
      <div className={styles.mainSectionLead}>{props.lead}</div>
      <div className={styles.mainSectionCenter}>
        <div className={styles.mainSectionCenterWrapper}>{props.center}</div>
      </div>
      <div className={styles.mainSectionTrail}>{props.trail}</div>
    </div>
  )
}

const DetailSection: FC = () => {
  return <div className={styles.detailSection}>{}</div>
}

export default Home
