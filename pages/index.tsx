import { useState } from 'react'
import Modal from 'react-modal'
import type { NextPage } from 'next'
import Head from 'next/head'
import useSystemTheme from 'react-use-system-theme'
import styles from '../styles/Home.module.css'
import { Button, MainButton } from '../components/button'
import { WalletButton } from '../components/wallet_button'

Modal.setAppElement('#__next')

const Home: NextPage = () => {
  const systemTheme = useSystemTheme('light')
  const [modalIsOpen, setModalOpen] = useState(false)
  const [walletAddress, setWalletAddress] = useState<string | undefined>(
    undefined
  )
  const [walletError, setWalletError] = useState<string | undefined>(undefined)

  const cn = `${styles.container} ${styles.typo} ${
    styles['theme__' + systemTheme] || styles.theme__light
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
        <div className={styles.header}>Even ghosts deserve love</div>
        <div className={styles.body}>
          Collectibles for supportive and friendly comunity behind it
        </div>
        <MainButton
          title="Mint"
          subtitle="0.02 eth"
          onRelease={() => setModalOpen(true)}
        />
        <WalletButton
          address={walletAddress}
          error={walletError}
          onRelease={() => {
            if (walletAddress) {
              setWalletError('wrong network')
            } else {
              setWalletAddress('0x83...f7ae')
            }
          }}
        />
      </main>

      <footer className={styles.footer}></footer>
    </div>
  )
}

export default Home
