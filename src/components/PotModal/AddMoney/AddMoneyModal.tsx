import styles from './AddMoneyModal.module.scss'

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

const AddMoneyModal = ({ closeModal, potToEdit }: Props) => {
    const [add, setAdd] = useState<number>(0)
    const [newTotal, setNewTotal] = useState<number | undefined>(potToEdit?.POT_TOTAL)

    const getProgress = (): number => {
        const amountToAdd = getAddProgress()

        if (potToEdit?.POT_TOTAL !== undefined && potToEdit?.POT_TARGET !== undefined) {
            return ((100 * potToEdit?.POT_TOTAL) / potToEdit?.POT_TARGET) + amountToAdd
        } else {
            return 0
        }
    }
    
    const getProgressWidth = (): number => {
        if (potToEdit?.POT_TOTAL !== undefined && potToEdit?.POT_TARGET !== undefined) {
            return ((100 * potToEdit?.POT_TOTAL) / potToEdit?.POT_TARGET)
        } else {
            return 0
        }
    }

    const getAddProgress = () => {
        if (potToEdit?.POT_TARGET !== undefined) {
            return (100 * add) / potToEdit.POT_TARGET
        } else {
            return 0
        }
    }

    const handleSetAdd = (add: number) => {
        let newTotalHandler = potToEdit?.POT_TOTAL

        console.log(newTotalHandler !== undefined && newTotal !== undefined && setNewTotal(newTotalHandler + add))
        setAdd(add)
    }

    useEffect(() => {
        console.log('newTotal:', newTotal)
    }, [newTotal])

    const handleSubmit = async () => {
        try {
            const response = await fetch(`http://localhost:3001/add/pots`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id: potToEdit?.POT_ID,
                    total: newTotal
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
                    <h1>Add to '{potToEdit?.POT_NAME}'</h1>

                    <img onClick={closeModal} src={Close} alt="" />
                </div>

                <div className={styles.new_amount_box}>
                    <h3>New Amount</h3>

                    <h2>${potToEdit?.POT_TOTAL.toFixed(2)}</h2>
                </div>

                <div className={styles.progress_box}>
                    <div className={styles.progress_bar}>
                        <div className={styles.old_progress}
                            style={{
                                width: `${getProgressWidth().toFixed(2)}%`,
                                backgroundColor: `#201F24`
                            }}></div>

                        {add !== 0 &&
                            <div className={styles.new_progress}
                                style={{
                                    width: `calc(${getAddProgress().toFixed(2)}% + 2px)`,
                                    marginLeft: `calc(${getProgressWidth().toFixed(2)}% + 2px)`,
                                    backgroundColor: `#277C78`
                                }}></div>
                        }
                    </div>

                    <div className={styles.progress_count}>
                        <h4>{getProgress().toFixed(2)}%</h4>
                        <h5>Target of ${potToEdit?.POT_TARGET.toFixed(2)}</h5>
                    </div>
                </div>

                <form onSubmit={(e) => {
                    e.preventDefault()
                    handleSubmit()
                }}>
                    <div className={styles.input_box}>
                        <label htmlFor="">Amount to Add</label>
                        <input
                            type="number"
                            value={add}
                            onChange={(e) => handleSetAdd(parseInt(e.target.value) || 0)}
                            placeholder='e.g. 1000'
                        />
                    </div>

                    <button type='submit'>Confirm Addition</button>
                </form>
            </div>
        </div>
    )
}

export default AddMoneyModal