import styles from './Transactions.module.scss'

// Components
import PageContainer from '../../components/PageContainer/PageContainer'

// Images
import PrevArrow from '../../assets/images/icon-caret-left.svg'
import NextArrow from '../../assets/images/icon-caret-right.svg'

// Data
import data from '../../data.ts'

const Transactions = () => {
    const formatAmount = (amount: number): string => {
        return amount < 0
            ? `-$${Math.abs(amount).toFixed(2)}`
            : `+$${Math.abs(amount).toFixed(2)}`
    }

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
                            {
                                data.transactions.map((transaction, index) => (
                                    <tr key={index}>
                                        <td>
                                            <div className={styles.profile}>
                                                <img src={transaction.avatar} alt={transaction.name} />
                                                <h2>{transaction.name}</h2>
                                            </div>
                                        </td>
                                        <td>{transaction.category}</td>
                                        <td>{transaction.date.slice(0, 10)}</td>
                                        <td>{formatAmount(transaction.amount)}</td>
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
                        <button>1</button>
                        <button className={styles.selected}>2</button>
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