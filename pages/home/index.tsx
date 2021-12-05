import { FC, ReactNode, useState } from 'react'
import Modal from 'react-modal'
import type { NextPage } from 'next'
import Head from 'next/head'
import useSystemTheme from 'use-system-theme'
import { useMintPrice } from '../../hooks'
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
  Heading1,
  Heading2,
  Heading3,
  Paragraph,
  Caption,
  Image,
  Visibility,
} from '../../components'
import { visibility } from '../../components/visibility'

Modal.setAppElement('#__next')

const Home: NextPage = () => {
  const systemTheme = useSystemTheme(true)
  const [modalIsOpen, setModalOpen] = useState(false)
  const { price: mintPrice, isLoading } = useMintPrice()

  const cn = `${styles.container} ${constStyles.typo} ${
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
        overlayClassName={styles.modalOverlay}
      />

      <main className={styles.main}>
        <Header onConnectWallet={() => {}} />
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
                      // title={`Mint for ${isLoading ? '...' : mintPrice} eth`}
                      title="Mint comming soon"
                      onRelease={() => {}}
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
                <Image
                  src="/img/home/ghost_clouds.svg"
                  alt="Misty ghost in the clouds"
                  width={476}
                  height={315}
                />
              </div>
            }
          />
          <DetailSection />
          <TraitsSection />
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
        <Image
          src="/img/home/moon_clouds.svg"
          alt="Misty moon in the clouds"
          width={666}
          height={276}
        />
      </div>
    </div>
  )
}

/*
 * Main Section
 */

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

/*
 * Detail Section
 */

const DetailSection: FC = () => {
  const { price: mintPrice, isLoading: isMintPriceLoading } = useMintPrice()
  return (
    <div className={styles.detailSection}>
      <div className={visibility(styles.detailSectionGhostsWrapper, 'mobile')}>
        <div className={styles.detailSectionGhosts} />
      </div>
      <div className={styles.detailSectionContent}>
        <div className={styles.detailSectionItems}>
          <DetailSectionItem
            title="8888 ghosts"
            subtitle="With various assets crafted with love"
          />
          <DetailSectionItem
            title="200+ unique pictures"
            subtitle="Handdrawed, and absolutely unique "
          />
          <DetailSectionItem
            title={`${isMintPriceLoading ? '...' : mintPrice} eth`}
            subtitle="You pay only for mint"
          />
          <div className={styles.detailSectionMintButton}>
            <MintButton title="Mint comming soon" onRelease={() => {}} />
          </div>
        </div>
        <div className={visibility(styles.detailSectionGhosts, 'desktop')} />
      </div>
    </div>
  )
}

const DetailSectionItem: FC<{ title: string; subtitle: string }> = ({
  title,
  subtitle,
}) => (
  <div className={styles.detailSectionItem}>
    <Heading1 styles={[styles.detailSectionItemTitle]}>{title}</Heading1>
    <Paragraph styles={[styles.detailSectionItemSubtitle]}>
      {subtitle}
    </Paragraph>
  </div>
)

/*
 * Traits Section
 */

const TraitsSection: FC = () => {
  return (
    <div className={styles.traitsSection}>
      <TraitsSectionItem
        title="You can be in hat"
        src="/img/home/ghost_1.svg"
      />
      <Visibility desktop>
        <TraitsSectionItem
          title="In cool glasses and suit"
          src="/img/home/ghost_2.svg"
          reverse
        />
      </Visibility>
      {/* <TraitsSectionItem
        title="In cool glasses and suit"
        src="/img/home/ghost_2.svg"
        reverse
      /> */}
      <Visibility mobile>
        <TraitsSectionItem
          title="In cool glasses and suit"
          src="/img/home/ghost_2.svg"
        />
      </Visibility>
      <TraitsSectionItem
        title="Or not so ghosty at all"
        src="/img/home/ghost_3.svg"
      />
    </div>
  )
}

const TraitsSectionItem: FC<{ title: string; src: string; reverse?: boolean }> =
  ({ title, src, reverse }) => {
    return (
      <div className={styles.traitsSectionItem}>
        {reverse ? <Heading2>{title}</Heading2> : ''}
        <div>
          <Image src={src} alt="Traits" width={480} height={480} />
        </div>
        {reverse ? '' : <Heading2>{title}</Heading2>}
      </div>
    )
  }

export default Home
