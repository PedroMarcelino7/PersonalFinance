import React from 'react'
import { Button, Container, Content, Header, Title } from './styles'

const PageContainer = ({ name, children, button, onClick }) => {
    return (
        <Container>
            <Content>
                <Header>
                    <Title>{name}</Title>

                    {button &&
                        <Button onClick={onClick}>{button}</Button>
                    }
                </Header>

                {children}
            </Content>
        </Container>
    )
}

export default PageContainer