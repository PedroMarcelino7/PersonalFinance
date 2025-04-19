import React from 'react'
import { Container, Input, Label } from './styles'

const DefaultInput = ({ label }) => {
    return (
        <Container>
            <Label for='input'>{label}</Label>

            <Input id='input' />
        </Container>
    )
}

export default DefaultInput