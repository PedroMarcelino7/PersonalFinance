import React from 'react'
import PageContainer from '../../components/pageContainer/pageContainer'
import { BudgetsContainer, Card, CardContent, CardHeader, CardsContainer, CardTitleBox, ChartBox, ChartContainer, ChartOverall, Container, HeaderButtons, Identifier, LastSpendingBox, LastSpendingContainer, LastSpendingHeader, LastSpendingItem, PersonBox, ProfilePicture, Progress, ProgressBar, ProgressBox, ResumeBox, ResumeItem, SpendDetails, SummaryBox, SummaryContainer, SummaryItem } from './styles'
import Chart from '../../components/chart/chart'
import OptionsIcon from '../../assets/images/icon-ellipsis.svg'
import ArrowIcon from '../../assets/images/icon-caret-right.svg'

import Avatar from '../../assets/images/avatars/james-thompson.jpg'

const Budgets = () => {
    return (
        <PageContainer name="Budgets">
            <BudgetsContainer>
                <Container>
                    <ChartContainer>
                        <ChartBox>
                            <Chart />

                            <ChartOverall>
                                <h2>$338.00</h2>
                                <h3>of $975.00 limit</h3>
                            </ChartOverall>
                        </ChartBox>

                        <SummaryContainer>
                            <h2>Spending Summary</h2>

                            <SummaryBox>
                                <SummaryItem>
                                    <h4>Entertainment</h4>

                                    <h3><span>$15.00</span> of $50.00</h3>
                                </SummaryItem>

                                <hr />

                                <SummaryItem>
                                    <h4>Entertainment</h4>

                                    <h3><span>$15.00</span> of $50.00</h3>
                                </SummaryItem>

                                <hr />

                                <SummaryItem>
                                    <h4>Entertainment</h4>

                                    <h3><span>$15.00</span> of $50.00</h3>
                                </SummaryItem>

                                <hr />

                                <SummaryItem>
                                    <h4>Entertainment</h4>

                                    <h3><span>$15.00</span> of $50.00</h3>
                                </SummaryItem>
                            </SummaryBox>
                        </SummaryContainer>
                    </ChartContainer>
                </Container>

                <CardsContainer>
                    <Card>
                        <CardHeader>
                            <CardTitleBox>
                                <Identifier></Identifier>
                                <h2>Entertainment</h2>
                            </CardTitleBox>

                            <img src={OptionsIcon} alt="" />
                        </CardHeader>

                        <CardContent>
                            <h3>Maximum of $50.00</h3>

                            <ProgressBox>
                                <ProgressBar>
                                    <Progress />
                                </ProgressBar>
                            </ProgressBox>

                            <ResumeBox>
                                <ResumeItem color='red'>
                                    <h6>Spent</h6>

                                    <h5>$159.00</h5>
                                </ResumeItem>

                                <ResumeItem color='var(--white)'>
                                    <h6>Remaining</h6>

                                    <h5>$159.00</h5>
                                </ResumeItem>
                            </ResumeBox>

                            <LastSpendingContainer>
                                <LastSpendingHeader>
                                    <h2>Latest Spending</h2>

                                    <HeaderButtons>
                                        <h5>See Details</h5>

                                        <img src={ArrowIcon} alt="" />
                                    </HeaderButtons>
                                </LastSpendingHeader>

                                <LastSpendingBox>
                                    <LastSpendingItem>
                                        <PersonBox>
                                            <ProfilePicture src={Avatar} alt="" />

                                            <h4>James Thompson</h4>
                                        </PersonBox>

                                        <SpendDetails>
                                            <h5>-$5.00</h5>

                                            <h6>11 Aug 2024</h6>
                                        </SpendDetails>
                                    </LastSpendingItem>

                                    <hr />

                                    <LastSpendingItem>
                                        <PersonBox>
                                            <ProfilePicture src={Avatar} alt="" />

                                            <h4>James Thompson</h4>
                                        </PersonBox>

                                        <SpendDetails>
                                            <h5>-$5.00</h5>

                                            <h6>11 Aug 2024</h6>
                                        </SpendDetails>
                                    </LastSpendingItem>

                                    <hr />

                                    <LastSpendingItem>
                                        <PersonBox>
                                            <ProfilePicture src={Avatar} alt="" />

                                            <h4>James Thompson</h4>
                                        </PersonBox>

                                        <SpendDetails>
                                            <h5>-$5.00</h5>

                                            <h6>11 Aug 2024</h6>
                                        </SpendDetails>
                                    </LastSpendingItem>
                                </LastSpendingBox>
                            </LastSpendingContainer>
                        </CardContent>
                    </Card>
                </CardsContainer>
            </BudgetsContainer>
        </PageContainer>
    )
}

export default Budgets