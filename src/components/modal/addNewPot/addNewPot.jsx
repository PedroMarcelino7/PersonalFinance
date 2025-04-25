import React from 'react'
import DefaultInput from '../../input/defaultInput/defaultInput'
import { Button, Container } from './styles'
import ThemeSelect from '../../../ui/select/themeSelect/themeSelect'

const AddNewPot = () => {
    return (
        <Container>
            <DefaultInput label={'Pot Name'} />

            <DefaultInput label={'Target'} placeholder={'$'} />

            <ThemeSelect label={'Theme'} />

            <Button>Add Pot</Button>
        </Container>
    )
}

export default AddNewPot