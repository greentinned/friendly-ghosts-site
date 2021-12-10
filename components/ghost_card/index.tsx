import { FC, useEffect, useState } from 'react'
import { randArb } from '../../helpers'
/* import Icon from '../icon' */
import { Paragraph } from '../text'
import styles from './GhostCard.module.css'

const GhostCard: FC<{ id: number }> = (props) => {
    const { id } = props
    const [stableArb] = useState(() => Math.floor(randArb(-3, 3)))

    const [url, setUrl] = useState('./placeholder.svg')

    useEffect(() => {
        let isCurrent = true

        const imageUrl = '/image/' + id

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
            {/* <Paragraph>
                <a href="https://twitter.com" target="_blank" rel="noreferrer">
                    Share to twitter ➚
                </a>
            </Paragraph> */}
            <Paragraph invert>FriendlyGhost#{id}</Paragraph>
        </div>
    )
}

export default GhostCard
