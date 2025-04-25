import React, { useState } from 'react'
import { Container, Label, SelectBox, Selected, Options, Option, ColorDot, ChevronIcon, ThemeBox } from './styles'
import SelectIcon from '../../../assets/images/icon-caret-down.svg'

const themes = [
    { name: 'Green', color: '#2A7D72' },
    { name: 'Red', color: '#C0392B' },
    { name: 'Blue', color: '#2980B9' },
]

const ThemeSelect = ({ label = 'Theme' }) => {
    const [selected, setSelected] = useState(themes[0])
    const [isOpen, setIsOpen] = useState(false)

    const toggleDropdown = () => setIsOpen(!isOpen)
    
    const handleSelect = (theme) => {
        setSelected(theme)
        setIsOpen(false)
    }

    return (
        <Container>
            <Label>{label}</Label>

            <SelectBox onClick={toggleDropdown}>
                <Selected>
                    <ThemeBox>
                        <ColorDot color={selected.color} />
                        <h1>{selected.name}</h1>
                    </ThemeBox>

                    <ChevronIcon src={SelectIcon} alt='' />
                </Selected>
                {isOpen && (
                    <Options>
                        {themes.map((theme) => (
                            <Option key={theme.name} onClick={() => handleSelect(theme)}>
                                <ColorDot color={theme.color} />
                                {theme.name}
                            </Option>
                        ))}
                    </Options>
                )}
            </SelectBox>
        </Container>
    )
}

export default ThemeSelect
