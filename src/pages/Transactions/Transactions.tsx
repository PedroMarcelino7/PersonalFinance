import styles from './Transactions.module.scss'

// Components
import PageContainer from '../../components/PageContainer/PageContainer'

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
            </div>
        </PageContainer>
    )
}

export default Transactions