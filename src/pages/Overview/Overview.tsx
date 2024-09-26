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

interface Budget {
    BUD_CATEGORY: string,
    BUD_MAXIMUM: number,
    BUD_THEME: string
}

interface Pot {
    POT_ID: number,
    POT_NAME: string,
    POT_TARGET: number
    POT_THEME: string,
    POT_TOTAL: number
}

interface Transaction {
    TRA_AMOUNT: number,
    TRA_AVATAR: string,
    TRA_CATEGORY: string,
    TRA_DATE: string,
    TRA_NAME: string,
    TRA_RECURRING: boolean
}

const Overview = () => {
    const [balance, setBalance] = useState<Balance | null>(null)
    const [budgets, setBudgets] = useState<Budget | null>(null)
    const [pots, setPots] = useState<Pot[] | null>(null)
    const [transactions, setTransactions] = useState<Transaction | null>(null)

    const getBalance = async () => {
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

            console.log('Get Balance:', result);
        } catch (err: any) {
            console.log('Error', err)
        }
    }

    const getBudgets = async () => {
        try {
            const response = await fetch(`http://localhost:3001/get/budgets`, {
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
            setBudgets(result)

            console.log('Get Budgets:', result);
        } catch (err: any) {
            console.log('Error', err)
        }
    }

    const getPots = async () => {
        try {
            const response = await fetch(`http://localhost:3001/get/pots`, {
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
            setPots(result)

            console.log('Get Pots:', result);
        } catch (err: any) {
            console.log('Error', err)
        }
    }

    const getTransactions = async () => {
        try {
            const response = await fetch(`http://localhost:3001/get/transactions`, {
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
            setTransactions(result)

            console.log('Get Transactions:', result);
        } catch (err: any) {
            console.log('Error', err)
        }
    }

    useEffect(() => {
        getBalance()
        getBudgets()
        getPots()
        getTransactions()
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
                    <Pots data={pots} />
                    {/* <Transactions data={transactions} /> */}
                </div>
                <div className={styles.section} style={{ width: '45%' }}>
                    <RecurringBills />
                </div>
            </div>
        </PageContainer>
    )
}

export default Overview