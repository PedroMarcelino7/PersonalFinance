import SummaryTitle from '../SummaryTitle/SummaryTitle'
import styles from './RecurringBills.module.scss'

const RecurringBills = () => {
    return (
        <div className='summary_card'>
            <SummaryTitle title='Recurring Bills' redirect='See Details' />

            <div className={styles.bills_container}>
                <div className={styles.bill_box} style={{borderColor: '#277C78'}}>
                    <h3>Paid Bills</h3>

                    <h2>$190.00</h2>
                </div>
                <div className={styles.bill_box} style={{borderColor: '#F2CDAC'}}>
                    <h3>Total Upcoming</h3>

                    <h2>$194.98</h2>
                </div>
                <div className={styles.bill_box} style={{borderColor: '#82C9D7'}}>
                    <h3>Due Soon</h3>

                    <h2>$59.98</h2>
                </div>
            </div>
        </div>
    )
}

export default RecurringBills