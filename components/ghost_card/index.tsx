import { FC } from 'react'
import { randArb } from '../../helpers'
/* import Icon from '../icon' */
import { Paragraph } from '../text'
import styles from './GhostCard.module.css'

const GhostCard: FC<{ url: string }> = (props) => {
    const { url } = props
    return (
        <div
            className={styles.main}
            style={{ transform: `rotateZ(${Math.floor(randArb(-3, 3))}deg)` }}
        >
            <div className={styles.placeholder}>
                <img src={url} />
            </div>
            <Paragraph><a href="https://twitter.com" target="_blank">Share to twitter ➚</a></Paragraph>
        </div>
    )
}

export default GhostCard
