import { useState } from 'react'

import { FormContainer } from './styles'

// UI COMPONENTS
import DefaultInput from '../../../../ui/input/defaultInput/defaultInput'
import DefaultSelect from '../../../../ui/select/defaultSelect/defaultSelect'

// CONTEXTS
import { usePeople } from '../../../../contexts/peopleContext'
import { useRecurringBills } from '../../../../contexts/recurringBillsContext'

// MODAL MANAGER
import RecurringBillsModalManager from '../../../../managers/RecurringBillsModalManager/RecurringBillsModalManager'

const AddPot = () => {
    const { people } = usePeople()
    const { recurringBills } = useRecurringBills()

    const [modal, setModal] = useState({ type: null, pot: null });
    const openModal = (type, pot = null) => setModal({ type, pot });
    const closeModal = () => setModal({ type: null, pot: null });

    const [name, setName] = useState('')
    const [person, setPerson] = useState('')
    const [type, setType] = useState(0)

    return (
        <>
            <FormContainer>
                <DefaultInput
                    label={'Bill Name'}
                    value={name}
                    setValue={setName}
                    required={true}
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
            </FormContainer>

            <RecurringBillsModalManager modal={modal} onClose={closeModal} />
        </>
    )
}

export default AddPot