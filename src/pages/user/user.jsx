import DatePicker from '../../components/datePicker/datePicker'
import Modal from '../../components/modal/modal'
import PageContainer from '../../components/pageContainer/pageContainer'

import { Container } from './styles'

const User = () => {
    return (
        <Modal title={'User'} closeModal={''}>
            <Container>

                {/*
                CRUD
                > name
                > email
                > password
                > avatar image
                */}
            </Container>
        </Modal>
    )
}

export default User