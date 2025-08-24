import { useState } from 'react'
import PageContainer from '../../components/pageContainer/pageContainer'
import { Box, BudgetsContainer, Card, CardContent, CardHeader, CardOptionsBox, CardOptionsContainer, CardsContainer, CardTitleBox, ChartBox, ChartContainer, ChartOverall, Container, HeaderButtons, Identifier, LastSpendingBox, LastSpendingContainer, LastSpendingHeader, LastSpendingItem, Option, PersonBox, ProfilePicture, Progress, ProgressBar, ProgressBox, ResumeBox, ResumeItem, SpendDetails, SummaryBox, SummaryContainer, SummaryItem } from './styles'
import Chart from '../../components/chart/chart'
import OptionsIcon from '../../assets/images/icon-ellipsis.svg'
import ArrowIcon from '../../assets/images/icon-caret-right.svg'

import Avatar from '../../assets/images/avatars/james-thompson.jpg'

import AddNewBudget from '../../components/modal/addNewBudget/addNewBudget'
import Modal from '../../components/modal/modal'
import { useCategories } from '../../contexts/categoriesContext'
import { useTransactions } from '../../contexts/transactionsContext'
import EditBudget from '../../components/modal/editBudget/editBudget'

const Budgets = () => {
    const { categories } = useCategories()
    const { transactions } = useTransactions()

    const [selectedBudget, setSelectedBudget] = useState(categories[0])
    const [showAddBudgetModal, setShowAddBudgetModal] = useState(false)
    const [showOptions, setShowOptions] = useState(0)
    const [showEditBudgetModal, setShowEditBudgetModal] = useState(false)
    const [showDeleteBudgetModal, setShowDeleteBudgetModal] = useState(false)

    const handleShowOptions = (category_id) => {
        showOptions === category_id ? setShowOptions(0) : setShowOptions(category_id)
    }

    const handleShowEditBudget = (category) => {
        setSelectedBudget(category)
        setShowOptions(0)
        setShowEditBudgetModal(true)
    }

    const handleShowDeleteBudget = (category) => {
        setSelectedBudget(category)
        setShowOptions(0)
        setShowDeleteBudgetModal(true)
    }

    const chartData = () => {
        return categories.filter((category, index) => index < 6)
    }

    const getBudgetsLimit = () => {
        const budgetsLimit = categories.reduce((acc, category) => {
            return acc + parseFloat(category.category_max)
        }, 0)

        return budgetsLimit.toFixed(2)
    }

    const getBudgetsSpent = () => {
        const budgetsSpent = categories.reduce((acc, category) => {
            return acc + budgetSpentCalc(category.category_id)
        }, 0)

        return budgetsSpent.toFixed(2)
    }

    const getBudgetRemaining = (category) => {
        const spent = budgetSpentCalc(category.category_id)
        const max = parseFloat(category.category_max)

        return (parseFloat(max) - parseFloat(spent)).toFixed(2)
    }

    const getBudgetPercentage = (category) => {
        const spent = budgetSpentCalc(category.category_id)
        const max = parseFloat(category.category_max)

        return ((spent * 100) / max).toFixed(2)
    }

    const handleShowAddBudgetModal = () => {
        setShowAddBudgetModal(true)
    }

    const budgetSpentCalc = (category_id) => {
        return transactions.reduce((acc, transaction) => {
            return (transaction.category_id === category_id && transaction.transaction_type === 0)
                ? acc + parseFloat(transaction.transaction_amount)
                : acc
        }, 0)
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
                                        {categories.map((category, index) => (
                                            <SummaryItem
                                                theme={category.theme_color}
                                            >
                                                <h4>{category.category_name}</h4>

                                                <h3><span>${category.category_spent}</span> of ${category.category_max}</h3>
                                            </SummaryItem>
                                        ))}
                                    </SummaryBox>
                                </SummaryContainer>
                            </ChartContainer>
                        </Box>
                    </Container>

                    <CardsContainer>
                        {categories.map((category, index) => (
                            <Card key={index}>
                                <CardHeader>
                                    <CardTitleBox>
                                        <Identifier theme={category.theme_color} />
                                        <h2>{category.category_name}</h2>
                                    </CardTitleBox>

                                    <CardOptionsContainer>
                                        <img onClick={() => handleShowOptions(category.category_id)} src={OptionsIcon} alt="" />

                                        {(showOptions !== 0 && showOptions === category.category_id) &&
                                            <CardOptionsBox>
                                                <Option onClick={() => handleShowEditBudget(category)}>Edit Budget</Option>
                                                <hr />
                                                <Option onClick={() => handleShowDeleteBudget(category)} color='var(--red)'>Delete Budget</Option>
                                            </CardOptionsBox>
                                        }
                                    </CardOptionsContainer>
                                </CardHeader>

                                <CardContent>
                                    <h3>Maximum of ${category.category_max}</h3>

                                    <ProgressBox>
                                        <ProgressBar>
                                            <Progress width={getBudgetPercentage(category)} theme={category.theme_color} />
                                        </ProgressBar>
                                    </ProgressBox>

                                    <ResumeBox>
                                        <ResumeItem theme={category.theme_color}>
                                            <h6>Spent</h6>

                                            {/* <h5>${category.category_spent}</h5> */}
                                            <h5>${budgetSpentCalc(category.category_id)}</h5>
                                        </ResumeItem>

                                        <ResumeItem color='var(--white)'>
                                            <h6>Remaining</h6>

                                            <h5>${getBudgetRemaining(category)}</h5>
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
                    title={`Add New Category`}
                    subtitle={'Choose a category to set a spending budget. These categories can help you monitor spending.'}
                    closeModal={setShowAddBudgetModal}
                >
                    <AddNewBudget />
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