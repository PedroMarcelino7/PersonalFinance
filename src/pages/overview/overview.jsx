import React from 'react'
import PageContainer from '../../components/pageContainer/pageContainer'
import { BudgetsContainer, Card, CardContext, CardTitleBox, ChartContainer, ChartLegend, ChartLegendBox, ChartLegendContainer, ChartOverall, Column, Container, DetailsButtonBox, Distribution, HeaderBox, MainBox, PersonBox, PotBox, PotDescription, PotDistributionBox, PotDistributionContainer, PotsContainer, ProfilePicture, ResumeBox, TransactionDetails, TransactionsBox, TransactionsItem } from './styles'
import ArrowIcon from '../../assets/images/icon-caret-right.svg'
import PotIcon from '../../assets/images/icon-pot.svg'
import { useNavigate } from 'react-router-dom'
import Chart from '../../components/chart/chart'

import Avatar from '../../assets/images/avatars/james-thompson.jpg'

const resumeData = [
    { id: 0, name: 'Current Balance', value: '4836.00' },
    { id: 1, name: 'Income', value: '3814.25' },
    { id: 2, name: 'Expenses', value: '1700.50' },
]

const Overview = () => {
    const navigate = useNavigate()

    return (
        <PageContainer name="Overview">
            <Container>
                <HeaderBox>
                    {resumeData.map((resume) => (
                        <ResumeBox className={resume.id === 0 ? 'highlight' : ''}>
                            <h3>{resume.name}</h3>

                            <h2>${resume.value}</h2>
                        </ResumeBox>
                    ))}
                </HeaderBox>

                <MainBox>
                    <Column width='55%'>
                        <Card>
                            <CardTitleBox>
                                <h2>Pots</h2>

                                <DetailsButtonBox onClick={() => navigate('/pots')}>
                                    <h5>See Details</h5>

                                    <img src={ArrowIcon} alt="" />
                                </DetailsButtonBox>
                            </CardTitleBox>

                            <CardContext>
                                <PotsContainer>
                                    <PotBox>
                                        <figure>
                                            <img src={PotIcon} alt="" />
                                        </figure>

                                        <PotDescription>
                                            <h5>Total saved</h5>

                                            <h4>$850.00</h4>
                                        </PotDescription>
                                    </PotBox>

                                    <PotDistributionContainer>
                                        <PotDistributionBox>
                                            <Distribution>
                                                <h6>Savings</h6>

                                                <h5>$159.00</h5>
                                            </Distribution>

                                            <Distribution>
                                                <h6>Savings</h6>

                                                <h5>$159.00</h5>
                                            </Distribution>

                                            <Distribution>
                                                <h6>Savings</h6>

                                                <h5>$159.00</h5>
                                            </Distribution>

                                            <Distribution>
                                                <h6>Savings</h6>

                                                <h5>$159.00</h5>
                                            </Distribution>

                                            <Distribution>
                                                <h6>Savings</h6>

                                                <h5>$159.00</h5>
                                            </Distribution>

                                            <Distribution>
                                                <h6>Savings</h6>

                                                <h5>$159.00</h5>
                                            </Distribution>
                                        </PotDistributionBox>
                                    </PotDistributionContainer>
                                </PotsContainer>
                            </CardContext>
                        </Card>

                        <Card>
                            <CardTitleBox>
                                <h2>Transactions</h2>

                                <DetailsButtonBox onClick={() => navigate('/transactions')}>
                                    <h5>See Details</h5>

                                    <img src={ArrowIcon} alt="" />
                                </DetailsButtonBox>
                            </CardTitleBox>

                            <CardContext>
                                <TransactionsBox>
                                    <TransactionsItem>
                                        <PersonBox>
                                            <ProfilePicture src={Avatar} alt="" />

                                            <h4>James Thompson</h4>
                                        </PersonBox>

                                        <TransactionDetails color='var(--green)'>
                                            <h5>-$5.00</h5>

                                            <h6>11 Aug 2024</h6>
                                        </TransactionDetails>
                                    </TransactionsItem>

                                    <hr />

                                    <TransactionsItem>
                                        <PersonBox>
                                            <ProfilePicture src={Avatar} alt="" />

                                            <h4>James Thompson</h4>
                                        </PersonBox>

                                        <TransactionDetails>
                                            <h5>-$5.00</h5>

                                            <h6>11 Aug 2024</h6>
                                        </TransactionDetails>
                                    </TransactionsItem>

                                    <hr />

                                    <TransactionsItem>
                                        <PersonBox>
                                            <ProfilePicture src={Avatar} alt="" />

                                            <h4>James Thompson</h4>
                                        </PersonBox>

                                        <TransactionDetails color='var(--red)'>
                                            <h5>-$5.00</h5>

                                            <h6>11 Aug 2024</h6>
                                        </TransactionDetails>
                                    </TransactionsItem>

                                    <hr />

                                    <TransactionsItem>
                                        <PersonBox>
                                            <ProfilePicture src={Avatar} alt="" />

                                            <h4>James Thompson</h4>
                                        </PersonBox>

                                        <TransactionDetails>
                                            <h5>-$5.00</h5>

                                            <h6>11 Aug 2024</h6>
                                        </TransactionDetails>
                                    </TransactionsItem>

                                    <hr />

                                    <TransactionsItem>
                                        <PersonBox>
                                            <ProfilePicture src={Avatar} alt="" />

                                            <h4>James Thompson</h4>
                                        </PersonBox>

                                        <TransactionDetails>
                                            <h5>-$5.00</h5>

                                            <h6>11 Aug 2024</h6>
                                        </TransactionDetails>
                                    </TransactionsItem>
                                </TransactionsBox>
                            </CardContext>
                        </Card>
                    </Column>

                    <Column width='45%'>
                        <Card>
                            <CardTitleBox>
                                <h2>Budgets</h2>

                                <DetailsButtonBox onClick={() => navigate('/budgets')}>
                                    <h5>See Details</h5>

                                    <img src={ArrowIcon} alt="" />
                                </DetailsButtonBox>
                            </CardTitleBox>

                            <CardContext>
                                <BudgetsContainer>
                                    <ChartContainer>
                                        <Chart />

                                        <ChartOverall>
                                            <h2>$338.00</h2>
                                            <h3>of $975.00 limit</h3>
                                        </ChartOverall>
                                    </ChartContainer>

                                    <ChartLegendContainer>
                                        <ChartLegendBox>
                                            <ChartLegend>
                                                <h6>Savings</h6>

                                                <h5>$159.00</h5>
                                            </ChartLegend>

                                            <ChartLegend>
                                                <h6>Savings</h6>

                                                <h5>$159.00</h5>
                                            </ChartLegend>

                                            <ChartLegend>
                                                <h6>Savings</h6>

                                                <h5>$159.00</h5>
                                            </ChartLegend>

                                            <ChartLegend>
                                                <h6>Savings</h6>

                                                <h5>$159.00</h5>
                                            </ChartLegend>

                                            <ChartLegend>
                                                <h6>Savings</h6>

                                                <h5>$159.00</h5>
                                            </ChartLegend>

                                            <ChartLegend>
                                                <h6>Savings</h6>

                                                <h5>$159.00</h5>
                                            </ChartLegend>
                                        </ChartLegendBox>
                                    </ChartLegendContainer>
                                </BudgetsContainer>
                            </CardContext>
                        </Card>

                        <Card>
                            <CardTitleBox>
                                <h2>Recurring Bills</h2>

                                <DetailsButtonBox>
                                    <h5>See Details</h5>

                                    <img src={ArrowIcon} alt="" />
                                </DetailsButtonBox>
                            </CardTitleBox>

                            <CardContext>
                                a
                            </CardContext>
                        </Card>
                    </Column>
                </MainBox>
            </Container>
        </PageContainer>
    )
}

export default Overview