import styles from './Transactions.module.scss'

// Components
import SummaryTitle from '../SummaryTitle/SummaryTitle'

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

    return (
        <div className='summary_card'>
            <SummaryTitle title='Transactions' redirect='View All' />

            <div className={styles.transactions_box}>
                {
                    data.map((transaction, index) => (
                        <div key={index}>
                            <div className={styles.transaction}>
                                <div className={styles.profile}>
                                    <img src={transaction.avatar} alt={transaction.name} />
                                    <h2>{transaction.name}</h2>
                                </div>

                                <div className={styles.details}>
                                    <div className={styles.amount} style={{ color: transaction.amount < 0 ? '#C94736' : '#277C78' }}>
                                        <h3>{formatAmount(transaction.amount)}</h3>
                                    </div>

                                    <div className={styles.date}>
                                        <h4>{formatDate(transaction.date)}</h4>
                                    </div>
                                </div>
                            </div>

                            {index < data.length - 1 && <div className={styles.divisor}></div>}
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default Transactions