import { useState, useRef, useEffect } from 'react'
import DefaultInput from '../../../input/defaultInput/defaultInput'
import { AditionalInfoContainer, Button, Calendar, CalendarBox, CalendarInput, DateSelected, FormContainer, LinkInputBox } from './styles'
import ThemeSelect from '../../../../ui/select/themeSelect/themeSelect'
import { usePots } from '../../../../contexts/potsContext'
import { useModal } from '../../modal'
import IconCalendar from '../../../../assets/images/icon-calendar.svg'
import { useThemes } from '../../../../contexts/themesContext'
import { toast } from 'react-toastify'

const EditPot = ({ pot }) => {
    const { refreshPots } = usePots()
    const { closeModal } = useModal()
    const { themes, refreshThemes } = useThemes()

    const [name, setName] = useState(pot.pot_name)
    const [target, setTarget] = useState(pot.pot_target)
    const [link, setLink] = useState(pot.pot_link)
    const [date, setDate] = useState(dateFormatter(pot.pot_date))
    const [theme, setTheme] = useState(pot.theme_id)
    const oldTheme = pot.theme_id
    const dateInputRef = useRef(null)

    const handleSubmit = async (e) => {
        e.preventDefault()

        console.log(`
            Pot to EDIT
    
            Name: ${name}
            Target: ${target}
            Link: ${link}
            Date: ${date}
            Theme ID: ${theme}
            Old theme: ${oldTheme}
            Pot ID: ${pot.pot_id}
        `)

        try {
            const response = await fetch('http://localhost:3000/pots/edit', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    pot_name: name,
                    pot_target: target,
                    pot_link: link,
                    pot_date: date,
                    theme_id: theme,
                    oldTheme: oldTheme,
                    pot_id: pot.pot_id
                })
            });

            if (!response.ok) {
                console.error('Erro do servidor:', data);
                toast.error('Error editing pot.');
                return;
            }

            const data = await response.json();
            toast.success('Pot edited successfully.');
            console.log('>>> Resposta Pot Post [Edit Pots Modal]:', data);
        } catch (error) {
            console.error('Erro ao editar o pot:', error);
            toast.error('Error editing pot.');
        }

        refreshThemes()
        refreshPots()
        closeModal()
    }

    function dateFormatter(date) {
        const year = date.slice(0, 4)
        const month = date.slice(5, 7)
        const day = date.slice(8, 10)

        return `${year}-${month}-${day}`
    }

    useEffect(() => {
        console.log(`
        Pot to edit

        ID: ${pot.pot_id}
        Name: ${pot.pot_name}
        Target: ${pot.pot_target}
        Link: ${pot.pot_link}
        Data: ${pot.pot_date}
        Theme: ${pot.theme_id}
        `)

        console.log(pot)
    }, [])

    return (
        <FormContainer onSubmit={(e) => handleSubmit(e)}>
            <DefaultInput
                label={'Pot Name'}
                value={name}
                setValue={setName}
                required={true}
            />

            <DefaultInput
                label={'Target'}
                value={target}
                setValue={setTarget}
                placeholder={'$ 0.00'}
                required={true}
            />

            <AditionalInfoContainer>
                <LinkInputBox>
                    <DefaultInput
                        label={'Link'}
                        value={link}
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

            <ThemeSelect
                label={'Theme'}
                setTheme={setTheme}
                data={themes}
                currentValue={themes.findIndex((theme) => theme.theme_id === pot.theme_id)}
            />

            <Button>Edit Pot</Button>
        </FormContainer>
    )
}

export default EditPot