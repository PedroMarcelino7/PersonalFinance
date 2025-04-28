import React, { useState } from 'react'
import DefaultInput from '../../input/defaultInput/defaultInput'
import { Button, FormContainer } from './styles'
import ThemeSelect from '../../../ui/select/themeSelect/themeSelect'
import { usePots } from '../../../contexts/potsContext'
import { useModal } from '../modal'

const EditPot = ({ pot }) => {
    const { refreshPots } = usePots()
    const { closeModal } = useModal()

    const themes = [
        { name: 'Green', color: '#2A7D72' },
        { name: 'Red', color: '#C0392B' },
        { name: 'Blue', color: '#2980B9' },
    ]

    const [name, setName] = useState(pot.pot_name)
    const [target, setTarget] = useState(pot.pot_target)
    const [theme, setTheme] = useState(pot.pot_theme)

    const handleSubmit = async (e) => {
        e.preventDefault()

        console.log('Pot name:', name)
        console.log('Target:', target)
        console.log('Theme:', theme.color)

        try {
            const response = await fetch('http://localhost:3000/pots/edit', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    pot_name: name,
                    pot_theme: theme.color,
                    pot_target: target,
                    pot_id: pot.pot_id
                })
            });

            const data = await response.json();
            console.log('>>> Resposta Pot Post [Edit Pots Modal]:', data);

            refreshPots()
        } catch (error) {
            console.error('Erro ao editar o pot:', error);
        }

        closeModal()
    }

    return (
        <FormContainer onSubmit={(e) => handleSubmit(e)}>
            <DefaultInput label={'Pot Name'} value={name} setValue={setName} />

            <DefaultInput label={'Target'} value={target} setValue={setTarget} placeholder={'$'} />

            <ThemeSelect label={'Theme'} setTheme={setTheme} data={themes} />

            <Button>Edit Pot</Button>
        </FormContainer>
    )
}

export default EditPot