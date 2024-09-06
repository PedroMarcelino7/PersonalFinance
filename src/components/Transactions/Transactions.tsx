import styles from './Transactions.module.scss'

// Components
import SummaryTitle from '../SummaryTitle/SummaryTitle'
import TransactionRegister from '../TransactionRegister/TransactionRegister'

interface Transaction {
    amount: number,
    avatar: string,
    category: string,
    date: string,
    name: string,
    recurring: boolean
}

interface Props {
    data: Transaction[]
}

const Transactions = ({ data }: Props) => {
    return (
        <div className='summary_card'>
            <SummaryTitle title={'Transactions'} redirect={'View All'} />

            <div className={styles.transactions_box}>
                {
                    data.map((transaction, index) => (
                        <div>
                            <TransactionRegister key={index}
                                name={transaction.name}
                                amount={transaction.amount}
                                date={transaction.date.slice(0, 10)}
                                avatar={transaction.avatar}
                            />
                            {index < data.length - 1 && <div className={styles.divisor}></div>}
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default Transactions