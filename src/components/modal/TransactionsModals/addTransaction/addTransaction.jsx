import { useState, useRef } from 'react'

import { AditionalInfoContainer, Button, CalendarBox, FormContainer, AmountInputBox, DateSelected, CustomSelect, CustomOption, ChevronIcon, TransactionTypeDiv, TransactionIcon } from './styles'

import DefaultSelect from '../../../../ui/select/defaultSelect/defaultSelect'
import DefaultInput from '../../../input/defaultInput/defaultInput'

import { CalendarDays as CalendarIcon } from 'lucide-react';

import { ArrowDown as ArrowDownIcon } from 'lucide-react'
import { ArrowUp as ArrowUpIcon } from 'lucide-react'

import { useCategories } from '../../../../contexts/categoriesContext'
import { useTransactions } from '../../../../contexts/transactionsContext'
import { usePeople } from '../../../../contexts/peopleContext'

import TransactionsModalManager from '../../../../managers/TransactionsModalManager/TransactionsModalManager'

const AddTransaction = () => {
    const { refreshTransactions } = useTransactions()
    const { categories } = useCategories()
    const { people } = usePeople()

    const [modal, setModal] = useState({ type: null, pot: null });

    const openModal = (type, pot = null) => setModal({ type, pot });
    const closeModal = () => setModal({ type: null, pot: null });

    const [amount, setAmount] = useState(0)
    const [category, setCategory] = useState(1)
    const [person, setPerson] = useState(1)
    const [type, setType] = useState(0)
    const [date, setDate] = useState(new Date());
    const dateInputRef = useRef(null)

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
            category: ${category}
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
                    category_id: category,
                    person_id: person,
                })
            })

            const data = await response.json();
            console.log('>>> Resposta Transaction Post [Add Transaction Modal]:', data);

        } catch (error) {
            console.error('Erro ao adicionar a transaction:', error);
        }

        refreshTransactions()
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
                        {/* <CalendarInput
                            type="date"
                            ref={dateInputRef}
                            onChange={(e) => {
                                const selectedDate = new Date(e.target.value);
                                const now = new Date();

                                selectedDate.setHours(now.getHours(), now.getMinutes(), now.getSeconds(), now.getMilliseconds());

                                setDate(selectedDate);
                            }}
                        /> */}

                        <CalendarIcon
                            size={40}
                            color='var(--dark)'
                            strokeWidth={2.25}
                            cursor={'pointer'}
                            onClick={() => closeModal(false)}
                        />

                        <DateSelected>
                            {date.toISOString().split("T")[0]}
                        </DateSelected>
                    </CalendarBox>
                </AditionalInfoContainer>

                <DefaultSelect
                    label='Category'
                    setValue={setCategory}
                    data={categories.filter((category) => category.category_id !== 1)}
                    item_id={'category_id'}
                    item_name={'category_name'}
                    hasButton
                    onButtonClick={() => openModal('addCategory')}
                />

                <DefaultSelect
                    label={type === 0 ? 'Recipient' : 'Sender'}
                    setValue={setPerson}
                    data={people.filter((person) => person.person_id !== 1)}
                    item_id={'person_id'}
                    item_name={'person_name'}
                    hasButton
                    onButtonClick={() => openModal('addPerson')}
                />

                <Button>Add transaction</Button>
            </FormContainer>

            <TransactionsModalManager modal={modal} onClose={closeModal} />
        </>
    )
}

export default AddTransaction