import React from 'react'
import { Container, Input, Label } from './styles'

const DefaultInput = ({ label, placeholder, setValue }) => {
    return (
        <Container>
            <Label htmlFor={label}>{label}</Label>

            <Input id={label}
                placeholder={placeholder}
                onChange={(e) => setValue(e.target.value)}
            />
        </Container>
    )
}

export default DefaultInput