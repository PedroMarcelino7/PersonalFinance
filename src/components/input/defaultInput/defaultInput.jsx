import React from 'react'
import { Container, Input, Label, LabelSpan } from './styles'

const DefaultInput = ({ label, placeholder, value, setValue, required }) => {
    return (
        <Container>
            <Label htmlFor={label}>
                {label}
                {required && <LabelSpan>*</LabelSpan>}
            </Label>

            <Input id={label}
                placeholder={placeholder}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                required={required}
            />
        </Container>
    )
}

export default DefaultInput