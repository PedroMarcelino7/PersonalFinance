import React, { useState } from 'react'
import DefaultInput from '../../input/defaultInput/defaultInput'
import { CloseButton, ConfirmButton, FormContainer } from './styles'
import ThemeSelect from '../../../ui/select/themeSelect/themeSelect'
import { usePots } from '../../../contexts/potsContext'
import { useModal } from '../modal'

const DeletePot = ({ pot }) => {
    const { refreshPots } = usePots()
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
                    pot_id: pot.pot_id
                })
            });

            const data = await response.json();
            console.log('>>> Resposta Pot Post [Delete Pots Modal]:', data);

            refreshPots()
        } catch (error) {
            console.error('Erro ao deletar o pot:', error);
        }

        closeModal()
    }

    return (
        <FormContainer onSubmit={(e) => handleSubmit(e)}>
            <ConfirmButton>Yes, confirm deletion</ConfirmButton>
            <CloseButton onClick={() => closeModal()}>No, go back</CloseButton>
        </FormContainer>
    )
}

export default DeletePot