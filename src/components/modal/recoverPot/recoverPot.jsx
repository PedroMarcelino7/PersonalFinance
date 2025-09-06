import { ConfirmButton, FormContainer } from './styles'
import { usePots } from '../../../contexts/potsContext'
import { useTransactions } from '../../../contexts/transactionsContext'
import { useModal } from '../modal'
import { useEffect } from 'react'
import { toast } from 'react-toastify'

const RecoverPot = ({ pot }) => {
    const { refreshPots } = usePots()
    const { refreshTransactions } = useTransactions()
    const { closeModal } = useModal()

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const response = await fetch('http://localhost:3000/pots/recover', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    pot_id: pot.pot_id,
                    transaction_amount: pot.pot_quantity
                })
            });

            if (!response.ok) {
                console.error('Erro do servidor:', data);
                toast.error('Error recovering pot.');
                return;
            }

            const data = await response.json();
            toast.success('Pot recovered successfully.');
            console.log('>>> Resposta Pot Post [Recover Pots Modal]:', data);

        } catch (error) {
            console.error('Erro ao recuperar o pot:', error);
            toast.error('Error recovering pot.');
        }

        refreshPots()
        refreshTransactions()
        closeModal()
    }

    useEffect(() => {
        console.log(`
            Pot to RECOVER
    
            ID: ${pot.pot_id}
            Name: ${pot.pot_name}
            Target: ${pot.pot_target}
            Link: ${pot.pot_link}
            Data: ${pot.pot_date}
            Theme: ${pot.theme_id}
        `)

        console.log(pot)
    }, [])

    return (
        <FormContainer onSubmit={(e) => handleSubmit(e)}>
            <ConfirmButton>Yes, confirm recovery</ConfirmButton>
        </FormContainer>
    )
}

export default RecoverPot