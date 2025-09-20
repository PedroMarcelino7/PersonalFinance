import { Container, Content, Header, Title, TitleBox } from './styles'

// ICONS
import { CircleQuestionMark as HelpIcon } from 'lucide-react';

// UI COMPONENTS
import DefaultButton from '../../ui/button/defaultButton/defaultButton'

const PageContainer = ({ name, children, button, buttonClick }) => {
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
                        // onClick={helpClick}
                        />
                    </TitleBox>

                    {button &&
                        <DefaultButton
                            label={button}
                            onClick={buttonClick}
                        />
                    }
                </Header>

                {children}
            </Content>
        </Container>
    )
}

export default PageContainer