import { useState, useRef, useEffect } from 'react'

import { AditionalInfoContainer, Button, Calendar, CalendarBox, CalendarInput, FormContainer, AmountInputBox, DateSelected, SelectWrapper, CustomSelect, CustomOption, ChevronIcon } from './styles'

import DefaultSelect from '../../../../ui/select/defaultSelect/defaultSelect'
import DefaultInput from '../../../input/defaultInput/defaultInput'

import IconCalendar from '../../../../assets/images/icon-calendar.svg'

import { useModal } from '../../modal'
import { useCategories } from '../../../../contexts/categoriesContext'
import { usePeople } from '../../../../contexts/peopleContext'

const AddTransaction = () => {
    const { closeModal } = useModal()
    const { categories } = useCategories()
    const { people } = usePeople()

    const [amount, setAmount] = useState(0)
    const [category, setCategory] = useState('')
    const [person, setPerson] = useState('')
    const [date, setDate] = useState(getTodayDate())
    const dateInputRef = useRef(null)

    function getTodayDate() {
        const date = new Date()
        const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()
        const month = date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1
        const year = date.getFullYear()

        return `${year}-${month}-${day}`
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

                    <DateSelected>{date}</DateSelected>
                </CalendarBox>
            </AditionalInfoContainer>

            <DefaultSelect
                label='Category'
                setValue={setCategory}
                data={categories}
                item_id={'category_id'}
                item_name={'category_name'}
            />

            <DefaultSelect
                label='Person'
                setValue={setPerson}
                data={people}
                item_id={'person_id'}
                item_name={'person_name'}
            />

            <Button>Add transaction</Button>
        </FormContainer>
    )
}

export default AddTransaction