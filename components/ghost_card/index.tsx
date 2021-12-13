import { FC, useEffect, useState } from 'react'
import { SocialButton, Visibility } from '..'
import { randArb } from '../../helpers'
/* import Icon from '../icon' */
import { Paragraph, Caption } from '../text'
import styles from './GhostCard.module.css'

const twitterIntentUrl = (text: string, via: string) =>
    encodeURI(`https://twitter.com/intent/tweet?text=${text}&via=${via}`)

const twitterUrl = twitterIntentUrl(
    'Frens, I abandoned my real life and hereby identify as an online ghost profile picture from now on. Mint yours at https://friendlyghosts.xyz/',
    'FriendlyFantoms'
)

const GhostCard: FC<{ id: number }> = (props) => {
    const { id } = props
    const [stableArb] = useState(() => Math.floor(randArb(-3, 3)))

    const [url, setUrl] = useState('/images/placeholder.svg')

    useEffect(() => {
        let isCurrent = true

        const imageUrl = '/images/' + id

        fetch(imageUrl).then((res) => {
            if (res.ok && isCurrent) {
                setUrl(imageUrl)
            }
        })

        return () => {
            isCurrent = false
        }
    })

    return (
        <div
            className={styles.main}
            style={{ transform: `rotateZ(${stableArb}deg)` }}
        >
            <div className={styles.placeholder}>
                <img src={url} alt="" />
            </div>
            <div className={styles.title}>
                <Caption>FriendlyGhost #{id}</Caption>
                <SocialButton url={twitterUrl} type={'twitter'} />
            </div>
            {/* <Caption>
                <a href="https://twitter.com" target="_blank" rel="noreferrer">
                    Share to twitter ➚
                </a>
            </Caption> */}
        </div>
    )
}

export default GhostCard
