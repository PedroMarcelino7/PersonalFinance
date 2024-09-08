import styles from './SummaryTitle.module.scss'

// Images
import DetailsArrow from '../../assets/images/icon-caret-right.svg'

type Props = {
    title: string,
    redirect: string,
}

const SummaryTitle = ({ title, redirect }: Props) => {
    const getLink = () => {
        return title.toLowerCase().replace(' ', '-')
    }

    return (
        <div className={styles.header}>
            <h2 className={styles.header_title}>{title}</h2>

            <a href={getLink()} className={styles.details_box}>
                <h3 className={styles.details_title}>{redirect}</h3>
                <img className={styles.details_arrow} src={DetailsArrow} alt={`Click here to see details of ${title}`} />
            </a>
        </div>
    )
}

export default SummaryTitle