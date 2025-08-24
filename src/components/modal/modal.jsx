import { createContext, useContext } from 'react'
import { Box, Close, Container, Content, Header, Subtitle, Title } from './styles'

import { X as CloseIcon } from 'lucide-react'

const ModalContext = createContext();

export const useModal = () => useContext(ModalContext);

const Modal = ({ title, subtitle, children, closeModal }) => {
    return (
        <ModalContext.Provider value={{ closeModal }}>
            <Container onClick={() => closeModal(false)}>
                <Box onClick={(e) => e.stopPropagation()}>
                    <Header>
                        <Title>{title}</Title>

                        <CloseIcon
                            size={30}
                            color='var(--dark)'
                            strokeWidth={2.5}
                            cursor={'pointer'}
                            onClick={() => closeModal(false)}
                        />
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