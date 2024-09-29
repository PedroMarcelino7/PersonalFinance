import styles from './DeletePotModal.module.scss'

// Images
import Close from '../../../assets/images/icon-close-modal.svg'

interface Props {
    closeModal: () => void,
    potToDelete: Pot | null
}

interface Pot {
    POT_ID: number;
    POT_NAME: string;
    POT_TARGET: number;
    POT_THEME: string;
    POT_TOTAL: number;
}

const DeletePotModal = ({ closeModal, potToDelete }: Props) => {

    const deletePot = async (id: number | undefined) => {
        console.log('Id to delete:', id)
        try {
            const response = await fetch(`http://localhost:3001/delete/pots`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id
                })
            })

            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }

            const result = await response.json();
            console.log(result)

            console.log('Delete Pot:', result);
        } catch (err: any) {
            console.log('Error', err)
        }
    }

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

                <form onSubmit={(e) => {
                    e.preventDefault()
                    deletePot(potToDelete?.POT_ID)
                }}>
                    <button type='submit' style={{ backgroundColor: '#C94736' }}>Yes, Confirm Deletion</button>
                    <button type='button' style={{ backgroundColor: 'transparent', color: '#686868' }} onClick={closeModal}>No, Go Back</button>
                </form>
            </div>
        </div>
    )
}

export default DeletePotModal