import styles from './WithdrawModal.module.scss'

import { useEffect, useState } from 'react';

// Images
import Close from '../../../assets/images/icon-close-modal.svg'

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

const WithdrawModal = ({ closeModal, potToEdit }: Props) => {
    const [name, setName] = useState<string | undefined>(potToEdit?.POT_NAME)
    const [target, setTarget] = useState<number | undefined>(potToEdit?.POT_TARGET)
    const [theme, setTheme] = useState<string | undefined>(potToEdit?.POT_THEME)

    const getProgress = (total: number | undefined, target: number | undefined): number => {
        if (total !== undefined && target !== undefined) {
            return (100 * total) / target
        } else {
            return 0
        }
    }

    useEffect(() => {
        console.log('Withdraw:', potToEdit)
    }, [])

    const handleSubmit = async (id: number | undefined) => {
        console.log('Withdraw:', id)
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
                    <h1>Withdraw from '{potToEdit?.POT_NAME}'</h1>

                    <img onClick={closeModal} src={Close} alt="" />
                </div>

                <div className={styles.new_amount_box}>
                    <h3>New Amount</h3>

                    <h2>${potToEdit?.POT_TOTAL.toFixed(2)}</h2>
                </div>

                <div className={styles.progress_box}>
                    <div className={styles.progress_bar}>
                        <div className={styles.new_progress}
                            style={{
                                width: `5%`,
                                backgroundColor: `#201F24`
                            }}></div>

                        <div className={styles.old_progress}
                            style={{
                                width: `10%`,
                                backgroundColor: `#C94736`
                            }}></div>
                    </div>

                    <div className={styles.progress_count}>
                        <h4>{getProgress(potToEdit?.POT_TOTAL, potToEdit?.POT_TARGET).toFixed(2)}%</h4>
                        <h5>Target of ${potToEdit?.POT_TARGET.toFixed(2)}</h5>
                    </div>
                </div>

                <form onSubmit={(e) => {
                    e.preventDefault()
                    handleSubmit(potToEdit?.POT_ID)
                }}>
                    <div className={styles.input_box}>
                        <label htmlFor="">Amount to Withdraw</label>
                        <input type="text" value={target} onChange={(e) => setTarget(parseInt(e.target.value))} placeholder='e.g. 2000' />
                    </div>

                    <button type='submit'>Confirm Withdraw</button>
                </form>
            </div>
        </div>
    )
}

export default WithdrawModal