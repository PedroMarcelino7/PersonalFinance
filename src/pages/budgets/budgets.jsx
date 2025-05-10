import React, { useState } from 'react'
import PageContainer from '../../components/pageContainer/pageContainer'
import { Box, BudgetsContainer, Card, CardContent, CardHeader, CardOptionsBox, CardOptionsContainer, CardsContainer, CardTitleBox, ChartBox, ChartContainer, ChartOverall, Container, HeaderButtons, Identifier, LastSpendingBox, LastSpendingContainer, LastSpendingHeader, LastSpendingItem, Option, PersonBox, ProfilePicture, Progress, ProgressBar, ProgressBox, ResumeBox, ResumeItem, SpendDetails, SummaryBox, SummaryContainer, SummaryItem } from './styles'
import Chart from '../../components/chart/chart'
import OptionsIcon from '../../assets/images/icon-ellipsis.svg'
import ArrowIcon from '../../assets/images/icon-caret-right.svg'

import Avatar from '../../assets/images/avatars/james-thompson.jpg'

import { useBudgets } from '../../contexts/budgetsContext'
import AddNewBudget from '../../components/modal/addNewBudget/addNewBudget'
import Modal from '../../components/modal/modal'
import { useCategories } from '../../contexts/categoriesContext'
import EditBudget from '../../components/modal/editBudget/editBudget'

const Budgets = () => {
    const { budgets } = useBudgets()
    const { categories } = useCategories()
    const [selectedBudget, setSelectedBudget] = useState(budgets[0])
    const [showAddBudgetModal, setShowAddBudgetModal] = useState(false)
    const [showOptions, setShowOptions] = useState(0)
    const [showEditBudgetModal, setShowEditBudgetModal] = useState(false)
    const [showDeleteBudgetModal, setShowDeleteBudgetModal] = useState(false)

    const handleShowOptions = (budget_id) => {
        showOptions === budget_id ? setShowOptions(0) : setShowOptions(budget_id)
    }

    const handleShowEditBudget = (budget) => {
        setSelectedBudget(budget)
        setShowOptions(0)
        setShowEditBudgetModal(true)
    }

    const handleShowDeleteBudget = (budget) => {
        setSelectedBudget(budget)
        setShowOptions(0)
        setShowDeleteBudgetModal(true)
    }

    const chartData = () => {
        return budgets.filter((budget, index) => index < 6)
    }

    const getBudgetsLimit = () => {
        const budgetsLimit = budgets.reduce((acc, budget) => {
            return acc + parseFloat(budget.budget_max)
        }, 0)

        return budgetsLimit.toFixed(2)
    }

    const getBudgetsSpent = () => {
        const budgetsSpent = budgets.reduce((acc, budget) => {
            return acc + parseFloat(budget.budget_spent)
        }, 0)

        return budgetsSpent.toFixed(2)
    }

    const getBudgetRemaining = (budget) => {
        const spent = parseFloat(budget.budget_spent)
        const max = parseFloat(budget.budget_max)

        return (parseFloat(max) - parseFloat(spent)).toFixed(2)
    }

    const getBudgetPercentage = (budget) => {
        const spent = parseFloat(budget.budget_spent)
        const max = parseFloat(budget.budget_max)

        return ((spent * 100) / max).toFixed(2)
    }

    const handleShowAddBudgetModal = () => {
        setShowAddBudgetModal(true)
    }

    return (
        <>
            <PageContainer name="Budgets" button={'+ Add New Budget'} onClick={handleShowAddBudgetModal}>
                <BudgetsContainer>
                    <Container>
                        <Box>
                            <ChartContainer>
                                <ChartBox>
                                    <Chart data={chartData()} />

                                    <ChartOverall>
                                        <h2>${getBudgetsSpent()}</h2>
                                        <h3>of ${getBudgetsLimit()} limit</h3>
                                    </ChartOverall>
                                </ChartBox>

                                <SummaryContainer>
                                    <h2>Spending Summary</h2>

                                    <SummaryBox>
                                        {budgets.map((budget, index) => (
                                            index <= 5 &&
                                            <>
                                                <SummaryItem
                                                    theme={budget.budget_theme}
                                                >
                                                    <h4>{categories.find((category) => category.category_id === budget.category_id)?.category_name}</h4>

                                                    <h3><span>${budget.budget_spent}</span> of ${budget.budget_max}</h3>
                                                </SummaryItem>
                                                {index != 5 && <hr />}
                                            </>
                                        ))}
                                    </SummaryBox>
                                </SummaryContainer>
                            </ChartContainer>
                        </Box>
                    </Container>

                    <CardsContainer>
                        {budgets.map((budget, index) => (
                            <Card key={index}>
                                <CardHeader>
                                    <CardTitleBox>
                                        <Identifier theme={budget.budget_theme} />
                                        <h2>{categories.find((category) => category.category_id === budget.category_id)?.category_name}</h2>
                                    </CardTitleBox>

                                    <CardOptionsContainer>
                                        <img onClick={() => handleShowOptions(budget.budget_id)} src={OptionsIcon} alt="" />

                                        {(showOptions !== 0 && showOptions === budget.budget_id) &&
                                            <CardOptionsBox>
                                                <Option onClick={() => handleShowEditBudget(budget)}>Edit Budget</Option>
                                                <hr />
                                                <Option onClick={() => handleShowDeleteBudget(budget)} color='var(--red)'>Delete Budget</Option>
                                            </CardOptionsBox>
                                        }
                                    </CardOptionsContainer>
                                </CardHeader>

                                <CardContent>
                                    <h3>Maximum of ${budget.budget_max}</h3>

                                    <ProgressBox>
                                        <ProgressBar>
                                            <Progress width={getBudgetPercentage(budget)} theme={budget.budget_theme} />
                                        </ProgressBar>
                                    </ProgressBox>

                                    <ResumeBox>
                                        <ResumeItem theme={budget.budget_theme}>
                                            <h6>Spent</h6>

                                            <h5>${budget.budget_spent}</h5>
                                        </ResumeItem>

                                        <ResumeItem color='var(--white)'>
                                            <h6>Remaining</h6>

                                            <h5>${getBudgetRemaining(budget)}</h5>
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
                        ))}
                    </CardsContainer>
                </BudgetsContainer>
            </PageContainer>

            {showAddBudgetModal &&
                <Modal
                    title={`Add New Budget`}
                    subtitle={'Choose a category to set a spending budget. These categories can help you monitor spending.'}
                    closeModal={setShowAddBudgetModal}
                >
                    <AddNewBudget data={categories} />
                </Modal>
            }

            {showEditBudgetModal &&
                <Modal
                    title={`Edit Budget`}
                    subtitle={'As your budgets change, feel free to update your spending limits.'}
                    closeModal={setShowEditBudgetModal}
                >
                    <EditBudget data={categories} budget={selectedBudget} />
                </Modal>
            }
        </>
    )
}

export default Budgets