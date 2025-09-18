import { useState } from 'react'
import { Container, Label, SelectBox, Selected, Options, Option, ChevronIcon, ThemeBox, SelectWithButtonDiv, Button } from './styles'
import { ChevronDown as ArrowIcon } from 'lucide-react';

const DefaultSelect = ({ label = 'Category', setValue, data, item_id, item_name, hasButton = false, onButtonClick }) => {
    const [selected, setSelected] = useState(data[0]?.[item_name])
    const [isOpen, setIsOpen] = useState(false)

    const toggleDropdown = () => setIsOpen(!isOpen)

    const handleSelect = (item) => {
        setSelected(item?.[item_name])
        setValue(item?.[item_id])
        setIsOpen(false)
    }

    return (
        <Container>
            <Label>{label}</Label>

            <SelectWithButtonDiv>
                <SelectBox onClick={toggleDropdown}>
                    <Selected>
                        <ThemeBox>
                            <h1>{selected}</h1>
                        </ThemeBox>

                        <ChevronIcon>
                            <ArrowIcon
                                size={20}
                                color='var(--dark)'
                                strokeWidth={2.5}
                                cursor={'pointer'}
                            />
                        </ChevronIcon>
                    </Selected>
                    {isOpen && (
                        <Options>
                            {data.map((item) => (
                                <Option key={item?.[item_id]} onClick={() => handleSelect(item)}>
                                    {item?.[item_name]}
                                </Option>
                            ))}
                        </Options>
                    )}
                </SelectBox>

                {hasButton &&
                    <Button
                        type='button'
                        onClick={onButtonClick}
                    >
                        +
                    </Button>
                }
            </SelectWithButtonDiv>
        </Container>
    )
}

export default DefaultSelect
