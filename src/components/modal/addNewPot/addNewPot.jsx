import React from 'react'
import DefaultInput from '../../input/defaultInput/defaultInput'
import { Button, Container } from './styles'

const AddNewPot = () => {
    return (
        <Container>
            <DefaultInput label={'Pot Name'} />

            <DefaultInput label={'Target'} placeholder={'$'} />

            <Button>Add Pot</Button>
        </Container>
    )
}

export default AddNewPot