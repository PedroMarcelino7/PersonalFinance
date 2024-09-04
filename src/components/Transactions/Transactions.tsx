import styles from './Transactions.module.scss'

// Components
import SummaryTitle from '../SummaryTitle/SummaryTitle'

// Images
import ProfilePicture_1 from '../../assets/images/avatars/emma-richardson.jpg'

const Transactions = () => {
    return (
        <div className='summary_card'>
            <SummaryTitle title={'Transactions'} redirect={'View All'} />

            <div className={styles.transactions_box}>
                <div className={styles.transaction}>
                    <div className={styles.profile}>
                        <img src={ProfilePicture_1} alt="" />
                        <h2>Emma Richardson</h2>
                    </div>

                    <div className={styles.details}>
                        <div className={styles.balance}>
                            <h3>+$75.50</h3>
                        </div>

                        <div className={styles.date}>
                            <h4>19 Aug 2024</h4>
                        </div>
                    </div>
                </div>

                <div className={styles.divisor}></div>
            </div>
        </div>
    )
}

export default Transactions