import { useState } from 'react'

import { Box, BudgetsContainer, Card, CardContent, CardHeader, CardOptionsContainer, CardsContainer, CardTitleBox, ChartBox, ChartContainer, ChartOverall, Container, Divider, HeaderButtons, Identifier, LastSpendingBox, LastSpendingContainer, LastSpendingHeader, LastSpendingItem, PersonBox, ProfilePicture, Progress, ProgressBar, ProgressBox, ResumeBox, ResumeItem, SpendDetails, SummaryBox, SummaryContainer, SummaryItem } from './styles'

// COMPONENTS
import PageContainer from '../../components/pageContainer/pageContainer'
import Chart from '../../components/chart/chart'

// UI COMPONENTS
import DetailsButton from '../../ui/button/detailsButton/detailsButton'

// ICONS
import { SquarePen as EditIcon } from 'lucide-react'
import { Trash2 as DeleteIcon } from 'lucide-react'

// IMAGES
import Avatar from '../../assets/images/avatars/james-thompson.jpg'

// CONTEXTS
import { useCategories } from '../../contexts/categoriesContext'
import { useTransactions } from '../../contexts/transactionsContext'

// UTILS
import { formatDate } from '../../utils/formatDate'

// MODAL MANAGER
import BudgetsModalManager from '../../managers/BudgetsModalManager/BudgetsModalManager'

const Budgets = () => {
    const { categories } = useCategories()
    const { transactions } = useTransactions()

    const filteredCategories = categories.filter((category) => category.category_id !== 1);
    const [modal, setModal] = useState({ type: null, category: null });

    const openModal = (type, category = null) => setModal({ type, category });
    const closeModal = () => setModal({ type: null, category: null });

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

    const budgetSpentCalc = (category_id) => {
        return transactions.reduce((acc, transaction) => {
            return (transaction.category_id === category_id && transaction.transaction_type === 0)
                ? acc + parseFloat(transaction.transaction_amount)
                : acc
        }, 0)
    }

    const categoriesWithStats = filteredCategories.map((category) => {
        const spent = budgetSpentCalc(category.category_id);
        const max = parseFloat(category.category_max);
        const remaining = (max - spent).toFixed(2);
        const percentage = ((spent * 100) / max).toFixed(2);

        return {
            ...category,
            spent,
            remaining,
            percentage,
        };
    });

    return (
        <>
            <PageContainer name="Budgets" button={'+ Add New Category'} onClick={() => openModal('add')}>
                <BudgetsContainer>
                    <Container>
                        <Box>
                            <ChartContainer>
                                <ChartBox>
                                    <Chart data={categories} />

                                    <ChartOverall>
                                        <h2>${getBudgetsSpent()}</h2>
                                        <h3>of ${getBudgetsLimit()} limit</h3>
                                    </ChartOverall>
                                </ChartBox>

                                <SummaryContainer>
                                    <h2>Spending Summary</h2>

                                    <SummaryBox>
                                        {categoriesWithStats.slice(0, 6).map((category, index, arr) => (
                                            <>
                                                <SummaryItem
                                                    theme={category.theme_color}
                                                >
                                                    <h4>{category.category_name}</h4>

                                                    <h3><span>${category.spent}</span> of ${category.category_max}</h3>
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
                        {categoriesWithStats.map((category, index) => (
                            <Card key={index}>
                                <CardHeader>
                                    <CardTitleBox>
                                        <Identifier theme={category.theme_color} />
                                        <h2>{category.category_name}</h2>
                                    </CardTitleBox>

                                    <CardOptionsContainer>
                                        <EditIcon
                                            size={25}
                                            color='var(--blue)'
                                            strokeWidth={2.5}
                                            cursor={'pointer'}
                                            onClick={() => openModal("edit", category)}
                                        />

                                        <DeleteIcon
                                            size={25}
                                            color='var(--red)'
                                            strokeWidth={2.5}
                                            cursor={'pointer'}
                                            onClick={() => openModal("delete", category)}
                                        />
                                    </CardOptionsContainer>
                                </CardHeader>

                                <CardContent>
                                    <h3>Maximum of ${category.category_max}</h3>

                                    <ProgressBox>
                                        <ProgressBar>
                                            <Progress width={category.percentage} theme={category.theme_color} />
                                        </ProgressBar>
                                    </ProgressBox>

                                    <ResumeBox>
                                        <ResumeItem theme={category.theme_color}>
                                            <h6>Spent</h6>

                                            <h5>${category.spent}</h5>
                                        </ResumeItem>

                                        <ResumeItem color='var(--white)'>
                                            <h6>Remaining</h6>

                                            <h5>${category.remaining}</h5>
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
                                            {transactions.map((transaction) => (
                                                transaction.category_id === category.category_id &&
                                                <LastSpendingItem>
                                                    <PersonBox>
                                                        <ProfilePicture src={Avatar} alt="" />

                                                        <h4>{transaction.person_name}</h4>
                                                    </PersonBox>

                                                    <SpendDetails type={transaction.transaction_type}>
                                                        <h5>{transaction.transaction_type === 0 ? '-' : ''}${transaction.transaction_amount}</h5>

                                                        <h6>{formatDate(transaction.transaction_date)}</h6>
                                                    </SpendDetails>
                                                </LastSpendingItem>
                                            ))}
                                        </LastSpendingBox>
                                    </LastSpendingContainer>
                                </CardContent>
                            </Card>
                        ))}
                    </CardsContainer>
                </BudgetsContainer>
            </PageContainer>

            <BudgetsModalManager modal={modal} onClose={closeModal} />
        </>
    )
}

export default Budgets