import { useState } from 'react'

import { Box, BudgetsContainer, Card, CardContent, CardHeader, CardOptionsContainer, CardsContainer, CardTitleBox, ChartBox, ChartContainer, ChartOverall, Container, Divider, EmptyLatestSpendingBox, EmptyPageContainer, EmptyPageTextBox, FirstBudgetButton, HeaderButtons, Identifier, LastSpendingBox, LastSpendingContainer, LastSpendingHeader, LastSpendingItem, PersonBox, ProfilePicture, Progress, ProgressBar, ProgressBox, ResumeBox, ResumeItem, SpendDetails, SummaryBox, SummaryContainer, SummaryItem } from './styles'

// COMPONENTS
import PageContainer from '../../components/pageContainer/pageContainer'
import Chart from '../../components/chart/chart'
import EmptyPage from '../../components/emptyPage/emptyPage'

// UI COMPONENTS
import DetailsButton from '../../ui/button/detailsButton/detailsButton'

// ICONS
import { SquarePen as EditIcon } from 'lucide-react'
import { Trash2 as DeleteIcon } from 'lucide-react'

// IMAGES
import Avatar from '../../assets/images/avatars/james-thompson.jpg'

// CONTEXTS
import { useBudgets } from '../../contexts/budgetsContext'
import { useTransactions } from '../../contexts/transactionsContext'

// UTILS
import { formatDate } from '../../utils/formatDate'

// MODAL MANAGER
import BudgetsModalManager from '../../managers/BudgetsModalManager/BudgetsModalManager'

