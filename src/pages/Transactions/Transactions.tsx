import styles from './Transactions.module.scss'

// Components
import PageContainer from '../../components/PageContainer/PageContainer'

// Images
import ProfilePicture from '../../assets/images/avatars/emma-richardson.jpg'
import PrevArrow from '../../assets/images/icon-caret-left.svg'
import NextArrow from '../../assets/images/icon-caret-right.svg'

const Transactions = () => {
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
                            <tr>
                                <td>
                                    <div className={styles.profile}>
                                        <img src={ProfilePicture} alt="" />
                                        <h2>Emma Richardson</h2>
                                    </div>
                                </td>
                                <td>General</td>
                                <td>19 Aug 2024</td>
                                <td>+$75.50</td>
                            </tr>
                            <tr>
                                <td>
                                    <div className={styles.profile}>
                                        <img src={ProfilePicture} alt="" />
                                        <h2>Emma Richardson</h2>
                                    </div>
                                </td>
                                <td>General</td>
                                <td>19 Aug 2024</td>
                                <td>+$75.50</td>
                            </tr>
                            <tr>
                                <td>
                                    <div className={styles.profile}>
                                        <img src={ProfilePicture} alt="" />
                                        <h2>Emma Richardson</h2>
                                    </div>
                                </td>
                                <td>General</td>
                                <td>19 Aug 2024</td>
                                <td>+$75.50</td>
                            </tr>
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