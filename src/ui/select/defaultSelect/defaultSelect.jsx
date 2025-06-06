import React, { useState } from 'react'
import { Container, Label, SelectBox, Selected, Options, Option, ChevronIcon, ThemeBox } from './styles'
import SelectIcon from '../../../assets/images/icon-caret-down.svg'

const DefaultSelect = ({ label = 'Category', value, setValue, data }) => {
    const [selected, setSelected] = useState(data[0].category_name)
    const [isOpen, setIsOpen] = useState(false)

    const toggleDropdown = () => setIsOpen(!isOpen)

    const handleSelect = (category) => {
        setSelected(category.category_name)
        setValue(category.category_id)
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
                            <Option key={category.category_id} onClick={() => handleSelect(category)}>
                                {category.category_name}
                            </Option>
                        ))}
                    </Options>
                )}
            </SelectBox>
        </Container>
    )
}

export default DefaultSelect
