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

    return (
        <div className='summary_card'>
            <SummaryTitle title='Transactions' redirect='View All' />

            <div className={styles.transactions_box}>
                {
                    data.map((transaction, index) => (
                        <div key={index}>
                            <TransactionRegister
                                name={transaction.name}
                                amount={transaction.amount}
                                date={formatDate(transaction.date)}
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