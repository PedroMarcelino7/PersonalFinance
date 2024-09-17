import styles from './Overview.module.scss'

import { useEffect, useState } from 'react'

// Components
import Pots from '../../components/Pots/Pots'
import Transactions from '../../components/Transactions/Transactions'
import RecurringBills from '../../components/RecurringBills/RecurringBills'
import PageContainer from '../../components/PageContainer/PageContainer'

interface Balance {
    BAL_CURRENT: number,
    BAL_EXPENSES: number,
    BAL_INCOME: number
}

const Overview = () => {
    const [balance, setBalance] = useState<Balance | null>(null)

    const getData = async () => {
        try {
            const response = await fetch(`http://localhost:3001/get/balance`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            })

            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }

            const result = await response.json();
            console.log(result)
            setBalance(result[0])

            console.log('Get Activities:', result);
        } catch (err: any) {
            console.log('Error', err)
        }
    }

    useEffect(() => {
        getData()
    }, [])

    return (
        <PageContainer title='Overview'>
            <div className={styles.summary_container}>
                <div className={`${styles.summary_box} ${styles.current}`}>
                    <h5 className={styles.summary_title}>Current Balance</h5>
                    <h4 className={styles.balance}>${balance?.BAL_CURRENT.toFixed(2)}</h4>
                </div>
                <div className={styles.summary_box}>
                    <h5 className={styles.summary_title}>Income</h5>
                    <h4 className={styles.balance}>${balance?.BAL_INCOME.toFixed(2)}</h4>
                </div>
                <div className={styles.summary_box}>
                    <h5 className={styles.summary_title}>Expenses</h5>
                    <h4 className={styles.balance}>${balance?.BAL_EXPENSES.toFixed(2)}</h4>
                </div>
            </div>

            <div className={styles.summary}>
                <div className={styles.section} style={{ width: '55%' }}>
                    {/* <Pots data={data.pots} /> */}
                    {/* <Transactions data={data.transactions} /> */}
                </div>
                <div className={styles.section} style={{ width: '45%' }}>
                    <RecurringBills />
                </div>
            </div>
        </PageContainer>
    )
}

export default Overview