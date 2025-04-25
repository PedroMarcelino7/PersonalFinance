import React from 'react'
import { Container, Input, Label } from './styles'

const DefaultInput = ({ label, placeholder }) => {
    return (
        <Container>
            <Label for={label}>{label}</Label>

            <Input id={label} placeholder={placeholder} />
        </Container>
    )
}

export default DefaultInput