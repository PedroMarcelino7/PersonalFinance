import { useState } from 'react'
import DefaultInput from '../../../../ui/input/defaultInput/defaultInput'
import { Button, FormContainer } from './styles'
import ThemeSelect from '../../../../ui/select/themeSelect/themeSelect'
import { useModal } from '../../modal'
import { useBudgets } from '../../../../contexts/budgetsContext'
import { useThemes } from '../../../../contexts/themesContext'
import { toast } from 'react-toastify'

const AddNewBudget = () => {
    const { closeModal } = useModal()
    const { themes } = useThemes()
    const { refreshBudgets } = useBudgets()

    const [budget, setBudget] = useState('')
    const [target, setTarget] = useState('')
    const [theme, setTheme] = useState(themes[0].theme_id)

    const handleSubmit = async (e) => {
        e.preventDefault()

        console.log('Budget:', budget)
        console.log('Target:', target)
        console.log('Theme:', theme)

        try {
            const response = await fetch('http://localhost:3000/budgets/post', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    budget_name: budget,
                    budget_max: target,
                    theme_id: theme
                })
            });

            const data = await response.json();

            if (!response.ok) {
                console.error('Erro do servidor:', data);
                toast.error('Error creating budget.');
                return;
            }

            console.log('>>> Resposta Budget Post [Add Budget Modal]:', data);
            toast.success('Budget created successfully.')
        } catch (error) {
            console.error('Error creating budget:', error);
            toast.error('Error creating budget.');
        }

        refreshBudgets()
        closeModal()
    }

    return (
        <FormContainer onSubmit={(e) => handleSubmit(e)}>
            <DefaultInput label={'Budget'} value={budget} setValue={setBudget} />

            <DefaultInput label={'Target'} value={target} setValue={setTarget} placeholder={'$'} />

            <ThemeSelect label={'Theme'} setTheme={setTheme} data={themes} />

            <Button>Add Budget</Button>
        </FormContainer>
    )
}

export default AddNewBudget