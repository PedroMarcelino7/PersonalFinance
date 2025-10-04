import { useState } from "react"

import { FormContainer } from "./styles"

// UI COMPONENTS
import DefaultInput from "../../../../ui/input/defaultInput/defaultInput"
import DefaultButton from '../../../../ui/button/defaultButton/defaultButton'
import ImageButton from "../../../../ui/button/imageButton/imageButton"

const AddPerson = () => {
    const [name, setName] = useState('')

    return (
        <FormContainer>
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
