import { CloseButton, ConfirmButton, FormContainer } from './styles'
import { usePots } from '../../../contexts/potsContext'
import { useModal } from '../modal'
import { useEffect } from 'react'
import { useThemes } from '../../../contexts/themesContext'

const DeletePot = ({ pot }) => {
    const { refreshPots } = usePots()
    const { refreshThemes } = useThemes()
    const { closeModal } = useModal()

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const response = await fetch('http://localhost:3000/pots/delete', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    pot_id: pot.pot_id,
                    theme_id: pot.theme_id
                })
            });

            const data = await response.json();
            console.log('>>> Resposta Pot Post [Delete Pots Modal]:', data);

        } catch (error) {
            console.error('Erro ao deletar o pot:', error);
        }

        refreshThemes()
        refreshPots()
        closeModal()
    }

    useEffect(() => {
        console.log(`
            Pot to DELETE
    
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
            <ConfirmButton>Yes, confirm deletion</ConfirmButton>
            <CloseButton onClick={() => closeModal()}>No, go back</CloseButton>
        </FormContainer>
    )
}

export default DeletePot