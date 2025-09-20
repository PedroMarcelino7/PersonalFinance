import { useState } from "react"

import { FormContainer } from "./styles"

// UI COMPONENTS
import DefaultInput from "../../../../ui/input/defaultInput/defaultInput"

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
        </FormContainer>
    )
}

export default AddPerson
