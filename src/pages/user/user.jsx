import { useState } from 'react'
import DatePicker from '../../components/datePicker/datePicker'
import Modal from '../../components/modal/modal'
import PageContainer from '../../components/pageContainer/pageContainer'
import DefaultInput from '../../ui/input/defaultInput/defaultInput'

import { Container } from './styles'
import PasswordInput from '../../ui/input/passwordInput/passwordInput'

const User = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    return (
        <Modal title={'User'} closeModal={''}>
            <Container>
                <DefaultInput
                    label='Name'
                    value={name}
                    setValue={setName}
                    required
                />

                <DefaultInput
                    label='E-mail'
                    type='email'
                    value={email}
                    setValue={setEmail}
                />

                <PasswordInput
                    label='Password'
                    value={password}
                    setValue={setPassword}
                />


                {/*
                CRUD
                > password
                > avatar image
                */}
            </Container>
        </Modal>
    )
}

export default User