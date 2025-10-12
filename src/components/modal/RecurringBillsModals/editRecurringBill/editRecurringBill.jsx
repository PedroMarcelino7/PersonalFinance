import { useState } from 'react'

import { AditionalInfoContainer, AmountInputBox, ArrowIcon, BillTypeDiv, CalendarBox, DateSelected, FormContainer } from './styles'

import { toast } from 'react-toastify'

// COMPONENTS
import DatePicker from '../../../datePicker/datePicker'

// UI COMPONENTS
import DefaultInput from '../../../../ui/input/defaultInput/defaultInput'
import ButtonSelect from '../../../../ui/select/buttonSelect/buttonSelect'
import DefaultSelect from '../../../../ui/select/defaultSelect/defaultSelect'
import DefaultButton from '../../../../ui/button/defaultButton/defaultButton'

// CONTEXTS
import { usePeople } from '../../../../contexts/peopleContext'
import { useBudgets } from '../../../../contexts/budgetsContext'
import { useRecurringBills } from '../../../../contexts/recurringBillsContext'
import { useModal } from '../../modal'

// ICONS
import { CalendarDays as CalendarIcon } from 'lucide-react';
import { ArrowDown as ArrowDownIcon } from 'lucide-react'
import { ArrowUp as ArrowUpIcon } from 'lucide-react'

const EditRecurringBill = ({ bill }) => {
    const { people } = usePeople()
    const { budgets } = useBudgets()
    const { refreshRecurringBills } = useRecurringBills()
    const { closeModal } = useModal()

    const [name, setName] = useState(bill.bill_name)
    const [recurrence, setRecurrence] = useState(bill.bill_recurrence)
    const [amount, setAmount] = useState(bill.bill_amount)
    const [type, setType] = useState(bill.bill_type)
    const [date, setDate] = useState(new Date())
    const [budget, setBudget] = useState(bill.budget_id)
    const [person, setPerson] = useState(bill.person_id)

    const [showCalendar, setShowCalendar] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()

        console.log(`
            Recurring Bill
    
            ID: ${bill.bill_id}
            Name: ${name}
            Recurrence: ${recurrence}
            Amount: ${amount}
            Type: ${type}
            Date: ${date.toISOString().split("T")[0]}
            Budget: ${budget}
            Person: ${person}
        `)

        try {
            const response = await fetch('http://localhost:3000/recurring-bills/edit', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    bill_id: bill.bill_id,
                    bill_name: name,
                    bill_recurrence: recurrence,
                    bill_type: type,
                    bill_amount: amount,
                    bill_date: '2025-07-15',
                    budget_id: budget,
                    person_id: person,
                })
            });

            const data = await response.json();

            if (!response.ok) {
                console.error('Erro do servidor:', data);
                toast.error('Error editing recurring bill.');
                return;
            }

            toast.success('Recurring bill edited successfully.')
        } catch (error) {
            console.error('Erro ao editar a recurring bill:', error);
            toast.error('Error editing recurring bill.')
        }

        refreshRecurringBills()
        closeModal()
    }

    return (
        <FormContainer onSubmit={(e) => handleSubmit(e)}>
            <DefaultInput
                label={'Bill Name'}
                value={name}
                setValue={setName}
                required={true}
            />

            <DefaultSelect
                label='Recurrence'
                data={[
                    { value: 0, name: 'Weekly' },
                    { value: 1, name: 'Each 15 days' },
                    { value: 2, name: 'Monthly' },
                    { value: 3, name: 'Semiannually' },
                    { value: 4, name: 'Anually' },
                ]}
                item_id={'value'}
                item_name={'name'}
                value={recurrence}
                setValue={setRecurrence}
            />

            <AditionalInfoContainer>
                <AmountInputBox>
                    <DefaultInput
                        label={'Amount'}
                        value={amount}
                        setValue={setAmount}
                        placeholder={'$ 0.00'}
                        required={true}
                    />
                </AmountInputBox>

                <BillTypeDiv>
                    <ArrowIcon
                        as={ArrowDownIcon}
                        size={type === 0 ? 35 : 25}
                        color={type === 0 ? 'var(--red)' : 'var(--red-muted)'}
                        strokeWidth={2.5}
                        cursor={'pointer'}
                        onClick={() => setType(0)}
                    />

                    <ArrowIcon
                        as={ArrowUpIcon}
                        size={type === 1 ? 35 : 25}
                        color={type === 1 ? 'var(--green)' : 'var(--green-muted)'}
                        strokeWidth={2.5}
                        cursor={'pointer'}
                        onClick={() => setType(1)}
                    />
                </BillTypeDiv>

                <CalendarBox>
                    <CalendarIcon
                        size={40}
                        color='var(--dark)'
                        strokeWidth={2.25}
                        cursor={'pointer'}
                        onClick={() => setShowCalendar(true)}
                    />

                    {showCalendar &&
                        <DatePicker
                            selected={date}
                            setSelected={setDate}
                            disabled={{ before: new Date() + 1 }}
                            onClick={() => setShowCalendar(false)}
                        />
                    }

                    <DateSelected>
                        {date.toISOString().split("T")[0]}
                    </DateSelected>
                </CalendarBox>
            </AditionalInfoContainer>

            <ButtonSelect
                label={'Budget'}
                emptyLabel='No budget registered...'
                value={budget}
                setValue={setBudget}
                data={budgets.filter((budget) => budget.budget_id !== 1)}
                item_id={'budget_id'}
                item_name={'budget_name'}
                hasButton
                onButtonClick={() => openModal('addBudget')}
            />

            <ButtonSelect
                label={type === 0 ? 'Recipient' : 'Sender'}
                emptyLabel='No person registered...'
                value={person}
                setValue={setPerson}
                data={people.filter((person) => person.person_id !== 1)}
                item_id={'person_id'}
                item_name={'person_name'}
                hasButton
                onButtonClick={() => openModal('addPerson')}
            />

            <DefaultButton
                label='Confirm Edition'
                type='submit'
            />
        </FormContainer>
    )
}

export default EditRecurringBill