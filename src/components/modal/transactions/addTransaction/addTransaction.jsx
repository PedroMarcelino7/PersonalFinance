import { useState, useRef, useEffect } from 'react'

import { AditionalInfoContainer, Button, Calendar, CalendarBox, CalendarInput, FormContainer, AmountInputBox, DateSelected, SelectWrapper, CustomSelect, CustomOption, ChevronIcon, TransactionTypeDiv } from './styles'

import DefaultSelect from '../../../../ui/select/defaultSelect/defaultSelect'
import DefaultInput from '../../../input/defaultInput/defaultInput'

import IconCalendar from '../../../../assets/images/icon-calendar.svg'

import { useModal } from '../../modal'
import { useCategories } from '../../../../contexts/categoriesContext'
import { useTransactions } from '../../../../contexts/transactionsContext'
import { usePeople } from '../../../../contexts/peopleContext'

const AddTransaction = () => {
    const { closeModal } = useModal()
    const { refreshTransactions } = useTransactions()
    const { categories } = useCategories()
    const { people } = usePeople()

    const [amount, setAmount] = useState(0)
    const [category, setCategory] = useState(1)
    const [person, setPerson] = useState(1)
    const [type, setType] = useState(0)
    const [date, setDate] = useState(getTodayDate())
    const dateInputRef = useRef(null)

    function getTodayDate() {
        const date = new Date()
        const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()
        const month = date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1
        const year = date.getFullYear()

        return `${year}-${month}-${day}`
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        console.log(`
            TRANSACTION SUBMIT

            amount: ${amount}
            category: ${category}
            person: ${person}
            date: ${date}
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
                    transaction_type: 1,
                    transaction_date: date,
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
        closeModal()
    }

    return (
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
                    <input
                        type="radio"
                        name="type"
                        value={0}
                        checked={type === 0}
                        onChange={(e) => setType(Number(e.target.value))}
                    />

                    <input
                        type="radio"
                        name="type"
                        value={1}
                        checked={type === 1}
                        onChange={(e) => setType(Number(e.target.value))}
                    />
                </TransactionTypeDiv>

                <CalendarBox>
                    <Calendar
                        src={IconCalendar}
                        alt=""
                    />

                    <CalendarInput
                        type="date"
                        ref={dateInputRef}
                        onChange={(e) => setDate(e.target.value)}
                    />

                    <DateSelected>
                        {date}
                    </DateSelected>
                </CalendarBox>
            </AditionalInfoContainer>

            <DefaultSelect
                label='Category'
                setValue={setCategory}
                data={categories}
                item_id={'category_id'}
                item_name={'category_name'}
                hasButton
            />

            <DefaultSelect
                label='Person'
                setValue={setPerson}
                data={people}
                item_id={'person_id'}
                item_name={'person_name'}
                hasButton
            />

            <Button>Add transaction</Button>
        </FormContainer>
    )
}

export default AddTransaction