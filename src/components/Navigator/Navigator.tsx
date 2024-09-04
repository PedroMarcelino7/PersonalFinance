import styles from './Navigator.module.scss'

// Images
import Logo from '../../assets/images/logo-large.svg'
import Minimize from '../../assets/images/icon-minimize-menu.svg'
import Overview from '../../assets/images/icon-nav-overview.svg'
import Transactions from '../../assets/images/icon-nav-transactions.svg'
import Budgets from '../../assets/images/icon-nav-budgets.svg'
import Pots from '../../assets/images/icon-nav-pots.svg'
import RecurringBills from '../../assets/images/icon-nav-recurring-bills.svg'

const Navigator = () => {
    return (
        <nav className={styles.navbar}>
            <div className={styles.logo_box}>
                <img src={Logo} alt='[Logo] finance.' />
            </div>

            <div className={styles.navigation_buttons_box}>
                <div className={`${styles.navigation_button} ${styles.selected}`}>
                    <img src={Overview} alt="" />
                    <h3>Overview</h3>
                </div>
                <div className={styles.navigation_button}>
                    <img src={Transactions} alt="" />
                    <h3>Transactions</h3>
                </div>
                <div className={styles.navigation_button}>
                    <img src={Budgets} alt="" />
                    <h3>Budgets</h3>
                </div>
                <div className={styles.navigation_button}>
                    <img src={Pots} alt="" />
                    <h3>Pots</h3>
                </div>
                <div className={styles.navigation_button}>
                    <img src={RecurringBills} alt="" />
                    <h3>Recurring Bills</h3>
                </div>
            </div>

            <div className={styles.navigation_footer_box}>
                <img src={Minimize} alt="Minimize menu button." />
                <h2>Minimize Menu</h2>
            </div>
        </nav>
    )
}

export default Navigator