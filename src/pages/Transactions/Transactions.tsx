import styles from './Transactions.module.scss'

import { useEffect, useState } from 'react'

// Components
import PageContainer from '../../components/PageContainer/PageContainer'

// Images
import PrevArrow from '../../assets/images/icon-caret-left.svg'
import NextArrow from '../../assets/images/icon-caret-right.svg'

interface Transaction {
    TRA_AMOUNT: number,
    TRA_AVATAR: string,
    TRA_CATEGORY: string,
    TRA_DATE: string,
    TRA_NAME: string,
    TRA_RECURRING: boolean
}

const Transactions = () => {
    const [transactions, setTransactions] = useState<Transaction[] | null>(null)

    const formatDate = (date: string): string => {
        let day = date.slice(8, 10)
        let month = date.slice(5, 7)
        let year = date.slice(0, 4)

        switch (month) {
            case '01':
                month = 'Jan'
                break;
            case '02':
                month = 'Feb'
                break;
            case '03':
                month = 'Mar'
                break;
            case '04':
                month = 'Apr'
                break;
            case '05':
                month = 'May'
                break;
            case '06':
                month = 'Jun'
                break;
            case '07':
                month = 'Jul'
                break;
            case '08':
                month = 'Aug'
                break;
            case '09':
                month = 'Sep'
                break;
            case '10':
                month = 'Oct'
                break;
            case '11':
                month = 'Nov'
                break;
            case '12':
                month = 'Dec'
                break;
            default:
                break;
        }

        return `${day} ${month} ${year}`
    }

    const formatAmount = (amount: number): string => {
        return amount < 0
            ? `-$${Math.abs(amount).toFixed(2)}`
            : `+$${Math.abs(amount).toFixed(2)}`
    }

    const getTransactions = async () => {
        try {
            const response = await fetch(`http://localhost:3001/get/transactions?limit=8&offset=0`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }

            const result = await response.json();
            console.log(result);
            setTransactions(result);
        } catch (err: any) {
            console.log('Error', err);
        }
    };

    useEffect(() => {
        getTransactions();
    }, []);


    return (
        <PageContainer title='Transactions'>
            <div className={styles.transactions_container}>
                <div className={styles.navbar}>
                    <div className={styles.search_box}>
                        <input type="text" placeholder='Search transaction' />
                    </div>

                    <div className={styles.filters}>
                        <div className={styles.filter}>
                            <h3>Sort by</h3>

                            <select name="" id="">
                                <option value="">Latest</option>
                            </select>
                        </div>

                        <div className={styles.filter}>
                            <h3>Category</h3>

                            <select name="" id="">
                                <option value="">All Transactions</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div className={styles.table_box}>
                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <th>Recipient / Sender</th>
                                <th>Category</th>
                                <th>Transaction Date</th>
                                <th>Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            {transactions &&
                                transactions.map((transaction, index) => (
                                    <tr key={index}>
                                        <td>
                                            <div className={styles.profile}>
                                                <img src={transaction.TRA_AVATAR} alt={transaction.TRA_NAME} />
                                                <h2>{transaction.TRA_NAME}</h2>
                                            </div>
                                        </td>
                                        <td>{transaction.TRA_CATEGORY}</td>
                                        <td>{formatDate(transaction.TRA_DATE)}</td>
                                        <td
                                            style={{
                                                color: transaction.TRA_AMOUNT < 0 ? '#C94736' : '#277C78',
                                                fontWeight: 600
                                            }}
                                        >
                                            {formatAmount(transaction.TRA_AMOUNT)}
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>

                <div className={styles.pagination}>
                    <div className={styles.button}>
                        <img src={PrevArrow} alt="" />
                        <h3>Prev</h3>
                    </div>

                    <div className={styles.pages}>
                        <button className={styles.selected}>1</button>
                        <button>2</button>
                        <button>3</button>
                        <button>4</button>
                        <button>5</button>
                    </div>

                    <div className={styles.button}>
                        <h3>Next</h3>
                        <img src={NextArrow} alt="" />
                    </div>
                </div>
            </div>
        </PageContainer>
    )
}

export default Transactions