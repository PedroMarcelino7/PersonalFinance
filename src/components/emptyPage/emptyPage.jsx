import { EmptyPageContainer, EmptyPageTextBox } from "./styles"

import DefaultButton from "../../ui/button/defaultButton/defaultButton"

const EmptyPage = ({ title, subtitle, button, onClick }) => {
    return (
        <EmptyPageContainer>
            <EmptyPageTextBox>
                <h1>{title}</h1>
                <h2>{subtitle}</h2>
            </EmptyPageTextBox>

            {button &&
                <div>
                    <DefaultButton
                        label={button}
                        color="dark"
                        size="large"
                        onClick={onClick}
                    />
                </div>
            }
        </EmptyPageContainer>
    )
}

export default EmptyPage