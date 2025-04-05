import React from 'react'
import PageContainer from '../../components/pageContainer/pageContainer'
import { Card, CardContext, CardTitleBox, Column, Container, DetailsButtonBox, Distribution, HeaderBox, MainBox, PotBox, PotDescription, PotDistributionBox, PotDistributionContainer, PotsContainer, ResumeBox } from './styles'
import ArrowIcon from '../../assets/images/icon-caret-right.svg'
import PotIcon from '../../assets/images/icon-pot.svg'

const resumeData = [
    { id: 0, name: 'Current Balance', value: '4836.00' },
    { id: 1, name: 'Income', value: '3814.25' },
    { id: 2, name: 'Expenses', value: '1700.50' },
]

const Overview = () => {
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

                                <DetailsButtonBox>
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
                                        </PotDistributionBox>

                                        <PotDistributionBox>
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

                    <Column width='45%'>
                        <Card>
                            <CardTitleBox>
                                <h2>Budgets</h2>

                                <DetailsButtonBox>
                                    <h5>See Details</h5>

                                    <img src={ArrowIcon} alt="" />
                                </DetailsButtonBox>
                            </CardTitleBox>

                            <CardContext>
                                a
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