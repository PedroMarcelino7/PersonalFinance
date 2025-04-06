import React from 'react'
import PageContainer from '../../components/pageContainer/pageContainer'
import { Button, Card, CardButtons, CardContent, CardHeader, CardTitleBox, Identifier, PotsContainer, Progress, ProgressBar, ProgressBox, ProgressDescription, TotalSavedBox } from './styles'
import OptionsIcon from '../../assets/images/icon-ellipsis.svg'

const Pots = () => {
    return (
        <PageContainer name="Pots">
            <PotsContainer>
                <Card>
                    <CardHeader>
                        <CardTitleBox>
                            <Identifier></Identifier>
                            <h2>Savings</h2>
                        </CardTitleBox>

                        <img src={OptionsIcon} alt="" />
                    </CardHeader>

                    <CardContent>
                        <TotalSavedBox>
                            <h3>Total Saved</h3>

                            <h2>$159.00</h2>
                        </TotalSavedBox>

                        <ProgressBox>
                            <ProgressBar>
                                <Progress />
                            </ProgressBar>
                        </ProgressBox>

                        <ProgressDescription>
                            <h5>50.0%</h5>

                            <h6>Target of $60.00</h6>
                        </ProgressDescription>
                    </CardContent>

                    <CardButtons>
                        <Button>+ Add Money</Button>
                        <Button>Withdraw</Button>
                    </CardButtons>
                </Card>
            </PotsContainer>
        </PageContainer>
    )
}

export default Pots