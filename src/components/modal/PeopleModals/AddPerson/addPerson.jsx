import { useState } from "react"
import { toast } from "react-toastify"

import { FormContainer } from "./styles"

// UI COMPONENTS
import DefaultInput from "../../../../ui/input/defaultInput/defaultInput"
import DefaultButton from '../../../../ui/button/defaultButton/defaultButton'
import ImageButton from "../../../../ui/button/imageButton/imageButton"

// CONTEXT
import { useModal } from '../../modal'
import { usePeople } from '../../../../contexts/peopleContext'

const AddPerson = () => {
    const { refreshPeople } = usePeople()
    const { closeModal } = useModal()

    const [name, setName] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const response = await fetch('http://localhost:3000/people/post', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    person_name: name,
                })
            });

            const data = await response.json();

            if (!response.ok) {
                console.error('Erro do servidor:', data);
                toast.error('Error adding person.');
                return;
            }

            toast.success('Person added successfully.')
        } catch (error) {
            toast.error('Error adding person.')
        }

        refreshPeople()
        closeModal()
    }

    return (
        <FormContainer onSubmit={(e) => handleSubmit(e)}>
            <DefaultInput
                label={'Name'}
                value={name}
                setValue={setName}
                required
            />

            <ImageButton />

            <DefaultButton
                label="Confirm Addition"
                type="submit"
            />
        </FormContainer>
    )
}

export default AddPerson
