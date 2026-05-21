import DatePicker from '../../components/datePicker/datePicker'
import Modal from '../../components/modal/modal'
import PageContainer from '../../components/pageContainer/pageContainer'

import { Container } from './styles'

const Settings = () => {
    return (
        <Modal title={'Settings'} closeModal={''}>
            <Container>
                {/*
                THEMES - config
                    CRUD
                    > name
                    > color

                PEOPLE - config
                    CRUD
                    > name
                    > avatar image
                
                DARK/LIGHT mode

                LANGUAGE (R$, $, €)
                */}
            </Container>
        </Modal>
    )
}

export default Settings