import { ConfirmButton, FormContainer } from './styles'
import { useModal } from '../../modal'
import { toast } from 'react-toastify'
import { useBudgets } from '../../../../contexts/budgetsContext'

const DeleteBudget = ({ budget }) => {
    const { refreshBudgets } = useBudgets()
    const { closeModal } = useModal()

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const response = await fetch('http://localhost:3000/budgets/delete', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    budget_id: budget.budget_id
                })
            });

            const data = await response.json();

            if (!response.ok) {
                console.error('Erro do servidor:', data);
                toast.error('Error deleting budget.');
                return;
            }

            toast.success('Category deleted successfully.');
            console.log('>>> Resposta Category Delete [Delete Category Modal]:', data);
        } catch (error) {
            console.error('Erro ao deletar o pot:', error);
            toast.error('Error deleting budget.');
        }

        refreshBudgets()
        closeModal()
    }

    return (
        <FormContainer onSubmit={(e) => handleSubmit(e)}>
            <ConfirmButton>Yes, confirm deletion</ConfirmButton>
        </FormContainer>
    )
}

export default DeleteBudget