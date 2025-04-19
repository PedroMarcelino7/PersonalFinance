import React from 'react'
import { Box, Close, Container, Content, Header, Subtitle, Title } from './styles'

import CloseIcon from '../../assets/images/icon-close-modal.svg'

const Modal = ({ title, subtitle, children, state }) => {
    const closeModal = () => state(false)

    return (
        <Container onClick={closeModal}>
            <Box onClick={(e) => e.stopPropagation()}>
                <Header>
                    <Title>{title}</Title>

                    <Close src={CloseIcon} alt="" onClick={closeModal} />
                </Header>

                <div>
                    <Subtitle>{subtitle}</Subtitle>
                </div>

                <Content>
                    {children}
                </Content>
            </Box>
        </Container>
    )
}

export default Modal