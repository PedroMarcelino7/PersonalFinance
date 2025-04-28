import React from 'react'
import { Container, Input, Label } from './styles'

const DefaultInput = ({ label, placeholder, value, setValue }) => {
    return (
        <Container>
            <Label htmlFor={label}>{label}</Label>

            <Input id={label}
                placeholder={placeholder}
                value={value}
                onChange={(e) => setValue(e.target.value)}
            />
        </Container>
    )
}

export default DefaultInput