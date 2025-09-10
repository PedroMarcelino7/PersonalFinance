import { useState } from "react"
import DefaultInput from "../../../input/defaultInput/defaultInput"
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
