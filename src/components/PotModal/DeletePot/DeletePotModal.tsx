import styles from './DeletePotModal.module.scss'

// Images
import Close from '../../../assets/images/icon-close-modal.svg'

interface Props {
    closeModal: () => void
}

const DeletePotModal = ({ closeModal }: Props) => {
    return (
        <div className={styles.modal_container}>
            <div className={styles.modal_box}>
                <div className={styles.header}>
                    <h1>Delete ‘Savings’?</h1>

                    <img onClick={closeModal} src={Close} alt="" />
                </div>

                <div className={styles.description}>
                    <p>Are you sure you want to delete this pot? This action cannot be reversed, and all the data inside it will be removed forever.</p>
                </div>

                <form action="">
                    <button type='submit' style={{ backgroundColor: '#C94736' }}>Yes, Confirm Deletion</button>
                    <button type='button' style={{ backgroundColor: 'transparent', color: '#686868' }} onClick={closeModal}>No, Go Back</button>
                </form>
            </div>
        </div>
    )
}

export default DeletePotModal