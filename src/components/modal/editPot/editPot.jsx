import React, { useState, useRef, useEffect } from 'react'
import DefaultInput from '../../input/defaultInput/defaultInput'
import { AditionalInfoContainer, Button, Calendar, CalendarBox, CalendarInput, DateSelected, FormContainer, LinkInputBox } from './styles'
import ThemeSelect from '../../../ui/select/themeSelect/themeSelect'
import { usePots } from '../../../contexts/potsContext'
import { useModal } from '../modal'
import IconCalendar from '../../../assets/images/icon-calendar.svg'
import { useThemes } from '../../../contexts/themesContext'

const EditPot = ({ pot }) => {
    const { refreshPots } = usePots()
    const { closeModal } = useModal()
    const { themes } = useThemes()

    // const themes = [
    //     { name: 'Green', color: '#2A7D72' },
    //     { name: 'Red', color: '#C0392B' },
    //     { name: 'Blue', color: '#2980B9' },
    // ]

    const [name, setName] = useState(pot.pot_name)
    const [target, setTarget] = useState(pot.pot_target)
    const [link, setLink] = useState(pot.pot_link)
    const [date, setDate] = useState(dateFormatter(pot.pot_date))
    const [theme, setTheme] = useState(pot.pot_theme)
    const dateInputRef = useRef(null)

    const handleSubmit = async (e) => {
        e.preventDefault()

        console.log('Pot name:', name)
        console.log('Target:', target)
        console.log('Theme:', theme.color)

        try {
            const response = await fetch('http://localhost:3000/pots/edit', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    pot_name: name,
                    pot_theme: theme.color,
                    pot_target: target,
                    pot_id: pot.pot_id
                })
            });

            const data = await response.json();
            console.log('>>> Resposta Pot Post [Edit Pots Modal]:', data);

            refreshPots()
        } catch (error) {
            console.error('Erro ao editar o pot:', error);
        }

        closeModal()
    }

    function dateFormatter(date) {
        const year = date.slice(0, 4)
        const month = date.slice(5, 7)
        const day = date.slice(8, 10)

        return `${day}/${month}/${year}`
    }

    useEffect(() => {
        console.log(`
        Pot to edit

        ID: ${pot.pot_id}
        Name: ${pot.pot_name}
        Target: ${pot.pot_target}
        Link: ${pot.pot_link}
        Data: ${pot.pot_date}
        Theme: ${pot.pot_theme}
        `)
    }, [])

    return (
        <FormContainer onSubmit={(e) => handleSubmit(e)}>
            <DefaultInput label={'Pot Name'} value={name} setValue={setName} />

            <DefaultInput label={'Target'} value={target} setValue={setTarget} placeholder={'$'} />

            <AditionalInfoContainer>
                <LinkInputBox>
                    <DefaultInput
                        label={'Link'}
                        value={link}
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

            <Button>Edit Pot</Button>
        </FormContainer>
    )
}

export default EditPot