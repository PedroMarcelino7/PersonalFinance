import { useState } from "react"
import DefaultInput from "../../../../ui/input/defaultInput/defaultInput"
import { FormContainer } from "./styles"

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
