import styles from './Transactions.module.scss'

// Components
import SummaryTitle from '../SummaryTitle/SummaryTitle'
import TransactionRegister from '../TransactionRegister/TransactionRegister'

const Transactions = () => {
    return (
        <div className='summary_card'>
            <SummaryTitle title={'Transactions'} redirect={'View All'} />

            <div className={styles.transactions_box}>
                <TransactionRegister name={'Emma Richardson'} balance={75.50} date={'19 Aug 2024'} />

                <div className={styles.divisor}></div>

                <TransactionRegister name={'Savory Bites Bistro'} balance={-55.50} date={'19 Aug 2024'} />

                <div className={styles.divisor}></div>

                <TransactionRegister name={'Daniel Carter'} balance={-42.30} date={'18 Aug 2024'} />

                <div className={styles.divisor}></div>

                <TransactionRegister name={'Sun Park'} balance={120.00} date={'17 Aug 2024'} />

                <div className={styles.divisor}></div>

                <TransactionRegister name={'Urban Services Hub'} balance={-65.00} date={'17 Aug 2024'} />
            </div>
        </div>
    )
}

export default Transactions