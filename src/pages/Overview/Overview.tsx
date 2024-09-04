import styles from './Overview.module.scss'

const Overview = () => {
    return (
        <div className={styles.overview}>
            <h1 className={styles.title}>Overview</h1>

            <div className={styles.summary_container}>
                <div className={`${styles.summary_box} ${styles.current}`}>
                    <h5 className={styles.summary_title}>Current Balance</h5>
                    <h4 className={styles.balance}>$4,836.00</h4>
                </div>
                <div className={styles.summary_box}>
                    <h5 className={styles.summary_title}>Income</h5>
                    <h4 className={styles.balance}>$3,814.25</h4>
                </div>
                <div className={styles.summary_box}>
                    <h5 className={styles.summary_title}>Expenses</h5>
                    <h4 className={styles.balance}>$1,700.50</h4>
                </div>
            </div>

            <div className={styles.summary}>
                
            </div>
        </div>
    )
}

export default Overview