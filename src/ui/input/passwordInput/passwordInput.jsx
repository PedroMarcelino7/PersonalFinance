import { useState } from 'react';
import { Container, Input, Label, LabelSpan, InputBox, IconBox } from './styles'

import { LockOpen as VisibleIcon } from 'lucide-react';
import { Lock as HiddenIcon } from 'lucide-react';

const PasswordInput = ({ label, placeholder, value, setValue, required, disabled }) => {
    const [type, setType] = useState(false)

    return (
        <Container>
            <Label htmlFor={label}>
                {label}
                {required && <LabelSpan>*</LabelSpan>}
            </Label>

            <InputBox>
                <Input id={label}
                    type={type ? 'text' : 'password'}
                    placeholder={placeholder}
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    required={required}
                    disabled={disabled}
                />

                <IconBox
                    onClick={() => setType(!type)}
                >
                    {type
                        ? <VisibleIcon
                            size={20}
                            color='var(--dark)'
                            strokeWidth={2.5}
                            cursor={'pointer'}
                        />
                        : <HiddenIcon
                            size={20}
                            color='var(--dark)'
                            strokeWidth={2.5}
                            cursor={'pointer'}
                        />}
                </IconBox>
            </InputBox>
        </Container>
    )
}

export default PasswordInput