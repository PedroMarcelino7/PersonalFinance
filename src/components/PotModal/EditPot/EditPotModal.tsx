import styles from './EditPotModal.module.scss'

// Images
import Close from '../../../assets/images/icon-close-modal.svg'
import { useState } from 'react';

interface Pot {
    name: string;
    target: number;
    total: number;
    theme: string;
}

interface Props {
    closeModal: () => void,
    potToEdit: Pot | null
}

const EditPotModal = ({ closeModal, potToEdit }: Props) => {
    const [name, setName] = useState<string | undefined>(potToEdit?.name)
    const [target, setTarget] = useState<number | undefined>(potToEdit?.target)
    // const [theme, setTheme] = useState<string | undefined>(potToEdit?.theme)

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
                        <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder='e.g. Rainy Days' />
                        <span>30 characters left.</span>
                    </div>

                    <div className={styles.input_box}>
                        <label htmlFor="">Target</label>
                        <input type="text" value={target} onChange={(e) => setTarget(parseInt(e.target.value))} placeholder='e.g. 2000' />
                    </div>

                    <div className={styles.input_box}>
                        <label htmlFor="">Theme</label>
                        <select name="" id="">
                            <option value={'#277C78'}>Green</option>
                        </select>
                    </div>

                    <button type='submit'>Save Changes</button>
                </form>
            </div>
        </div>
    )
}

export default EditPotModal