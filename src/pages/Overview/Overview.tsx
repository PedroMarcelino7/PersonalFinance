import styles from './Overview.module.scss'

import { useEffect } from 'react'

// Components
import Pots from '../../components/Pots/Pots'
import Transactions from '../../components/Transactions/Transactions'
import RecurringBills from '../../components/RecurringBills/RecurringBills'
import PageContainer from '../../components/PageContainer/PageContainer'

// Data
import data from '../../data'

const Overview = () => {
    useEffect(() => {
        console.log(data)
    }, [])

    return (
        <PageContainer title='Overview'>
            <div className={styles.summary_container}>
                <div className={`${styles.summary_box} ${styles.current}`}>
                    <h5 className={styles.summary_title}>Current Balance</h5>
                    <h4 className={styles.balance}>${data.balance.current.toFixed(2)}</h4>
                </div>
                <div className={styles.summary_box}>
                    <h5 className={styles.summary_title}>Income</h5>
                    <h4 className={styles.balance}>${data.balance.income.toFixed(2)}</h4>
                </div>
                <div className={styles.summary_box}>
                    <h5 className={styles.summary_title}>Expenses</h5>
                    <h4 className={styles.balance}>${data.balance.expenses.toFixed(2)}</h4>
                </div>
            </div>

            <div className={styles.summary}>
                <div className={styles.section} style={{ width: '55%' }}>
                    <Pots data={data.pots} />
                    <Transactions data={data.transactions} />
                </div>
                <div className={styles.section} style={{ width: '45%' }}>
                    <RecurringBills />
                </div>
            </div>
        </PageContainer>
    )
}

export default Overview