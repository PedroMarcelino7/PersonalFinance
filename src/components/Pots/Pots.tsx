import styles from './Pots.module.scss'

import { useEffect, useState } from 'react'

// Images
import Pot from '../../assets/images/icon-pot.svg'
import SummaryTitle from '../SummaryTitle/SummaryTitle'

interface Pot {
    name: string,
    target: number,
    theme: string,
    total: number
}

interface Props {
    data: Pot[]
}

const Pots = ({ data }: Props) => {
    const [total, setTotal] = useState<number>(0)

    const getTotal = () => {
        let total = 0

        data.forEach((pot) => {
            total = total + pot.total
        })

        setTotal(total)
    }

    useEffect(() => {
        getTotal()
    }, [])

    return (
        <div className='summary_card'>

            <SummaryTitle title={'Pots'} redirect={'See Details'} />

            <div className={styles.infos}>
                <div className={styles.total_box}>
                    <div className={styles.img_box}>
                        <img src={Pot} alt="" />
                    </div>

                    <div className={styles.total_infos}>
                        <h5 className={styles.total_title}>Total Saved</h5>

                        <h4 className={styles.total_balance}>${total.toFixed(2)}</h4>
                    </div>
                </div>

                <div className={styles.details_container}>
                    <div className={styles.details_box}>
                        <div className={styles.detail} style={{ borderColor: `${data[0].theme}` }}>
                            <div className={styles.detail_box}>
                                <h6 className={styles.detail_title}>{data[0].name}</h6>

                                <h5 className={styles.detail_balance}>${data[0].total.toFixed(2)}</h5>
                            </div>
                        </div>

                        <div className={styles.detail} style={{ borderColor: `${data[1].theme}` }}>
                            <div className={styles.detail_box}>
                                <h6 className={styles.detail_title}>{data[1].name}</h6>

                                <h5 className={styles.detail_balance}>${data[1].total.toFixed(2)}</h5>
                            </div>
                        </div>
                    </div>

                    <div className={styles.details_box}>
                        <div className={styles.detail} style={{ borderColor: `${data[2].theme}` }}>
                            <div className={styles.detail_box}>
                                <h6 className={styles.detail_title}>{data[2].name}</h6>

                                <h5 className={styles.detail_balance}>${data[2].total.toFixed(2)}</h5>
                            </div>
                        </div>

                        <div className={styles.detail} style={{ borderColor: `${data[3].theme}` }}>
                            <div className={styles.detail_box}>
                                <h6 className={styles.detail_title}>{data[3].name}</h6>

                                <h5 className={styles.detail_balance}>${data[3].total.toFixed(2)}</h5>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Pots