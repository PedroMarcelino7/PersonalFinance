import { useState } from 'react'

import { AditionalInfoContainer, AmountInputBox, CalendarBox, DateSelected, FormContainer } from './styles'

// COMPONENTS
import DatePicker from '../../../datePicker/datePicker'

// UI COMPONENTS
import DefaultInput from '../../../../ui/input/defaultInput/defaultInput'
import DefaultSelect from '../../../../ui/select/defaultSelect/defaultSelect'

// CONTEXTS
import { usePeople } from '../../../../contexts/peopleContext'
import { useBudgets } from '../../../../contexts/budgetsContext'
import { useRecurringBills } from '../../../../contexts/recurringBillsContext'

// MODAL MANAGER
import RecurringBillsModalManager from '../../../../managers/RecurringBillsModalManager/RecurringBillsModalManager'

// ICONS
import { CalendarDays as CalendarIcon } from 'lucide-react';
import DefaultButton from '../../../../ui/button/defaultButton/defaultButton'

const AddPot = () => {
    const { people } = usePeople()
    const { budgets } = useBudgets()
    const { recurringBills } = useRecurringBills()

    const [modal, setModal] = useState({ type: null, pot: null });
    const openModal = (type, pot = null) => setModal({ type, pot });
    const closeModal = () => setModal({ type: null, pot: null });

    const [name, setName] = useState('')
    const [person, setPerson] = useState('')
    const [budget, setBudget] = useState('')
    const [amount, setAmount] = useState(0)
    const [date, setDate] = useState(new Date())
    const [type, setType] = useState(0)

    const [showCalendar, setShowCalendar] = useState(false)

    return (
        <>
            <FormContainer>
                <DefaultInput
                    label={'Bill Name'}
                    value={name}
                    setValue={setName}
                    required={true}
                />

                {/* BILL RECURRENCE */}

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
                    label='Confirm Addition'
                    type='submit'
                />
            </FormContainer>

            <RecurringBillsModalManager modal={modal} onClose={closeModal} />
        </>
    )
}

export default AddPot