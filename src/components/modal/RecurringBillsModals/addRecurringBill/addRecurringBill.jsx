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

// MODAL MANAGER
import RecurringBillsModalManager from '../../../../managers/RecurringBillsModalManager/RecurringBillsModalManager'

// ICONS
import { CalendarDays as CalendarIcon } from 'lucide-react';
import { ArrowDown as ArrowDownIcon } from 'lucide-react'
import { ArrowUp as ArrowUpIcon } from 'lucide-react'

const AddPot = () => {
    const { people } = usePeople()
    const { budgets } = useBudgets()
    const { refreshRecurringBills } = useRecurringBills()

    const [modal, setModal] = useState({ type: null, pot: null });
    const openModal = (type, pot = null) => setModal({ type, pot });
    const closeModal = () => setModal({ type: null, pot: null });

    const [name, setName] = useState('')
    const [recurrence, setRecurrence] = useState(0)
    const [type, setType] = useState(0)
    const [amount, setAmount] = useState(0)
    const [date, setDate] = useState(new Date())
    const [budget, setBudget] = useState(2)
    const [person, setPerson] = useState(2)

    const [showCalendar, setShowCalendar] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()

        console.log(`
            Recurring Bill
    
            Name: ${name}
            Recurrence: ${recurrence}
            Amount: ${amount}
            Date: ${date.toISOString().split("T")[0]}
            Budget: ${budget}
            Person: ${person}
        `)

        try {
            const response = await fetch('http://localhost:3000/recurring-bills/post', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
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
                toast.error('Error adding recurring bill.');
                return;
            }

            toast.success('Recurring bill added successfully.')
        } catch (error) {
            console.error('Erro ao criar a recurring bill:', error);
            toast.error('Error adding recurring bill.')
        }

        refreshRecurringBills()
        closeModal()
    }

    return (
        <>
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
                    label='Confirm Addition'
                    type='submit'
                />
            </FormContainer>

            <RecurringBillsModalManager modal={modal} onClose={closeModal} />
        </>
    )
}

export default AddPot