const Budgets = () => {
    const { budgets } = useBudgets()
    const { transactions } = useTransactions()

    const filteredBudgets = budgets.filter((budget) => budget.budget_id !== 1);
    const [modal, setModal] = useState({ type: null, budget: null });

    const openModal = (type, budget = null) => setModal({ type, budget });
    const closeModal = () => setModal({ type: null, budget: null });

    const getBudgetsLimit = () => {
        const budgetsLimit = budgets.reduce((acc, budget) => {
            return acc + parseFloat(budget.budget_max)
        }, 0)

        return budgetsLimit.toFixed(2)
    }

    const getBudgetsSpent = () => {
        const budgetsSpent = budgets.reduce((acc, budget) => {
            return acc + budgetSpentCalc(budget.budget_id)
        }, 0)

        return budgetsSpent.toFixed(2)
    }

    const budgetSpentCalc = (budget_id) => {
        return transactions.reduce((acc, transaction) => {
            return (transaction.budget_id === budget_id && transaction.transaction_type === 0)
                ? acc + parseFloat(transaction.transaction_amount)
                : acc
        }, 0)
    }

    const budgetsWithStats = filteredBudgets.map((budget) => {
        const spent = budgetSpentCalc(budget.budget_id);
        const max = parseFloat(budget.budget_max);
        const remaining = (max - spent).toFixed(2);
        const percentage = ((spent * 100) / max).toFixed(2);

        return {
            ...budget,
            spent,
            remaining,
            percentage,
        };
    });

    return (
        <>
            <PageContainer
                name="Budgets"
                button={budgets.length <= 1 ? '' : '+ Add Budget'}
                buttonClick={() => openModal('add')}
            >
                {budgets.length <= 1
                    ? <EmptyPage
                        title="You don't have any budget yet."
                        subtitle="Start organizing your expenses."
                        button="Create your first budget"
                        onClick={() => openModal('add')}
                    />
                    : <BudgetsContainer>
                        <Container>
                            <Box>
                                <ChartContainer>
                                    <ChartBox>
                                        <Chart data={budgets} />

                                        <ChartOverall>
                                            <h2>${getBudgetsSpent()}</h2>
                                            <h3>of ${getBudgetsLimit()} limit</h3>
                                        </ChartOverall>
                                    </ChartBox>

                                    <SummaryContainer>
                                        <h2>Spending Summary</h2>

                                        <SummaryBox>
                                            {budgetsWithStats.slice(0, 6).map((budget, index, arr) => (
                                                <>
                                                    <SummaryItem
                                                        theme={budget.theme_color}
                                                    >
                                                        <h4>{budget.budget_name}</h4>

                                                        <h3><span>${budget.spent}</span> of ${budget.budget_max}</h3>
                                                    </SummaryItem>

                                                    {index < arr.length - 1 && <Divider />}
                                                </>
                                            ))}
                                        </SummaryBox>
                                    </SummaryContainer>
                                </ChartContainer>
                            </Box>
                        </Container>

                        <CardsContainer>
                            {budgetsWithStats.map((budget, index) => (
                                <Card key={index}>
                                    <CardHeader>
                                        <CardTitleBox>
                                            <Identifier theme={budget.theme_color} />
                                            <h2>{budget.budget_name}</h2>
                                        </CardTitleBox>

                                        <CardOptionsContainer>
                                            <EditIcon
                                                size={25}
                                                color='var(--blue)'
                                                strokeWidth={2.5}
                                                cursor={'pointer'}
                                                onClick={() => openModal("edit", budget)}
                                            />

                                            <DeleteIcon
                                                size={25}
                                                color='var(--red)'
                                                strokeWidth={2.5}
                                                cursor={'pointer'}
                                                onClick={() => openModal("delete", budget)}
                                            />
                                        </CardOptionsContainer>
                                    </CardHeader>

                                    <CardContent>
                                        <h3>Maximum of ${budget.budget_max}</h3>

                                        <ProgressBox>
                                            <ProgressBar>
                                                <Progress width={budget.percentage} theme={budget.theme_color} />
                                            </ProgressBar>
                                        </ProgressBox>

                                        <ResumeBox>
                                            <ResumeItem theme={budget.theme_color}>
                                                <h6>Spent</h6>

                                                <h5>${budget.spent}</h5>
                                            </ResumeItem>

                                            <ResumeItem color='var(--white)'>
                                                <h6>Remaining</h6>

                                                <h5>${budget.remaining}</h5>
                                            </ResumeItem>
                                        </ResumeBox>

                                        <LastSpendingContainer>
                                            <LastSpendingHeader>
                                                <h2>Latest Spending</h2>

                                                <DetailsButton
                                                    label={'See Details'}
                                                    route={'transactions'}
                                                />
                                            </LastSpendingHeader>

                                            <LastSpendingBox>
                                                {transactions.filter(transaction => transaction.budget_id === budget.budget_id).length > 0 ? (
                                                    transactions
                                                        .filter(transaction => transaction.budget_id === budget.budget_id)
                                                        .map(transaction => (
                                                            <LastSpendingItem key={transaction.transaction_id}>
                                                                <PersonBox>
                                                                    <ProfilePicture src={Avatar} alt="" />
                                                                    <h4>{transaction.person_name}</h4>
                                                                </PersonBox>

                                                                <SpendDetails type={transaction.transaction_type}>
                                                                    <h5>
                                                                        {transaction.transaction_type === 0 ? '-' : ''}${transaction.transaction_amount}
                                                                    </h5>
                                                                    <h6>{formatDate(transaction.transaction_date)}</h6>
                                                                </SpendDetails>
                                                            </LastSpendingItem>
                                                        ))
                                                ) : (
                                                    <EmptyLatestSpendingBox>
                                                        <h1>No expenses related to this budget.</h1>
                                                    </EmptyLatestSpendingBox>
                                                )}
                                            </LastSpendingBox>
                                        </LastSpendingContainer>
                                    </CardContent>
                                </Card>
                            ))}
                        </CardsContainer>
                    </BudgetsContainer>
                }
            </PageContainer>

            <BudgetsModalManager modal={modal} onClose={closeModal} />
        </>
    )
}

export default Budgets