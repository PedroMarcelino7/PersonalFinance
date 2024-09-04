import styles from './Pots.module.scss'

// Images
import DetailsArrow from '../../assets/images/icon-caret-right.svg'
import Pot from '../../assets/images/icon-pot.svg'

const Pots = () => {
    return (
        <div className={styles.pots}>
            <div className={styles.pots_header}>
                <h2 className={styles.pots_header_title}>Pots</h2>

                <div className={styles.pots_details_box}>
                    <h3 className={styles.pots_details_title}>See Details</h3>
                    <img className={styles.pots_details_arrow} src={DetailsArrow} alt="" />
                </div>
            </div>

            <div className={styles.infos}>
                <div className={styles.total_box}>
                    <div className={styles.img_box}>
                        <img src={Pot} alt="" />
                    </div>

                    <div className={styles.total_infos}>
                        <h5 className={styles.total_title}>Total Saved</h5>

                        <h4 className={styles.total_balance}>$850</h4>
                    </div>
                </div>

                <div className={styles.details_container}>
                    <div className={styles.details_box}>
                        <div className={styles.detail}  style={{borderColor: '#277C78'}}>
                            <div className={styles.detail_box}>
                                <h6 className={styles.detail_title}>Savings</h6>

                                <h5 className={styles.detail_balance}>$159</h5>
                            </div>
                        </div>

                        <div className={styles.detail}  style={{borderColor: '#82C9D7'}}>
                            <div className={styles.detail_box}>
                                <h6 className={styles.detail_title}>Gift</h6>

                                <h5 className={styles.detail_balance}>$40</h5>
                            </div>
                        </div>
                    </div>

                    <div className={styles.details_box}>
                        <div className={styles.detail}  style={{borderColor: '#626070'}}>
                            <div className={styles.detail_box}>
                                <h6 className={styles.detail_title}>Concert Ticket</h6>

                                <h5 className={styles.detail_balance}>$110</h5>
                            </div>
                        </div>

                        <div className={styles.detail}  style={{borderColor: '#F2CDAC'}}>
                            <div className={styles.detail_box}>
                                <h6 className={styles.detail_title}>New Laptop</h6>

                                <h5 className={styles.detail_balance}>$10</h5>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Pots