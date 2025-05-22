import React, { useState, useRef, useEffect } from 'react'
import DefaultInput from '../../input/defaultInput/defaultInput'
import { AditionalInfoContainer, Button, Calendar, CalendarBox, CalendarInput, DateSelected, FormContainer, LinkInputBox } from './styles'
import ThemeSelect from '../../../ui/select/themeSelect/themeSelect'
import { usePots } from '../../../contexts/potsContext'
import { useThemes } from '../../../contexts/themesContext'
import { useModal } from '../modal'
import IconCalendar from '../../../assets/images/icon-calendar.svg'

const AddNewPot = () => {
    const { refreshPots } = usePots()
    const { closeModal } = useModal()
    const { themes } = useThemes()

    // const themes = [
    //     { name: 'Green', color: '#2A7D72' },
    //     { name: 'Red', color: '#C0392B' },
    //     { name: 'Blue', color: '#2980B9' },
    // ]

    const [name, setName] = useState('')
    const [target, setTarget] = useState(0)
    const [link, setLink] = useState('')
    const [date, setDate] = useState('31/12/2025')
    const [theme, setTheme] = useState(themes[0])
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
            console.log('>>> Resposta Pot Post [Add Pots Modal]:', data);

            refreshPots()
        } catch (error) {
            console.error('Erro ao criar o pot:', error);
        }

        closeModal()
    }

    useEffect(() => {
        const today = new Date()
        const day = today.getDate()

        const monthAux = today.getMonth() + 1
        const month = monthAux < 10 ? `0${monthAux}` : monthAux

        const year = today.getFullYear()

        setDate(`${day}/${month}/${year}`)
    }, [])

    return (
        <FormContainer onSubmit={(e) => handleSubmit(e)}>
            <DefaultInput label={'Pot Name'} setValue={setName} />

            <DefaultInput label={'Target'} setValue={setTarget} placeholder={'$'} />

            <AditionalInfoContainer>
                <LinkInputBox>
                    <DefaultInput
                        label={'Link'}
                        setValue={setLink}
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