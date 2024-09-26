import { useState } from 'react';
import styles from './AddNewPotModal.module.scss';

// Images
import Close from '../../../assets/images/icon-close-modal.svg';

interface NewPot {
    name: string,
    target: number,
    theme: string
}

interface Props {
    closeModal: () => void;
}

const AddNewPotModal = ({ closeModal }: Props) => {
    const [name, setName] = useState('');
    const [target, setTarget] = useState('');
    const [theme, setTheme] = useState('');

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const newPot = {
            name: name,
            target: parseFloat(target),
            theme: theme
        };

        addNewPot(newPot)

        closeModal();
    };

    const addNewPot = async (newPot: NewPot) => {
        console.log(newPot)

        try {
            const response = await fetch(`http://localhost:3001/post/pots`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: newPot.name,
                    target: newPot.target,
                    theme: newPot.theme
                }),
            })

            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }

            const result = await response.json();

            console.log('Success:', result);
        } catch (err: any) {
            console.log('Error:', err)
        }
    }

    return (
        <div className={styles.modal_container}>
            <div className={styles.modal_box}>
                <div className={styles.header}>
                    <h1>Add New Pot</h1>
                    <img onClick={closeModal} src={Close} alt="" />
                </div>

                <div className={styles.description}>
                    <p>
                        Create a pot to set savings targets. These can help keep you on
                        track as you save for special purchases.
                    </p>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className={styles.input_box}>
                        <label htmlFor="name">Pot Name</label>
                        <input
                            type="text"
                            name="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="e.g. Rainy Days"
                        />
                    </div>

                    <div className={styles.input_box}>
                        <label htmlFor="target">Target</label>
                        <input
                            type="text"
                            name="target"
                            value={target}
                            onChange={(e) => setTarget(e.target.value)}
                            placeholder="e.g. 2000"
                        />
                    </div>

                    <div className={styles.input_box}>
                        <label htmlFor="theme">Theme</label>
                        <select
                            name="theme"
                            value={theme}
                            onChange={(e) => setTheme(e.target.value)}
                        >
                            <option value="#277C78">Green</option>
                            <option value="#626070">Gray</option>
                            <option value="#F2CDAC">Beige</option>
                            <option value="#82C9D7">Blue</option>
                        </select>
                    </div>

                    <button type="submit">Add Pot</button>
                </form>
            </div>
        </div>
    );
};

export default AddNewPotModal;
