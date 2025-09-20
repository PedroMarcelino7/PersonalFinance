import { useEffect, useState } from 'react'

import { AditionalInfoContainer, Button, CalendarBox, FormContainer, AmountInputBox, DateSelected, TransactionTypeDiv, TransactionIcon } from './styles'

import { toast } from 'react-toastify';

// COMPONENTS
import DatePicker from '../../../datePicker/datePicker';

// UI COMPONENTS
import DefaultSelect from '../../../../ui/select/defaultSelect/defaultSelect'
import DefaultInput from '../../../../ui/input/defaultInput/defaultInput'

// ICONS
import { CalendarDays as CalendarIcon } from 'lucide-react';
import { ArrowDown as ArrowDownIcon } from 'lucide-react'
import { ArrowUp as ArrowUpIcon } from 'lucide-react'

// CONTEXTS
import { useBudgets } from '../../../../contexts/budgetsContext'
import { useTransactions } from '../../../../contexts/transactionsContext'
import { usePeople } from '../../../../contexts/peopleContext'

// MODAL MANAGER
import TransactionsModalManager from '../../../../managers/TransactionsModalManager/TransactionsModalManager'
import DefaultButton from '../../../../ui/button/defaultButton/defaultButton';

const AddTransaction = () => {
    const { refreshTransactions } = useTransactions()
    const { budgets } = useBudgets()
    const { people } = usePeople()

    const [modal, setModal] = useState({ type: null, pot: null });

    const openModal = (type, pot = null) => setModal({ type, pot });
    const closeModal = () => setModal({ type: null, pot: null });

    const [amount, setAmount] = useState(0)
    const [budget, setBudget] = useState(2)
    const [person, setPerson] = useState(2)
    const [type, setType] = useState(0)
    const [date, setDate] = useState(new Date());
    const [showCalendar, setShowCalendar] = useState(false)

    useEffect(() => {
        if (budgets.length > 1) {
            setBudget(budgets[1].id);
        }
    }, [budgets]);

    function formatDate(date) {
        const pad = (n) => (n < 10 ? '0' + n : n);

        const year = date.getFullYear();
        const month = pad(date.getMonth() + 1);
        const day = pad(date.getDate());
        const hours = pad(date.getHours());
        const minutes = pad(date.getMinutes());
        const seconds = pad(date.getSeconds());

        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        const formattedDate = formatDate(date);

        console.log(`
            TRANSACTION SUBMIT

            amount: ${amount}
            budget: ${budget}
            person: ${person}
            date: ${formattedDate}
            type: ${type}
        `)

        try {
            const response = await fetch('http://localhost:3000/transactions/post', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    transaction_amount: amount,
                    transaction_type: type,
                    transaction_date: formattedDate,
                    budget_id: budget,
                    person_id: person,
                })
            })

            const data = await response.json();

            if (!response.ok) {
                console.error('Erro do servidor:', data);
                toast.error('Error creating transaction.');
                return;
            }

            console.log('>>> Resposta Transaction Post [Add Transaction Modal]:', data);
            toast.success('Transaction created successfully.')
        } catch (error) {
            console.error('Erro ao criar a transaction:', error);
            toast.error('Error creating transaction.')
        }

        refreshTransactions()
        closeModal()
    }

    return (
        <>
            <FormContainer onSubmit={(e) => handleSubmit(e)}>
                <AditionalInfoContainer>
                    <AmountInputBox>
                        <DefaultInput
                            label={'Amount'}
                            setValue={setAmount}
                            placeholder={'$ 0.00'}
                            required={true}
                        />
                    </AmountInputBox>

                    <TransactionTypeDiv>
                        <TransactionIcon
                            as={ArrowDownIcon}
                            size={type === 0 ? 35 : 25}
                            color={type === 0 ? 'var(--red)' : 'var(--red-muted)'}
                            strokeWidth={2.5}
                            cursor={'pointer'}
                            onClick={() => setType(0)}
                        />

                        <TransactionIcon
                            as={ArrowUpIcon}
                            size={type === 1 ? 35 : 25}
                            color={type === 1 ? 'var(--green)' : 'var(--green-muted)'}
                            strokeWidth={2.5}
                            cursor={'pointer'}
                            onClick={() => setType(1)}
                        />
                    </TransactionTypeDiv>

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

                <DefaultSelect
                    label='Budget'
                    emptyLabel='No budget registered...'
                    value={budget}
                    setValue={setBudget}
                    data={budgets.filter((budget) => budget.budget_id !== 1)}
                    item_id={'budget_id'}
                    item_name={'budget_name'}
                    hasButton
                    onButtonClick={() => openModal('addBudget')}
                />

                <DefaultSelect
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
                    label='Add Transaction'
                    type='submit'
                />
            </FormContainer>

            <TransactionsModalManager modal={modal} onClose={closeModal} />
        </>
    )
}

export default AddTransaction