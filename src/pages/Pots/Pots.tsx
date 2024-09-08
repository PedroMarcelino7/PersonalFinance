import styles from './Pots.module.scss'

// Components
import PageContainer from '../../components/PageContainer/PageContainer'

// Images
import Options from '../../assets/images/icon-ellipsis.svg'

// Data
import data from '../../data'
import { useState } from 'react'
import PotModal from '../../components/PotModal/PotModal'

const Pots = () => {
    const [showDropdown, setShowDropdown] = useState<number | null>(null)
    const [showAddNewPotModal, setShowAddNewPotModal] = useState<boolean>(true)

    const getProgress = (total: number, target: number): number => {
        return (100 * total) / target
    }

    const handleShowDropdown = (index: number) => {
        setShowDropdown(showDropdown === index ? null : index)
    }

    return (
        <>
            <PageContainer title='Pots' button='Add New Pot'>
                <div className={styles.pots}>
                    {data.pots.map((pot, index) => (
                        <div className={styles.pot} key={index}>
                            <div className={styles.pot_header}>
                                <div className={styles.pot_name_box}>
                                    <div className={styles.circle} style={{ backgroundColor: `${pot.theme}` }}></div>
                                    <h1 className={styles.pot_name}>{pot.name}</h1>
                                </div>

                                <div className={styles.options}>
                                    <div className={styles.image_box} onClick={() => handleShowDropdown(index)}>
                                        <img src={Options} alt="" />
                                    </div>

                                    {showDropdown === index && (
                                        <div className={styles.dropdown}>
                                            <h6>Edit Pot</h6>
                                            <hr />
                                            <h6><span>Delete Pot</span></h6>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className={styles.total_container}>
                                <div className={styles.total_box}>
                                    <h3>Total Saved</h3>
                                    <h2>${pot.total.toFixed(2)}</h2>
                                </div>

                                <div className={styles.progress_box}>
                                    <div className={styles.progress_bar}>
                                        <div className={styles.progress}
                                            style={{
                                                width: `${getProgress(pot.total, pot.target).toFixed(1)}%`,
                                                backgroundColor: `${pot.theme}`
                                            }}></div>
                                    </div>

                                    <div className={styles.progress_count}>
                                        <h4>{getProgress(pot.total, pot.target).toFixed(1)}%</h4>
                                        <h5>Target of ${pot.target}</h5>
                                    </div>
                                </div>
                            </div>

                            <div className={styles.buttons_box}>
                                <button type='button' className={styles.button}>
                                    <span>+</span> Add Money
                                </button>

                                <button type='button' className={styles.button}>
                                    Withdraw
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {showAddNewPotModal && <PotModal />}
            </PageContainer>
        </>
    )
}

export default Pots
