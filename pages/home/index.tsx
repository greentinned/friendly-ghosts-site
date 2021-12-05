import { useState } from 'react'
import Modal from 'react-modal'
import type { NextPage } from 'next'
import Head from 'next/head'
import useSystemTheme from 'use-system-theme'
import constStyles from '../../styles/constants.module.css'
import styles from './Home.module.css'
import { Header, MintButton, Footer } from '../../components'

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
        <div className={styles.contentWrapper}>
          <div className={styles.title}>Even ghosts deserve love</div>
          <div className={styles.description}>
            Collectibles for supportive and friendly comunity behind it
          </div>
          <MintButton
            title="Mint"
            subtitle="0.02 eth"
            onRelease={() => setModalOpen(true)}
          />
          {/* <WalletButton address="0x83...f7ae" onRelease={() => {}} />
          <WalletButton error="wrong network" onRelease={() => {}} /> */}
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default Home
