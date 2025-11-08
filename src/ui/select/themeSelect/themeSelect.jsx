import { useEffect, useState } from 'react'

import { Container, Label, SelectBox, Selected, Options, Option, ColorDot, ChevronIcon, ThemeBox } from './styles'

// ICONS
import { ChevronDown as ArrowIcon } from 'lucide-react';

const ThemeSelect = ({ label = 'Theme', setTheme, data, currentValue }) => {
    const [selected, setSelected] = useState(currentValue ? data[currentValue] : data[0])
    const [showOptions, setShowOptions] = useState(0)

    useEffect(() => {
        const handleCloseOptions = (e) => {
            if (!e.target.closest('.dropdown-container')) {
                setShowOptions(0)
            }
        }

        document.addEventListener('mousedown', handleCloseOptions);

        return () => {
            document.removeEventListener('mousedown', handleCloseOptions);
        };
    }, [])

    const handleSelect = (theme) => {
        setSelected(theme)
        setTheme(theme.theme_id)
        setShowOptions(0)
    }

    return (
        <Container>
            <Label>{label}</Label>

            <SelectBox>
                <Selected onClick={() => setShowOptions(1)}>
                    <ThemeBox>
                        <ColorDot color={selected.theme_color} />
                        <h1>{selected.theme_name}</h1>
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
                {showOptions !== 0 && (
                    <Options className='dropdown-container'>
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
