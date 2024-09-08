import styles from './TransactionRegister.module.scss'

type Props = {
    name: string,
    amount: number,
    date: string,
    avatar: string
}

const TransactionRegister = ({ name, amount, date, avatar }: Props) => {
    const formatAmount = (amount: number): string => {
        return amount < 0
            ? `-$${Math.abs(amount).toFixed(2)}`
            : `+$${Math.abs(amount).toFixed(2)}`
    }

    return (
        <div className={styles.transaction}>
            <div className={styles.profile}>
                <img src={avatar} alt={name} />
                <h2>{name}</h2>
            </div>

            <div className={styles.details}>
                <div className={styles.amount} style={{ color: amount < 0 ? '#C94736' : '#277C78' }}>
                    <h3>{formatAmount(amount)}</h3>
                </div>

                <div className={styles.date}>
                    <h4>{date}</h4>
                </div>
            </div>
        </div>
    )
}

export default TransactionRegister