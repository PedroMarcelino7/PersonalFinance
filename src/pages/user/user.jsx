import { useState } from 'react'

/// STYLES
import { Container } from './styles'

/// COMPONENTS
import Modal from '../../components/modal/modal'

// UI
import DefaultInput from '../../ui/input/defaultInput/defaultInput'
import PasswordInput from '../../ui/input/passwordInput/passwordInput'
import ImageButton from '../../ui/button/imageButton/imageButton'
import DefaultButton from '../../ui/button/defaultButton/defaultButton'

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
                    required
                    />

                {/* <PasswordInput
                    label='Password'
                    value={password}
                    setValue={setPassword}
                    required
                /> */}

                <ImageButton />

                <DefaultButton
                    label='Confirm'
                    type='submit'
                />
            </Container>
        </Modal>
    )
}

export default User