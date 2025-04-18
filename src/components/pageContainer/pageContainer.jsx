import React from 'react'
import { Button, Container, Content, Header, Title } from './styles'

const PageContainer = ({ name, children, button }) => {
    return (
        <Container>
            <Content>
                <Header>
                    <Title>{name}</Title>

                    <Button>{button}</Button>
                </Header>

                {children}
            </Content>
        </Container>
    )
}

export default PageContainer