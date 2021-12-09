import { FC, useState } from 'react'
import Modal from 'react-modal'
import type { NextPage } from 'next'
import Head from 'next/head'
import useSystemTheme from 'use-system-theme'
import {
    useHonoraries,
    useMintPrice,
    useMintCalc,
    useWallet,
    useMint
} from '../../hooks'
import constStyles from '../../styles/constants.module.css'
import helperStyles from '../../styles/helpers.module.css'
import styles from './Home.module.css'
import ghostClouds from './img/ghost_clouds.svg'
import moonClouds from './img/moon_clouds.svg'
import halfMoonClouds from './img/half_moon_clouds.svg'
import ghost1 from './img/ghost_1.svg'
import ghost2 from './img/ghost_2.svg'
import ghost3 from './img/ghost_3.svg'
import tildaSign from './img/~.svg'
import dashSign from './img/-.svg'
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
    Button,
    IconButton,
    Icon,
    GhostCard,
} from '../../components'
import { visibility } from '../../components/visibility'
import { randArb } from '../../helpers'

const metaUrl = process.env.NEXT_PUBLIC_HOST
const metaPreviewUrl = `${process.env.NEXT_PUBLIC_HOST}${process.env.NEXT_PUBLIC_HOST_ROOT}`

Modal.setAppElement('#__next')

