import { useState, useRef, useEffect } from 'react'

import { AditionalInfoContainer, Button, Calendar, CalendarBox, CalendarInput, FormContainer, AmountInputBox, DateSelected, SelectWrapper, CustomSelect, CustomOption, ChevronIcon } from './styles'

import DefaultSelect from '../../../../ui/select/defaultSelect/defaultSelect'
import DefaultInput from '../../../input/defaultInput/defaultInput'

import IconCalendar from '../../../../assets/images/icon-calendar.svg'
import ChevronDownIcon from '../../../../assets/images/icon-caret-down.svg'

import { useModal } from '../../modal'

const AddTransaction = () => {
    const { closeModal } = useModal()

    const [amount, setAmount] = useState(0)
    const [category, setCategory] = useState('')
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

            <SelectWrapper>
                <CustomSelect>
                    <CustomOption value="1">Latest</CustomOption>
                    <CustomOption value="2">Oldest</CustomOption>
                    <CustomOption value="3">A to Z</CustomOption>
                    <CustomOption value="4">Z to A</CustomOption>
                    <CustomOption value="5">Highest</CustomOption>
                    <CustomOption value="6">Lowest</CustomOption>
                </CustomSelect>
                <ChevronIcon src={ChevronDownIcon} alt="chevron" />
            </SelectWrapper>

            <SelectWrapper>
                <CustomSelect>
                    <CustomOption value="1">Latest</CustomOption>
                    <CustomOption value="2">Oldest</CustomOption>
                    <CustomOption value="3">A to Z</CustomOption>
                    <CustomOption value="4">Z to A</CustomOption>
                    <CustomOption value="5">Highest</CustomOption>
                    <CustomOption value="6">Lowest</CustomOption>
                </CustomSelect>
                <ChevronIcon src={ChevronDownIcon} alt="chevron" />
            </SelectWrapper>

            <DefaultSelect
                label='Category'
                setValue={setCategory}
            />

            <Button>Add transaction</Button>
        </FormContainer>
    )
}

export default AddTransaction