import React from 'react'
import { Container, Content, Title } from './styles'

const PageContainer = ({ name, children }) => {
    return (
        <Container>
            <Content>
                <Title>{name}</Title>

                {children}
            </Content>
        </Container>
    )
}

export default PageContainer