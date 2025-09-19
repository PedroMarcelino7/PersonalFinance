import { useState } from 'react'
import DefaultInput from '../../../../ui/input/defaultInput/defaultInput'
import { Button, FormContainer } from './styles'
import ThemeSelect from '../../../../ui/select/themeSelect/themeSelect'
import { useModal } from '../../modal'
import { useBudgets } from '../../../../contexts/budgetsContext'
import { useThemes } from '../../../../contexts/themesContext'
import { toast } from 'react-toastify'

const EditBudget = ({ budget }) => {
    const { closeModal } = useModal()
    const { themes } = useThemes()
    const { refreshBudgets } = useBudgets()

    const [budgetName, setBudget] = useState(budget.budget_name)
    const [target, setTarget] = useState(budget.budget_max)
    const [theme, setTheme] = useState(budget.theme_id)

    const handleSubmit = async (e) => {
        e.preventDefault()

        console.log('Budget:', budgetName)
        console.log('Target:', target)
        console.log('Theme:', theme)

        try {
            const response = await fetch('http://localhost:3000/budgets/edit', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    budget_id: budget.budget_id,
                    budget_name: budgetName,
                    budget_max: target,
                    theme_id: theme
                })
            });

            const data = await response.json();

            if (!response.ok) {
                console.error('Erro do servidor:', data);
                toast.error('Error editing budget.');
                return;
            }

            console.log('>>> Resposta Budget Edit [Edit Budget Modal]:', data);
            toast.success('Budget edited successfully.')
        } catch (error) {
            console.error('Erro ao editar o budget:', error);
            toast.error('Error editing budget.');
        }

        refreshBudgets()
        closeModal()
    }

    return (
        <FormContainer onSubmit={(e) => handleSubmit(e)}>
            <DefaultInput label={'Name'} value={budgetName} setValue={setBudget} />

            <DefaultInput label={'Target'} value={target} setValue={setTarget} placeholder={'$'} />

            <ThemeSelect label={'Theme'} setTheme={setTheme} data={themes} currentValue={themes.findIndex((theme) => theme.theme_id === budget.theme_id)} />

            <Button>Edit Budget</Button>
        </FormContainer>
    )
}

export default EditBudget