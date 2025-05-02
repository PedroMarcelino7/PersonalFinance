import React, { useState } from 'react'
import DefaultInput from '../../input/defaultInput/defaultInput'
import { Button, FormContainer } from './styles'
import ThemeSelect from '../../../ui/select/themeSelect/themeSelect'
import { useModal } from '../modal'
import DefaultSelect from '../../../ui/select/defaultSelect/defaultSelect'

const AddNewBudget = () => {
    const { closeModal } = useModal()

    const themes = [
        { name: 'Green', color: '#2A7D72' },
        { name: 'Red', color: '#C0392B' },
        { name: 'Blue', color: '#2980B9' },
    ]

    const [theme, setTheme] = useState(themes[0])

    const handleSubmit = async (e) => {
        e.preventDefault()

        console.log('Theme:', theme.color)

        try {
            const response = await fetch('http://localhost:3000/pots/post', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    pot_target: target
                })
            });

            const data = await response.json();
            console.log('>>> Resposta Pot Post [Add Pots Modal]:', data);

            refreshPots()
        } catch (error) {
            console.error('Erro ao criar o pot:', error);
        }

        closeModal()
    }

    return (
        <FormContainer onSubmit={(e) => handleSubmit(e)}>
            <DefaultSelect label={'Theme'} setTheme={setTheme} data={themes} />

            {/* <DefaultInput label={'Target'} setValue={setTarget} placeholder={'$'} /> */}

            <ThemeSelect label={'Theme'} setTheme={setTheme} data={themes} />

            <Button>Add Pot</Button>
        </FormContainer>
    )
}

export default AddNewBudget