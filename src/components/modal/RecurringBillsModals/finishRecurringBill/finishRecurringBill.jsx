import { useState } from 'react'

import { AditionalInfoContainer, AmountInputBox, ArrowIcon, BillTypeDiv, CalendarBox, DateSelected, FormContainer } from './styles'

import { toast } from 'react-toastify'

// COMPONENTS
import DatePicker from '../../../datePicker/datePicker'

// UI COMPONENTS
import DefaultInput from '../../../../ui/input/defaultInput/defaultInput'
import ButtonSelect from '../../../../ui/select/buttonSelect/buttonSelect'
import DefaultButton from '../../../../ui/button/defaultButton/defaultButton'

// CONTEXTS
import { usePeople } from '../../../../contexts/peopleContext'
import { useBudgets } from '../../../../contexts/budgetsContext'
import { useRecurringBills } from '../../../../contexts/recurringBillsContext'
import { useTransactions } from '../../../../contexts/transactionsContext'
import { useModal } from '../../modal'

// ICONS
import { CalendarDays as CalendarIcon } from 'lucide-react';
import { ArrowDown as ArrowDownIcon } from 'lucide-react'
import { ArrowUp as ArrowUpIcon } from 'lucide-react'

const FinishRecurringBill = ({ bill }) => {
    const { people } = usePeople()
    const { budgets } = useBudgets()
    const { refreshRecurringBills } = useRecurringBills()
    const { refreshTransactions } = useTransactions()
    const { closeModal } = useModal()

    const [amount, setAmount] = useState(bill.bill_amount)
    const [date, setDate] = useState(new Date())
    const [budget, setBudget] = useState(bill.budget_id)
    const [person, setPerson] = useState(bill.person_id)

    const [showCalendar, setShowCalendar] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()

        console.log(`
            Recurring Bill
    
            ID: ${bill.bill_id}
            Type: ${bill.bill_type}
            Amount: ${amount}
            Date: ${date.toISOString().split("T")[0]}
            Budget: ${budget}
            Person: ${person}
        `)

        try {
            const response = await fetch('http://localhost:3000/recurring-bills/finish', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    bill_id: bill.bill_id,
                    bill_type: bill.bill_type,
                    bill_amount: amount,
                    bill_date: date.toISOString().split("T")[0],
                    budget_id: budget,
                    person_id: person,
                })
            });

            const data = await response.json();

            if (!response.ok) {
                console.error('Erro do servidor:', data);
                toast.error('Error paying recurring bill.');
                return;
            }

            toast.success('Recurring bill paid successfully.')
        } catch (error) {
            console.error('Erro ao pagar a recurring bill:', error);
            toast.error('Error paying recurring bill.')
        }

        refreshRecurringBills()
        refreshTransactions()
        closeModal()
    }

    return (
        <FormContainer onSubmit={(e) => handleSubmit(e)}>
            <AditionalInfoContainer>
                <DefaultInput
                    label={'Bill Name'}
                    value={bill.bill_name}
                    disabled
                />

                <BillTypeDiv>
                    {bill.bill_type === 0
                        ? <ArrowIcon
                            as={ArrowDownIcon}
                            size={35}
                            color={'var(--red-muted)'}
                            strokeWidth={2.5}
                            cursor={'pointer'}
                        />
                        : <ArrowIcon
                            as={ArrowUpIcon}
                            size={35}
                            color={'var(--green-muted)'}
                            strokeWidth={2.5}
                            cursor={'pointer'}
                        />
                    }
                </BillTypeDiv>
            </AditionalInfoContainer>

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
                label={bill.bill_type === 0 ? 'Recipient' : 'Sender'}
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
                label='Mark As Paid'
                type='submit'
            />
        </FormContainer>
    )
}

export default FinishRecurringBill