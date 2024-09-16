import styles from './Pots.module.scss'

// Components
import PageContainer from '../../components/PageContainer/PageContainer'
import AddNewPotModal from '../../components/PotModal/AddNewPot/AddNewPotModal'
import EditPotModal from '../../components/PotModal/EditPot/EditPotModal'
import DeletePotModal from '../../components/PotModal/DeletePot/DeletePotModal'

// Images
import Options from '../../assets/images/icon-ellipsis.svg'

// Data
import data from '../../data'
import { useState } from 'react'

interface Pot {
    name: string;
    target: number;
    total: number;
    theme: string;
}

const Pots = () => {
    const [showDropdown, setShowDropdown] = useState<number | null>(null)
    const [showAddNewPotModal, setShowAddNewPotModal] = useState<boolean>(false)
    const [showEditPotModal, setShowEditPotModal] = useState<boolean>(false)
    const [showDeletePotModal, setShowDeletePotModal] = useState<boolean>(false)
    const [potToEdit, setPotToEdit] = useState<Pot | null>(null)

    const getProgress = (total: number, target: number): number => {
        return (100 * total) / target
    }

    const handleShowDropdown = (index: number) => {
        setShowDropdown(showDropdown === index ? null : index)
    }

    const handleShowAddNewPotModal = () => {
        setShowDropdown(null)
        setShowAddNewPotModal(true)
    }

    const handleCloseAddNewPotModal = () => {
        setShowAddNewPotModal(false)
    }

    const handleShowEditPotModal = (pot: Pot) => {
        setPotToEdit(pot)
        setShowDropdown(null)
        setShowEditPotModal(true)
    }

    const handleCloseEditPotModal = () => {
        setShowEditPotModal(false)
    }

    const handleShowDeletePotModal = () => {
        setShowDropdown(null)
        setShowDeletePotModal(true)
    }

    const handleCloseDeletePotModal = () => {
        setShowDeletePotModal(false)
    }

    return (
        <>
            <PageContainer title='Pots' button='Add New Pot' onClick={handleShowAddNewPotModal}>
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
                                            <h6 onClick={() => handleShowEditPotModal(pot)}>Edit Pot</h6>
                                            <hr />
                                            <h6 onClick={handleShowDeletePotModal}><span>Delete Pot</span></h6>
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

                {showAddNewPotModal && <AddNewPotModal closeModal={handleCloseAddNewPotModal} />}
                {showEditPotModal && <EditPotModal closeModal={handleCloseEditPotModal} potToEdit={potToEdit} />}
                {showDeletePotModal && <DeletePotModal closeModal={handleCloseDeletePotModal} />}
            </PageContainer>
        </>
    )
}

export default Pots
