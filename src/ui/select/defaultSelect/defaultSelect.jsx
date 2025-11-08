import { useEffect, useState } from 'react'
import { Container, Label, SelectBox, Selected, Options, Option, ChevronIcon, ThemeBox, SelectWithButtonDiv } from './styles'
import { ChevronDown as ArrowIcon } from 'lucide-react';

const DefaultSelect = ({ label = '', value, setValue, data, item_id, item_name }) => {
    const [showOptions, setShowOptions] = useState(0)

    const handleSelect = (item) => {
        setValue(item?.[item_id])
        setShowOptions(0)
    }

    const selectedItem = data.find((item) => item[item_id] === value) || data[0];

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

    return (
        <Container>
            <Label>{label}</Label>

            <SelectWithButtonDiv>
                <SelectBox>
                    <Selected onClick={() => setShowOptions(1)}>
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
                    {showOptions !== 0 && (
                        <Options className='dropdown-container'>
                            {data.map((item) => (
                                <Option key={item?.[item_id]} onClick={() => handleSelect(item)}>
                                    {item?.[item_name]}
                                </Option>
                            ))}
                        </Options>
                    )}
                </SelectBox>
            </SelectWithButtonDiv>
        </Container>
    )
}

export default DefaultSelect
