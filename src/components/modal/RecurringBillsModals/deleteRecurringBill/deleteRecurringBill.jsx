import { useEffect } from 'react'

import { FormContainer } from './styles'

import { toast } from 'react-toastify'

// UI COMPONENTS
import DefaultButton from '../../../../ui/button/defaultButton/defaultButton'

// CONTEXTS
import { useRecurringBills } from '../../../../contexts/recurringBillsContext'
import { useModal } from '../../modal'

const DeleteRecurringBill = ({ bill }) => {
    const { refreshRecurringBills } = useRecurringBills()
    const { closeModal } = useModal()

    const handleSubmit = async (e) => {
        e.preventDefault()

        console.log(`
            Bill to delete
    
            ${bill}
        `)

        try {
            const response = await fetch('http://localhost:3000/recurring-bills/delete', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    bill_id: bill.bill_id
                })
            });

            if (!response.ok) {
                console.error('Erro do servidor:', data);
                toast.error('Error deleting recurring bill.');
                return;
            }

            const data = await response.json();
            toast.success('Recurring bill deleted successfully.');
        } catch (error) {
            console.error('Erro ao deletar a conta recorrente:', error);
            toast.error('Error deleting recurring bill.');
        }

        refreshRecurringBills()
        closeModal()
    }

    return (
        <FormContainer onSubmit={(e) => handleSubmit(e)}>
            <DefaultButton
                label='Yes, confirm deletion'
                color='red'
                type='submit'
            />
        </FormContainer>
    )
}

export default DeleteRecurringBill