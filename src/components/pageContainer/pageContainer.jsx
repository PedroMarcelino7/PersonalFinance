import React from 'react'
import { Container, Title } from './styles'

const PageContainer = ({ name, children }) => {
    return (
        <Container>
            <Title>{name}</Title>

            {children}
        </Container>
    )
}

export default PageContainer