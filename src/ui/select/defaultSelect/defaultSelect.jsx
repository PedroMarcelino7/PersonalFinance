import React, { useState } from 'react'
import { Container, Label, SelectBox, Selected, Options, Option, ColorDot, ChevronIcon, ThemeBox } from './styles'
import SelectIcon from '../../../assets/images/icon-caret-down.svg'

const DefaultSelect = ({ label = 'Category', value, setValue, data }) => {
    const [selected, setSelected] = useState(data[0])
    const [isOpen, setIsOpen] = useState(false)

    const toggleDropdown = () => setIsOpen(!isOpen)

    const handleSelect = (category) => {
        setSelected(category)
        setValue(category)
        setIsOpen(false)
    }

    return (
        <Container>
            <Label>{label}</Label>

            <SelectBox onClick={toggleDropdown}>
                <Selected>
                    <ThemeBox>
                        <h1>{selected}</h1>
                    </ThemeBox>

                    <ChevronIcon src={SelectIcon} alt='' />
                </Selected>
                {isOpen && (
                    <Options>
                        {data.map((category) => (
                            <Option key={category} onClick={() => handleSelect(category)}>
                                {category}
                            </Option>
                        ))}
                    </Options>
                )}
            </SelectBox>
        </Container>
    )
}

export default DefaultSelect
