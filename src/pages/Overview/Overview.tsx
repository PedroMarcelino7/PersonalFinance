import styles from './Overview.module.scss'

// Components
import Pots from '../../components/Pots/Pots'
import Transactions from '../../components/Transactions/Transactions'
import RecurringBills from '../../components/RecurringBills/RecurringBills'
import PageContainer from '../../components/PageContainer/PageContainer'

const Overview = () => {
    return (
        <PageContainer title='Overview'>
            <div className={styles.summary_container}>
                <div className={`${styles.summary_box} ${styles.current}`}>
                    <h5 className={styles.summary_title}>Current Balance</h5>
                    <h4 className={styles.balance}>$4,836.00</h4>
                </div>
                <div className={styles.summary_box}>
                    <h5 className={styles.summary_title}>Income</h5>
                    <h4 className={styles.balance}>$3,814.25</h4>
                </div>
                <div className={styles.summary_box}>
                    <h5 className={styles.summary_title}>Expenses</h5>
                    <h4 className={styles.balance}>$1,700.50</h4>
                </div>
            </div>

            <div className={styles.summary}>
                <div className={styles.section} style={{ width: '55%' }}>
                    <Pots />
                    <Transactions />
                </div>
                <div className={styles.section} style={{ width: '45%' }}>
                    <RecurringBills />
                </div>
            </div>
        </PageContainer>
    )
}

export default Overview