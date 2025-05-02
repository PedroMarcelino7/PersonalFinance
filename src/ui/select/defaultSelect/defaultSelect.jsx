import React, { useState } from 'react'
import { Container, Label, SelectBox, Selected, Options, Option, ColorDot, ChevronIcon, ThemeBox } from './styles'
import SelectIcon from '../../../assets/images/icon-caret-down.svg'

const DefaultSelect = ({ label = 'Theme', value, setTheme, data }) => {
    const [selected, setSelected] = useState(data[0])
    const [isOpen, setIsOpen] = useState(false)

    const toggleDropdown = () => setIsOpen(!isOpen)

    const handleSelect = (theme) => {
        setSelected(theme)
        setTheme(theme)
        setIsOpen(false)
    }

    return (
        <Container>
            <Label>{label}</Label>

            <SelectBox onClick={toggleDropdown}>
                <Selected>
                    <ThemeBox>
                        <h1>{selected.name}</h1>
                    </ThemeBox>

                    <ChevronIcon src={SelectIcon} alt='' />
                </Selected>
                {isOpen && (
                    <Options>
                        {data.map((theme) => (
                            <Option key={theme.name} onClick={() => handleSelect(theme)}>
                                {theme.name}
                            </Option>
                        ))}
                    </Options>
                )}
            </SelectBox>
        </Container>
    )
}

export default DefaultSelect
