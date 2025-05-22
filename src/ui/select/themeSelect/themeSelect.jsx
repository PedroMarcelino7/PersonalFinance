import React, { useState } from 'react'
import { Container, Label, SelectBox, Selected, Options, Option, ColorDot, ChevronIcon, ThemeBox } from './styles'
import SelectIcon from '../../../assets/images/icon-caret-down.svg'

const ThemeSelect = ({ label = 'Theme', value, setTheme, data }) => {
    const [selected, setSelected] = useState(data[0])
    const [isOpen, setIsOpen] = useState(false)

    const toggleDropdown = () => setIsOpen(!isOpen)

    const handleSelect = (theme) => {
        setSelected(theme)
        setTheme(theme.theme_id)
        setIsOpen(false)
    }

    return (
        <Container>
            <Label>{label}</Label>

            <SelectBox onClick={toggleDropdown}>
                <Selected>
                    <ThemeBox>
                        <ColorDot color={selected.theme_color} />
                        <h1>{selected.theme_name}</h1>
                    </ThemeBox>

                    <ChevronIcon src={SelectIcon} alt='' />
                </Selected>
                {isOpen && (
                    <Options>
                        {data.map((theme) => (
                            <Option key={theme.theme_id} onClick={() => handleSelect(theme)}>
                                <ColorDot color={theme.theme_color} />
                                {theme.theme_name}
                            </Option>
                        ))}
                    </Options>
                )}
            </SelectBox>
        </Container>
    )
}

export default ThemeSelect
