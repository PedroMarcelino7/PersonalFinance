import styles from './PotModal.module.scss'

// Images
import Close from '../../assets/images/icon-close-modal.svg'

const PotModal = () => {
    return (
        <div className={styles.modal_container}>
            <div className={styles.modal_box}>
                <div className={styles.header}>
                    <h1>Add New Pot</h1>

                    <img src={Close} alt="" />
                </div>

                <div className={styles.description}>
                    <p>Create a pot to set savings targets. These can help keep you on track as you save for special purchases.</p>
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

                    <button type='submit'>Add Pot</button>
                </form>
            </div>
        </div>
    )
}

export default PotModal