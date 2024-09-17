import styles from './Pots.module.scss'

// Images
import Pot from '../../assets/images/icon-pot.svg'
import SummaryTitle from '../SummaryTitle/SummaryTitle'
import { useEffect, useState } from 'react'

interface Pots {
    POT_NAME: string,
    POT_TARGET: number
    POT_THEME: string,
    POT_TOTAL: number
}

interface Props {
    data: Pots[] | null
}

const Pots = ({ data }: Props) => {
    const [pots, setPots] = useState<Pots[] | null>(null)

    useEffect(() => {
        setPots(data)
    })

    return (
        <div className='summary_card'>

            <SummaryTitle title='Pots' redirect='See Details' />

            <div className={styles.infos}>
                <div className={styles.total_box}>
                    <div className={styles.img_box}>
                        <img src={Pot} alt="" />
                    </div>

                    <div className={styles.total_infos}>
                        <h5 className={styles.total_title}>Total Saved</h5>

                        {/* <h4 className={styles.total_balance}>${data?.POT_TOTAL.toFixed(2)}</h4> */}
                        <h4 className={styles.total_balance}>$5000.00</h4>
                    </div>
                </div>

                <div className={styles.details_container}>
                    <div className={styles.details_box}>
                        {data?.map((pot) => (
                            <div className={styles.detail} style={{ borderColor: `${pot.POT_THEME}` }}>
                                <div className={styles.detail_box}>
                                    <h6 className={styles.detail_title}>{pot.POT_NAME}</h6>

                                    <h5 className={styles.detail_balance}>${pot.POT_TOTAL.toFixed(2)}</h5>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* <div className={styles.details_box}>
                        <div className={styles.detail} style={{ borderColor: `${data?.POT_THEME}` }}>
                            <div className={styles.detail_box}>
                                <h6 className={styles.detail_title}>{data?.POT_NAME}</h6>

                                <h5 className={styles.detail_balance}>${data?.POT_TOTAL.toFixed(2)}</h5>
                            </div>
                        </div>

                        <div className={styles.detail} style={{ borderColor: `${data?.POT_THEME}` }}>
                            <div className={styles.detail_box}>
                                <h6 className={styles.detail_title}>{data?.POT_NAME}</h6>

                                <h5 className={styles.detail_balance}>${data?.POT_TOTAL.toFixed(2)}</h5>
                            </div>
                        </div>
                    </div>

                    <div className={styles.details_box}>
                        <div className={styles.detail} style={{ borderColor: `${data?.POT_THEME}` }}>
                            <div className={styles.detail_box}>
                                <h6 className={styles.detail_title}>{data?.POT_NAME}</h6>

                                <h5 className={styles.detail_balance}>${data?.POT_TOTAL.toFixed(2)}</h5>
                            </div>
                        </div>

                        <div className={styles.detail} style={{ borderColor: `${data?.POT_THEME}` }}>
                            <div className={styles.detail_box}>
                                <h6 className={styles.detail_title}>{data?.POT_NAME}</h6>

                                <h5 className={styles.detail_balance}>${data?.POT_TOTAL.toFixed(2)}</h5>
                            </div>
                        </div>
                    </div> */}
                </div>
            </div>
        </div>
    )
}

export default Pots