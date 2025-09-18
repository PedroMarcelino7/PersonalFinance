import { useState } from 'react'
import DefaultInput from '../../../../ui/input/defaultInput/defaultInput'
import { Button, FormContainer } from './styles'
import ThemeSelect from '../../../../ui/select/themeSelect/themeSelect'
import { useModal } from '../../modal'
import { useCategories } from '../../../../contexts/categoriesContext'
import { useThemes } from '../../../../contexts/themesContext'
import { toast } from 'react-toastify'

const AddNewBudget = () => {
    const { closeModal } = useModal()
    const { themes } = useThemes()
    const { refreshCategories } = useCategories()

    const [category, setCategory] = useState('')
    const [target, setTarget] = useState('')
    const [theme, setTheme] = useState(themes[0].theme_id)

    const handleSubmit = async (e) => {
        e.preventDefault()

        console.log('Category:', category)
        console.log('Target:', target)
        console.log('Theme:', theme)

        try {
            const response = await fetch('http://localhost:3000/categories/post', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    category_name: category,
                    category_max: target,
                    theme_id: theme
                })
            });

            const data = await response.json();

            if (!response.ok) {
                console.error('Erro do servidor:', data);
                toast.error('Error creating category.');
                return;
            }

            console.log('>>> Resposta Category Post [Add Category Modal]:', data);
            toast.success('Category created successfully.')
        } catch (error) {
            console.error('Error creating category:', error);
            toast.error('Error creating category.');
        }

        refreshCategories()
        closeModal()
    }

    return (
        <FormContainer onSubmit={(e) => handleSubmit(e)}>
            <DefaultInput label={'Category'} value={category} setValue={setCategory} />

            <DefaultInput label={'Target'} value={target} setValue={setTarget} placeholder={'$'} />

            <ThemeSelect label={'Theme'} setTheme={setTheme} data={themes} />

            <Button>Add Category</Button>
        </FormContainer>
    )
}

export default AddNewBudget