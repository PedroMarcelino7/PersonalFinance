import { useState } from 'react'
import { Container, Label, SelectBox, Selected, Options, Option, ChevronIcon, ThemeBox, SelectWithButtonDiv, Button } from './styles'
import { ChevronDown as ArrowIcon } from 'lucide-react';

const ButtonSelect = ({ label = '', emptyLabel = 'No options to select...', value, setValue, data, item_id, item_name, hasButton = false, onButtonClick }) => {
    const [isOpen, setIsOpen] = useState(false)

    const toggleDropdown = () => setIsOpen(!isOpen)

    const handleSelect = (item) => {
        setValue(item?.[item_id])
        setIsOpen(false)
    }

    const selectedItem = data.find((item) => item[item_id] === value) || data[0];

    return (
        <Container>
            <Label>{label}</Label>

            <SelectWithButtonDiv>
                {data.length === 0
                    ? <SelectBox disabled>
                        <Selected>
                            <ThemeBox disabled>
                                <h1>{emptyLabel}</h1>
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
                    </SelectBox>
                    : <SelectBox onClick={toggleDropdown}>
                        <Selected>
                            <ThemeBox>
                                <h1>{selectedItem[item_name]}</h1>
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
                }

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

export default ButtonSelect
