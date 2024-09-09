import styles from './EditPotModal.module.scss'

// Images
import Close from '../../../assets/images/icon-close-modal.svg'

interface Props {
    closeModal: () => void
}

const EditPotModal = ({ closeModal }: Props) => {
    return (
        <div className={styles.modal_container}>
            <div className={styles.modal_box}>
                <div className={styles.header}>
                    <h1>Edit Pot</h1>

                    <img onClick={closeModal} src={Close} alt="" />
                </div>

                <div className={styles.description}>
                    <p>If your saving targets change, feel free to update your pots.</p>
                </div>

                <form action="">
                    <div className={styles.input_box}>
                        <label htmlFor="">Pot Name</label>
                        <input type="text" placeholder='e.g. Rainy Days' />
                        <span>30 characters left.</span>
                    </div>

                    <div className={styles.input_box}>
                        <label htmlFor="">Target</label>
                        <input type="text" placeholder='e.g. 2000' />
                    </div>

                    <div className={styles.input_box}>
                        <label htmlFor="">Theme</label>
                        <select name="" id="">
                            <option value="">
                                <div className={styles.color}></div>
                                Green
                            </option>
                        </select>
                    </div>

                    <button type='submit'>Save Changes</button>
                </form>
            </div>
        </div>
    )
}

export default EditPotModal