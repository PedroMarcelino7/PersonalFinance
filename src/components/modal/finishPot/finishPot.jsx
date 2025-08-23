import { ConfirmButton, FormContainer } from './styles'
import { usePots } from '../../../contexts/potsContext'
import { useModal } from '../modal'
import { useEffect } from 'react'
import { toast } from 'react-toastify'

const FinishPot = ({ pot }) => {
    const { refreshPots } = usePots()
    const { closeModal } = useModal()

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const response = await fetch('http://localhost:3000/pots/finish', {
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
                toast.error('Error finishing pot.');
                return;
            }

            const data = await response.json();
            toast.success('Pot finished successfully.');
            console.log('>>> Resposta Pot Post [Finish Pots Modal]:', data);

        } catch (error) {
            console.error('Erro ao finalizar o pot:', error);
            toast.error('Error finishing pot.');
        }

        refreshPots()
        closeModal()
    }

    useEffect(() => {
        console.log(`
            Pot to FINISH
    
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
            <ConfirmButton>Yes, confirm completion</ConfirmButton>
        </FormContainer>
    )
}

export default FinishPot