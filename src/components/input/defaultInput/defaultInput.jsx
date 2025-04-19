import React from 'react'
import { Container, Input, Label } from './styles'

const DefaultInput = ({ label, placeholder }) => {
    return (
        <Container>
            <Label for='input'>{label}</Label>

            <Input id='input' placeholder={placeholder} />
        </Container>
    )
}

export default DefaultInput