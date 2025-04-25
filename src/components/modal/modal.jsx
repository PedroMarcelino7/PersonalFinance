import React, { createContext, useContext } from 'react'
import { Box, Close, Container, Content, Header, Subtitle, Title } from './styles'

import CloseIcon from '../../assets/images/icon-close-modal.svg'

const ModalContext = createContext();

export const useModal = () => useContext(ModalContext);

const Modal = ({ title, subtitle, children, closeModal }) => {
    return (
        <ModalContext.Provider value={{ closeModal }}>
            <Container onClick={() => closeModal(false)}>
                <Box onClick={(e) => e.stopPropagation()}>
                    <Header>
                        <Title>{title}</Title>

                        <Close src={CloseIcon} alt="" onClick={() => closeModal(false)} />
                    </Header>

                    <div>
                        <Subtitle>{subtitle}</Subtitle>
                    </div>

                    <Content>
                        {children}
                    </Content>
                </Box>
            </Container>
        </ModalContext.Provider>
    )
}

export default Modal