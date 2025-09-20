import { useState } from 'react'

import { toast } from 'react-toastify'

import { AditionalInfoContainer, CalendarBox, DateSelected, FormContainer, LinkInputBox } from './styles'

// COMPONENT
import DatePicker from '../../../datePicker/datePicker'

// UI COMPONENTS
import DefaultInput from '../../../../ui/input/defaultInput/defaultInput'
import DefaultButton from '../../../../ui/button/defaultButton/defaultButton'
import ThemeSelect from '../../../../ui/select/themeSelect/themeSelect'

// CONTEXTS
import { usePots } from '../../../../contexts/potsContext'
import { useThemes } from '../../../../contexts/themesContext'
import { useModal } from '../../modal'

// ICONS
import { CalendarDays as CalendarIcon } from 'lucide-react';

const AddPot = () => {
    const { refreshPots } = usePots()
    const { closeModal } = useModal()
    const { themes, refreshThemes } = useThemes()

    const [name, setName] = useState('')
    const [target, setTarget] = useState(0)
    const [link, setLink] = useState('')
    const [theme, setTheme] = useState(themes[0].theme_id)
    const [date, setDate] = useState(new Date());
    const [showCalendar, setShowCalendar] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()

        console.log(`
            Pot to ADD
    
            Name: ${name}
            Target: ${target}
            Date: ${date}
            Link: ${link}
            Theme ID: ${theme}
        `)

        try {
            const response = await fetch('http://localhost:3000/pots/post', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    pot_name: name,
                    pot_target: target,
                    pot_date: date,
                    pot_link: link,
                    theme_id: theme,
                })
            });

            const data = await response.json();

            if (!response.ok) {
                console.error('Erro do servidor:', data);
                toast.error('Error adding pot.');
                return;
            }

            console.log('>>> Resposta Pot Post [Add Pots Modal]:', data);
            toast.success('Pot added successfully.')
        } catch (error) {
            console.error('Erro ao criar o pot:', error);
            toast.error('Error adding pot.')
        }

        refreshThemes()
        refreshPots()
        closeModal()
    }

    function getTodayDate() {
        const today = new Date()

        const dayAux = today.getDate()
        const day = dayAux < 10 ? `0${dayAux}` : dayAux

        const monthAux = today.getMonth() + 1
        const month = monthAux < 10 ? `0${monthAux}` : monthAux

        const year = today.getFullYear()

        return (`${year}-${month}-${day}`)
    }

    return (
        <FormContainer onSubmit={(e) => handleSubmit(e)}>
            <DefaultInput
                label={'Pot Name'}
                setValue={setName}
                required={true}
            />

            <DefaultInput
                label={'Target'}
                setValue={setTarget}
                placeholder={'$ 0.00'}
                required={true}
            />

            <AditionalInfoContainer>
                <LinkInputBox>
                    <DefaultInput
                        label={'Link'}
                        setValue={setLink}
                        placeholder={'https://'}
                    />
                </LinkInputBox>

                <CalendarBox>
                    <CalendarIcon
                        size={40}
                        color='var(--dark)'
                        strokeWidth={2.25}
                        cursor={'pointer'}
                        onClick={() => setShowCalendar(true)}
                    />

                    {showCalendar &&
                        <DatePicker
                            selected={date}
                            setSelected={setDate}
                            onClick={() => setShowCalendar(false)}
                        />
                    }

                    <DateSelected>
                        {date.toISOString().split("T")[0]}
                    </DateSelected>
                </CalendarBox>
            </AditionalInfoContainer>

            <ThemeSelect label={'Theme'} setTheme={setTheme} data={themes} />

            <DefaultButton
                label="Confirm Addition"
                type="submit"
            />
        </FormContainer>
    )
}

export default AddPot