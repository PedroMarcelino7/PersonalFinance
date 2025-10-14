import { Container, Input, Label, LabelSpan } from './styles'

const DefaultInput = ({ label, type = 'text', placeholder, value, setValue, required, disabled }) => {
    return (
        <Container>
            <Label htmlFor={label}>
                {label}
                {required && <LabelSpan>*</LabelSpan>}
            </Label>

            <Input id={label}
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                required={required}
                disabled={disabled}
            />
        </Container>
    )
}

export default DefaultInput