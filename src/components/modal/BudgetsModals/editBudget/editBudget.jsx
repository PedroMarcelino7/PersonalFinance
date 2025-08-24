import { useState } from 'react'
import DefaultInput from '../../../input/defaultInput/defaultInput'
import { Button, FormContainer } from './styles'
import ThemeSelect from '../../../../ui/select/themeSelect/themeSelect'
import { useModal } from '../../modal'
import { useCategories } from '../../../../contexts/categoriesContext'
import { useThemes } from '../../../../contexts/themesContext'
import { toast } from 'react-toastify'

const EditBudget = ({ category }) => {
    const { closeModal } = useModal()
    const { themes } = useThemes()
    const { refreshCategories } = useCategories()

    const [categoryName, setCategory] = useState(category.category_name)
    const [target, setTarget] = useState(category.category_max)
    const [theme, setTheme] = useState(category.theme_id)

    const handleSubmit = async (e) => {
        e.preventDefault()

        console.log('Category:', categoryName)
        console.log('Target:', target)
        console.log('Theme:', theme)

        try {
            const response = await fetch('http://localhost:3000/categories/edit', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    category_id: category.category_id,
                    category_name: categoryName,
                    category_max: target,
                    theme_id: theme
                })
            });

            const data = await response.json();

            if (!response.ok) {
                console.error('Erro do servidor:', data);
                toast.error('Error editing category.');
                return;
            }

            console.log('>>> Resposta Category Edit [Edit Category Modal]:', data);
            toast.success('Category edited successfully.')
        } catch (error) {
            console.error('Erro ao editar a category:', error);
            toast.error('Error editing category.');
        }

        refreshCategories()
        closeModal()
    }

    return (
        <FormContainer onSubmit={(e) => handleSubmit(e)}>
            <DefaultInput label={'Name'} value={categoryName} setValue={setCategory} />

            <DefaultInput label={'Target'} value={target} setValue={setTarget} placeholder={'$'} />

            <ThemeSelect label={'Theme'} setTheme={setTheme} data={themes} currentValue={themes.findIndex((theme) => theme.theme_id === category.theme_id)} />

            <Button>Edit Category</Button>
        </FormContainer>
    )
}

export default EditBudget