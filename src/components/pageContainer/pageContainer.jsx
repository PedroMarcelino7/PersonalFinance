import { Button, Container, Content, Header, Title, TitleBox } from './styles'
import { CircleQuestionMark as HelpIcon } from 'lucide-react';

const PageContainer = ({ name, children, button, onClick }) => {
    return (
        <Container>
            <Content>
                <Header>
                    <TitleBox>
                        <Title>{name}</Title>

                        <HelpIcon
                            size={20}
                            color='var(--dark)'
                            strokeWidth={2.5}
                            cursor={'pointer'}
                        // onClick={}
                        />
                    </TitleBox>

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