const Home: NextPage = () => {
    const systemTheme = useSystemTheme(true)
    const [isMintModalOpen, setMintModalOpen] = useState(false)
    const [isMintResultModalReady, setMintResultModalReady] = useState(false)
    const [isMintErrorModalReady, setMintErrorModalReady] = useState(false)
    const [shouldConnectWallet, setShouldConnectWallet] = useState(false)
    const [shouldMint, setShouldMint] = useState(false)
    const mintPrice = useMintPrice()
    const mintCalc = useMintCalc()
    const wallet = useWallet(shouldConnectWallet)
    const mintData = useMint(shouldMint, mintCalc.amount)
    console.log(mintData)

    const cn = `${styles.container} ${constStyles.typo} ${constStyles['theme__' + systemTheme] || constStyles.theme__light
        }`.trim()

    return (
        <div className={cn}>
            <Head>
                {/* <!-- Primary Meta Tags --> */}
                <title>Friendly Ghosts — Even ghosts deserve love &lt;3</title>
                <meta
                    name="title"
                    content="Friendly Ghosts — Even ghosts deserve love <3"
                />
                <meta
                    name="description"
                    content="Your non-toxic online identity for the most supportive community ever."
                />

                {/* <!-- Open Graph / Facebook --> */}
                <meta property="og:type" content="website" />
                <meta property="og:url" content={metaUrl} />
                <meta
                    property="og:title"
                    content="Friendly Ghosts — Even ghosts deserve love <3"
                />
                <meta
                    property="og:description"
                    content="Your non-toxic online identity for the most supportive community ever."
                />
                <meta property="og:image" content={`${metaPreviewUrl}/img/post.png`} />

                {/* <!-- Twitter --> */}
                <meta property="twitter:card" content="summary_large_image" />
                <meta property="twitter:url" content={metaUrl} />
                <meta
                    property="twitter:title"
                    content="Friendly Ghosts — Even ghosts deserve love <3"
                />
                <meta
                    property="twitter:description"
                    content="Your non-toxic online identity for the most supportive community ever."
                />
                <meta
                    property="twitter:image"
                    content={`${metaPreviewUrl}/img/post.png`}
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            {/* Mint Modal */}

            <Modal
                isOpen={isMintModalOpen}
                onRequestClose={() => setMintModalOpen(false)}
                contentLabel="Mint modal"
                className={styles.modalContent}
                portalClassName={cn}
                overlayClassName={styles.modalOverlay}
            >
                <Heading1 invert>Mint your ghosts</Heading1>
                <Paragraph invert styles={[styles.modalMintSubtitle]}>how many ghosts do you want?</Paragraph>
                <div className={styles.modalMintAmount}>
                    <div className={styles.modalMintCounter}>
                        <IconButton
                            disabled={!!mintCalc.minAmount && (mintCalc.amount <= mintCalc.minAmount)}
                            icon={<Icon type="minus" />}
                            invert
                            onRelease={() => { mintCalc.setAmount(mintCalc.amount - 1) }}
                        />
                        <Heading1 invert>{mintCalc.amount}</Heading1>
                        <IconButton
                            disabled={!!mintCalc.maxAmount && (mintCalc.amount >= mintCalc.maxAmount)}
                            icon={<Icon type="plus" />}
                            invert
                            onRelease={() => { mintCalc.setAmount(mintCalc.amount + 1) }}
                        />
                    </div>
                    <Heading1 invert>{mintCalc.price} eth</Heading1>
                </div>
                <div
                    className={`${styles.modalMintButtons} ${mintCalc?.freeMint ? styles.modalMintFreeMintLabel : ''}`.trim()}
                >
                    <MintButton
                        title="Mint"
                        max
                        onRelease={() => {
                            setMintModalOpen(false)
                            setShouldMint(true)
                            setMintResultModalReady(true)
                            setMintErrorModalReady(true)
                        }}
                    />
                    <Button
                        title="Cancel"
                        invert
                        onRelease={() => {
                            setMintModalOpen(false)
                        }}
                    />
                </div>
            </Modal>

            {/* Mint in progress Modal */}

            <Modal
                isOpen={mintData.isLoading}
                contentLabel="Minting modal"
                className={styles.modalMintingContent}
                portalClassName={cn}
                overlayClassName={styles.modalOverlay}
            >
                <Hero styles={[styles.modalMintingContentTitle]}>Mint your ghosts</Hero>
                <Image src={tildaSign} alt="Minting in progress" />
            </Modal>

            {/* Mint error Modal  */}

            <Modal
                isOpen={isMintErrorModalReady && mintData.error !== undefined}
                contentLabel="Mint error modal"
                className={styles.modalMintErrorContent}
                portalClassName={cn}
                overlayClassName={styles.modalOverlay}
            >
                <Hero styles={[styles.modalMintErrorContentTitle]}>Oops</Hero>
                <Image src={dashSign} alt="Delimeter" />
                <Paragraph center>{mintData.error}</Paragraph>
                <Button
                    title="Oh, that's sad"
                    onRelease={() => {
                        mintData.mutate(undefined, false)
                        setShouldMint(false)
                        setMintErrorModalReady(false)
                    }}
                />
            </Modal>

            {/* Mint result Modal  */}

            <Modal
                isOpen={isMintResultModalReady && mintData.images !== undefined}
                contentLabel="Mint result modal"
                className={styles.modalMintResultContent}
                portalClassName={cn}
                overlayClassName={styles.modalOverlay}
            >
                <Hero styles={[styles.modalMintResultContentTitle]}>Aha! We caught it</Hero>
                <div className={styles.modalMintResultContentScroll}>
                    <div className={styles.modalMintResultContentScrollContent}>
                        {mintData.images?.map((i, idx) => <GhostCard key={`${i}-${idx}`} url={i} />)}
                    </div>
                </div>
                <div className={styles.modalMintResultContentButtonWrapper}>
                    <Button
                        title="Close"
                        style={styles.modalMintResultContentButton}
                        onRelease={() => {
                            mintData.mutate(undefined, false)
                            setShouldMint(false)
                            setMintResultModalReady(false)
                        }}
                    />
                </div>
            </Modal>


            <main className={styles.main}>
                <Header
                    isWalletDisabled={wallet.isLoading}
                    walletAddress={wallet.address}
                    walletError={wallet.error}
                    onConnectWallet={() => { setShouldConnectWallet(true) }}
                />
                <Moon />
                <div className={styles.contentWrapper}>
                    <MainSection onMint={() => { setMintModalOpen(true) }} />
                    <DetailSection onMint={() => { setMintModalOpen(true) }} />
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

const MainSection: FC<{ onMint(): void }> = (props) => {
    const { onMint } = props
    const mintPrice = useMintPrice()

    return (
        <div className={styles.mainSection}>
            <div className={styles.mainSectionLead} />
            <div className={styles.mainSectionCenter}>
                <div className={styles.mainSectionCenterWrapper}>
                    <Hero styles={[styles.titleLineLead]}>Even ghosts</Hero>
                    <Hero styles={[styles.titleLineTrail]}>deserve love</Hero>
                    <Paragraph styles={[styles.description]}>
                        Your non-toxic online identity for the most supportive
                        community ever
                    </Paragraph>
                    <div className={styles.mintWrapper}>
                        <Paragraph styles={[helperStyles.mobileVisible]}>
                            Become a friendly ghost
                        </Paragraph>
                        <div className={styles.mintButtonWrapper}>
                            <MintButton
                                title={`Mint for ${mintPrice.isLoading ? '...' : mintPrice.price} eth`}
                                onRelease={() => { onMint() }}
                                main
                            />
                            <Caption styles={[helperStyles.mobileHidden]}>
                                Become <br /> a friendly ghost
                            </Caption>
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.mainSectionTrail}>
                <div className={styles.ghostClouds}>
                    <Image
                        src={ghostClouds}
                        alt="Misty ghost in the clouds"
                        width={476}
                        height={315}
                    />
                </div>
            </div>
        </div>
    )
}

/*
 * Detail Section
 */

const DetailSection: FC<{ onMint(): void }> = (props) => {
    const { onMint } = props
    const mintPrice = useMintPrice()
    return (
        <div className={styles.detailSection}>
            <div className={visibility(styles.detailSectionGhostsWrapper, 'mobile')}>
                <div className={styles.detailSectionGhosts} />
            </div>
            <div className={styles.detailSectionContent}>
                <div className={styles.detailSectionItems}>
                    <DetailSectionItem
                        title="8888 ghosts"
                        subtitle="Unique characters crafted with love ♥︎"
                    />
                    <DetailSectionItem
                        title="200+ unique traits"
                        subtitle="Hand drawn by a female artist"
                    />
                    <DetailSectionItem
                        title={`${mintPrice.isLoading ? '...' : mintPrice.price} eth`}
                        subtitle="+ 2.5% artist royalties on resells"
                    />
                    <div className={styles.detailSectionMintButton}>
                        <MintButton
                            title="Mint"
                            wide
                            onRelease={() => { onMint() }}
                        />
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
            <TraitsSectionItem title="you can be in a cute hat..." src={ghost1} />
            <Visibility desktop>
                <TraitsSectionItem
                    title="... cool glasses and a suit..."
                    src={ghost2}
                    reverse
                />
            </Visibility>
            <Visibility mobile>
                <TraitsSectionItem
                    title="... cool glasses and a suit..."
                    src={ghost2}
                />
            </Visibility>
            <TraitsSectionItem title="... or not so ghostly at all" src={ghost3} />
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
            <Heading1>If you’re a ghost, you’re with us ♥︎</Heading1>
            <div className={styles.socialSectionItems}>
                <SocialSectionItem
                    icon="discord"
                    title="thousands of supportive ghosts in our friendly discord"
                    linkText="join us ➚"
                    linkUrl="https://discord.com/invite/gBNW4NwDMK"
                />
                <SocialSectionItem
                    icon="twitter"
                    title="all things ghostly and cool drops"
                    linkText="follow us ➚"
                    linkUrl="https://twitter.com/FriendlyFantoms"
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
        <a
            href={linkUrl}
            target="_blank"
            rel="noreferrer"
            className={styles.socialSectionItem}
        >
            <div
                className={`${styles.socialSectionItemIcon} ${styles[`socialSectionItemIcon__${icon}`]
                    }`}
            ></div>
            <div className={styles.socialSectionItemContent}>
                <Paragraph styles={[styles.socialSectionItemText]}>{title}</Paragraph>
                <Paragraph
                    styles={[styles.socialSectionItemText, styles.socialSectionItemLink]}
                >
                    {linkText}
                </Paragraph>
            </div>
        </a>
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
                    created by 4 enthusiasts to test our skills and
                    take our community onchain
                </Paragraph>
            </div>
            <div className={styles.teamSectionPersons}>
                <div className={styles.teamSectionPersonsCol}>
                    <TeamSectionPerson
                        src={sasha}
                        name="Sasha"
                        social="sashatsereteli"
                        socialUrl="https://twitter.com/sashatsereteli"
                        role="marketing"
                    />
                    <TeamSectionPerson
                        src={egor}
                        name="Egor"
                        social="rqrqrqrq"
                        socialUrl="https://github.com/rqrqrqrq"
                        role="dev"
                    />
                </div>
                <div className={styles.teamSectionPersonsCol}>
                    <TeamSectionPerson
                        src={cute}
                        name="Cute"
                        social="armslookcute"
                        socialUrl="https://twitter.com/armslookcute"
                        role="community"
                    />
                    <TeamSectionPerson
                        src={nxcss}
                        name="NXCSS"
                        social="nxcss"
                        socialUrl="https://www.instagram.com/nxcss"
                        role="artist"
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
    social: string
    socialUrl: string
    role: string
}> = ({ src, name, social, socialUrl, role }) => {
    return (
        <a href={socialUrl} target="_blank" rel="noreferrer">
            <div className={styles.teamSectionPerson}>
                <Image src={src} alt={name} />
                <div className={styles.teamSectionPersonId}>
                    <Heading3>{name}</Heading3>
                    <Caption>@{social}</Caption>
                    <Caption styles={[styles.teamSectionPersonRole]}>{role}</Caption>
                </div>
            </div>
        </a>
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
                <Paragraph>We made ghosts for these cool people</Paragraph>
            </div>
            <div className={styles.honorariesSectionPersons}>
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
                />
                <div className={styles.honorariesSectionTwitter}>
                    <Caption>{twitter}</Caption>
                </div>
            </div>
        </a>
    )
}

export default Home
