import styles from './SummaryTitle.module.scss'

// Images
import DetailsArrow from '../../assets/images/icon-caret-right.svg'

type Props = {
    title: string,
    redirect: string
}

const SummaryTitle = ({ title, redirect }: Props) => {
    return (
        <div className={styles.header}>
            <h2 className={styles.header_title}>{title}</h2>

            <div className={styles.details_box}>
                <h3 className={styles.details_title}>{redirect}</h3>
                <img className={styles.details_arrow} src={DetailsArrow} alt="" />
            </div>
        </div>
    )
}

export default SummaryTitle