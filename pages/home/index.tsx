import { FC, ReactNode, useState } from 'react'
import Modal from 'react-modal'
import type { NextPage } from 'next'
import Head from 'next/head'
import useSystemTheme from 'use-system-theme'
import { useHonoraries, useMintPrice } from '../../hooks'
import constStyles from '../../styles/constants.module.css'
import helperStyles from '../../styles/helpers.module.css'
import styles from './Home.module.css'
import ghostClouds from './img/ghost_clouds.svg'
import moonClouds from './img/moon_clouds.svg'
import halfMoonClouds from './img/half_moon_clouds.svg'
import ghost1 from './img/ghost_1.svg'
import ghost2 from './img/ghost_2.svg'
import ghost3 from './img/ghost_3.svg'
import sasha from './img/sasha.svg'
import cute from './img/cute.svg'
import egor from './img/egor.svg'
import nxcss from './img/nxcss.svg'
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
import { honorData } from '../../data'
import { randArb } from '../../helpers'

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
                      title="Mint coming soon"
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
                  src={ghostClouds}
                  alt="Misty ghost in the clouds"
                  width={476}
                  height={315}
                />
              </div>
            }
          />
          <DetailSection />
          <TraitsSection />
          <SocialSection />
          <TeamSection />
          <HonorariesSection />
        </div>
      </main>
      <Footer />
    </div>
  )
}

const Moon = () => {
  const systemTheme = useSystemTheme(true)
  return (
    <div className={styles.moonClouds}>
      <div className={styles.moonCloudsImage}>
        <Image
          src={systemTheme === 'light' ? moonClouds : halfMoonClouds}
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
            <MintButton title="Mint coming soon" onRelease={() => {}} />
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
        // src="/img/home/ghost_1.svg"
        src={ghost1}
      />
      <Visibility desktop>
        <TraitsSectionItem
          title="In cool glasses and suit"
          // src="/img/home/ghost_2.svg"
          src={ghost2}
          reverse
        />
      </Visibility>
      <Visibility mobile>
        <TraitsSectionItem
          title="In cool glasses and suit"
          // src="/img/home/ghost_2.svg"
          src={ghost2}
        />
      </Visibility>
      <TraitsSectionItem
        title="Or not so ghosty at all"
        // src="/img/home/ghost_3.svg"
        src={ghost3}
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

/*
 * Social Section
 */

const SocialSection: FC = () => {
  return (
    <div className={styles.socialSection}>
      <Heading1>If you ghost, you’re with us ♥︎</Heading1>
      <div className={styles.socialSectionItems}>
        <SocialSectionItem
          icon="discord"
          title="1000 supportive fantoms in friendly discord"
          linkText="to server ➚"
          linkUrl="https://twitter.com"
        />
        <SocialSectionItem
          icon="twitter"
          title="1000 supportive fantoms in friendly discord"
          linkText="to server ➚"
          linkUrl="https://twitter.com"
        />
      </div>
    </div>
  )
}

const SocialSectionItem: FC<{
  icon: 'discord' | 'twitter'
  title: string
  linkText: string
  linkUrl: string
}> = ({ icon, title, linkText, linkUrl }) => {
  return (
    <div className={styles.socialSectionItem}>
      <div
        className={`${styles.socialSectionItemIcon} ${
          styles[`socialSectionItemIcon__${icon}`]
        }`}
      ></div>
      <div className={styles.socialSectionItemContent}>
        <Paragraph styles={[styles.socialSectionItemText]}>{title}</Paragraph>
        <a href={linkUrl} target="_blank" rel="noreferrer">
          <Paragraph
            styles={[
              styles.socialSectionItemText,
              styles.socialSectionItemLink,
            ]}
          >
            {linkText}
          </Paragraph>
        </a>
      </div>
    </div>
  )
}

/*
 * Team Section
 */

const TeamSection: FC = () => {
  return (
    <div className={styles.teamSection}>
      <div className={styles.teamSectionHeader}>
        <Heading1>People behind the project</Heading1>
        <Paragraph>
          created by 4 enthusiasts to test our skills and take our community
          onchain
        </Paragraph>
      </div>
      <div className={styles.teamSectionPersons}>
        <div className={styles.teamSectionPersonsCol}>
          <TeamSectionPerson
            src={sasha}
            name="Sasha"
            twitter="sashatsereteli"
            twitterUrl="https://twitter.com/sashatsereteli"
          />
          <TeamSectionPerson
            src={egor}
            name="Egor"
            twitter="rqrqrqrq"
            twitterUrl="https://github.com/rqrqrqrq"
          />
        </div>
        <div className={styles.teamSectionPersonsCol}>
          <TeamSectionPerson
            src={cute}
            name="Cute"
            twitter="armslookcute"
            twitterUrl="https://twitter.com/armslookcute"
          />
          <TeamSectionPerson
            src={nxcss}
            name="NXCSS"
            twitter="nxcss"
            twitterUrl="https://www.instagram.com/nxcss"
          />
        </div>
        <div className={styles.teamSectionPersonsCol}></div>
      </div>
    </div>
  )
}

const TeamSectionPerson: FC<{
  src: string
  name: string
  twitter: string
  twitterUrl: string
}> = ({ src, name, twitter, twitterUrl }) => {
  return (
    <div className={styles.teamSectionPerson}>
      <Image src={src} alt={name} />
      <div className={styles.teamSectionPersonId}>
        <Heading3>{name}</Heading3>
        <a href={twitterUrl} target="_blank" rel="noreferrer">
          <Caption>@{twitter}</Caption>
        </a>
      </div>
    </div>
  )
}

/*
 * Honoraries Section
 */

const HonorariesSection: FC = () => {
  const { data, isLoading } = useHonoraries()
  return (
    <div className={styles.honorariesSection}>
      <div className={styles.honorariesSectionHeader}>
        <Heading1>Honoraries</Heading1>
        <Paragraph>All this great people with us</Paragraph>
      </div>
      <div className={styles.honorariesSectionPersons}>
        {/* {honorData.map((i, idx) => (
          <HonorariesSectionPerson
            key={`${i.twitter}_${idx}`}
            src={i.src}
            twitter={i.twitter}
            twitterUrl={i.twitterUrl}
          />
        ))} */}
        {isLoading
          ? ''
          : data.map((i, idx) => (
              <HonorariesSectionPerson
                key={`${i.name}_${idx}`}
                src={i.src}
                twitter={i.name}
                twitterUrl={i.twitterUrl}
              />
            ))}
      </div>
    </div>
  )
}

const HonorariesSectionPerson: FC<{
  src: StaticImageData
  // src: string
  twitter: string
  twitterUrl: string
}> = ({ src, twitter, twitterUrl }) => {
  return (
    <a
      href={twitterUrl}
      target="_blank"
      rel="noreferrer"
      className={styles.honorariesSectionPersonWrapper}
    >
      <div
        className={styles.honorariesSectionPerson}
        style={{ transform: `rotateZ(${Math.floor(randArb(-3, 3))}deg)` }}
      >
        <Image
          src={src}
          alt={twitter}
          className={styles.honorariesSectionImage}
          // layout="fill"
        />
        <div className={styles.honorariesSectionTwitter}>
          <Caption>{twitter}</Caption>
        </div>
      </div>
    </a>
  )
}

export default Home
