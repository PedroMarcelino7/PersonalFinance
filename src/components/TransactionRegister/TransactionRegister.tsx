import styles from './TransactionRegister.module.scss'

// Images
import ProfilePicture_1 from '../../assets/images/avatars/emma-richardson.jpg'

type Props = {
    name: string,
    balance: number,
    date: string
}

const TransactionRegister = ({ name, balance, date }: Props) => {
    const formatBalance = (balance: number): string => {
        return balance < 0
            ? `-$${Math.abs(balance)}`
            : `+$${Math.abs(balance)}`
    }

    return (
        <div className={styles.transaction}>
            <div className={styles.profile}>
                <img src={ProfilePicture_1} alt="" />
                <h2>{name}</h2>
            </div>

            <div className={styles.details}>
                <div className={styles.balance}>
                    <h3>{formatBalance(balance)}</h3>
                </div>

                <div className={styles.date}>
                    <h4>{date}</h4>
                </div>
            </div>
        </div>
    )
}

export default TransactionRegister