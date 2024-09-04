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
            </div>
        </div>
    )
}

export default Transactions