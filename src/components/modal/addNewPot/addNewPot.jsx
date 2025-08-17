import React, { useState, useRef, useEffect } from 'react'
import DefaultInput from '../../input/defaultInput/defaultInput'
import { AditionalInfoContainer, Button, Calendar, CalendarBox, CalendarInput, DateSelected, FormContainer, LinkInputBox } from './styles'
import ThemeSelect from '../../../ui/select/themeSelect/themeSelect'
import { usePots } from '../../../contexts/potsContext'
import { useThemes } from '../../../contexts/themesContext'
import { useModal } from '../modal'
import IconCalendar from '../../../assets/images/icon-calendar.svg'
import { toast } from 'react-toastify'

const AddNewPot = () => {
    const { refreshPots } = usePots()
    const { closeModal } = useModal()
    const { themes, refreshThemes } = useThemes()

    const [name, setName] = useState('')
    const [target, setTarget] = useState(0)
    const [link, setLink] = useState('')
    const [date, setDate] = useState(() => getTodayDate())
    const [theme, setTheme] = useState(themes[0].theme_id)
    const dateInputRef = useRef(null)

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
                    <Calendar
                        src={IconCalendar}
                        alt=""
                    />

                    <CalendarInput
                        type="date"
                        ref={dateInputRef}
                        onChange={(e) => setDate(e.target.value)}
                    />

                    <DateSelected>{date}</DateSelected>
                </CalendarBox>
            </AditionalInfoContainer>

            <ThemeSelect label={'Theme'} setTheme={setTheme} data={themes} />

            <Button>Add Pot</Button>
        </FormContainer>
    )
}

export default AddNewPot