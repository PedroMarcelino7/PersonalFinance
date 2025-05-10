import React, { useState } from 'react'
import DefaultInput from '../../input/defaultInput/defaultInput'
import { Button, FormContainer } from './styles'
import ThemeSelect from '../../../ui/select/themeSelect/themeSelect'
import { useModal } from '../modal'
import DefaultSelect from '../../../ui/select/defaultSelect/defaultSelect'
import { useBudgets } from '../../../contexts/budgetsContext'
import { useCategories } from '../../../contexts/categoriesContext'

const EditBudget = ({ data, budget }) => {
    const { closeModal } = useModal()
    const { refreshBudgets } = useBudgets()
    const { refreshCategories } = useCategories()

    const categories = data
        .filter(category => category.category_isUsed === 0)

    const themes = [
        { name: 'Green', color: '#2A7D72' },
        { name: 'Red', color: '#C0392B' },
        { name: 'Blue', color: '#2980B9' },
    ]

    const [category, setCategory] = useState(categories[0].category_id)
    const [target, setTarget] = useState('')
    const [theme, setTheme] = useState(themes[0])

    const handleSubmit = async (e) => {
        e.preventDefault()

        console.log('Category:', category)
        console.log('Target:', target)
        console.log('Theme:', theme.color)

        try {
            const response = await fetch('http://localhost:3000/budgets/post', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    category_id: category,
                    budget_theme: theme.color,
                    budget_max: target
                })
            });

            const data = await response.json();
            console.log('>>> Resposta Budget Post [Add Budget Modal]:', data);

            refreshBudgets()
        } catch (error) {
            console.error('Erro ao criar o budget:', error);
        }

        try {
            const response = await fetch('http://localhost:3000/categories/edit-status', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    category_id: category
                })
            });

            const data = await response.json();
            console.log('>>> Resposta Category Post [Add Budget Modal]:', data);

            refreshCategories()
        } catch (error) {
            console.error('Erro ao editar a category:', error);
        }

        closeModal()
    }

    return (
        <FormContainer onSubmit={(e) => handleSubmit(e)}>
            <DefaultSelect label={'Category'} value={budget.budget_category} setValue={setCategory} data={categories} />

            <DefaultInput label={'Target'} value={target} setValue={setTarget} placeholder={'$'} />

            <ThemeSelect label={'Theme'} setTheme={setTheme} data={themes} />

            <Button>Add Pot</Button>
        </FormContainer>
    )
}

export default EditBudget