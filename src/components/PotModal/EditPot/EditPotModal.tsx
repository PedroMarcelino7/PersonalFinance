import styles from './EditPotModal.module.scss'

// Images
import Close from '../../../assets/images/icon-close-modal.svg'
import { useEffect, useState } from 'react';

interface Props {
    closeModal: () => void,
    potToEdit: Pot | null
}

interface Pot {
    POT_ID: number;
    POT_NAME: string;
    POT_TARGET: number;
    POT_THEME: string;
    POT_TOTAL: number;
}

const EditPotModal = ({ closeModal, potToEdit }: Props) => {
    const [name, setName] = useState<string | undefined>(potToEdit?.POT_NAME)
    const [target, setTarget] = useState<number | undefined>(potToEdit?.POT_TARGET)
    const [theme, setTheme] = useState<string | undefined>(potToEdit?.POT_THEME)

    const handleSubmit = async (id: number | undefined) => {
        console.log('Id to update:', id)
        try {
            const response = await fetch(`http://localhost:3001/update/pots`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id,
                    name,
                    target,
                    theme
                })
            })

            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }

            const result = await response.json();
            console.log(result)

            console.log('Updated Pot:', result);
        } catch (err: any) {
            console.log('Error', err)
        }
    }

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

                <form onSubmit={(e) => {
                    e.preventDefault()
                    handleSubmit(potToEdit?.POT_ID)
                }}>
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
                        <select
                            value={theme}
                            onChange={(e) => setTheme(e.target.value)}
                        >
                            <option value={potToEdit?.POT_THEME}>Actual Theme</option>
                            <option value={'#ff0000'}>Red</option>
                            <option value={'#00ff00'}>Green</option>
                            <option value={'#0000ff'}>Blue</option>
                        </select>
                    </div>


                    <button type='submit'>Save Changes</button>
                </form>
            </div>
        </div>
    )
}

export default EditPotModal