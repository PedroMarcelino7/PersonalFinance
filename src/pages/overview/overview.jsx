import { useEffect } from 'react'

import { BillBox, BudgetsContainer, Card, CardContext, CardTitleBox, ChartContainer, ChartLegend, ChartLegendBox, ChartLegendContainer, ChartOverall, Column, Container, DetailsButtonBox, Distribution, Divider, EmptyPageTextBox, HeaderBox, MainBox, PersonBox, PotBox, PotDescription, PotDistributionBox, PotDistributionContainer, PotsContainer, ProfilePicture, RecurringBillsContainer, ResumeBox, TransactionDetails, TransactionsBox, TransactionsItem } from './styles'

import Chart from '../../components/chart/chart'

import PageContainer from '../../components/pageContainer/pageContainer'
import DetailsButton from '../../ui/button/detailsButton/detailsButton'

import { Archive as PotsIcon } from 'lucide-react'
import Avatar from '../../assets/images/avatars/james-thompson.jpg'

import { usePots } from '../../contexts/potsContext'
import { useBudgets } from '../../contexts/budgetsContext'
import { usePeople } from '../../contexts/peopleContext'
import { useTransactions } from '../../contexts/transactionsContext'
import { useRecurringBills } from '../../contexts/recurringBillsContext'

// ICONS
import { ArchiveRestore as PotsAddIcon } from 'lucide-react'
import { ArchiveX as PotsWithdrawIcon } from 'lucide-react'
import { useOverview } from '../../contexts/overviewContext'

const Overview = () => {
    const { currentBalance } = useOverview()
    const { pots } = usePots()
    const { budgets } = useBudgets()
    const { people } = usePeople()
    const { transactions } = useTransactions()
    const { recurringBills } = useRecurringBills()

    const getPotsTotalSaved = () => {
        const totalSaved = pots
            .filter((pot) => pot.pot_status === 0)
            .reduce((acc, pot) => {
                return acc + parseFloat(pot.pot_quantity)
            }, 0)

        return totalSaved.toFixed(2)
    }

    const orderPotsByQuantity = () => {
        return pots
            .filter((pot) => pot.pot_status === 0)
            .sort((a, b) => parseFloat(b.pot_quantity) - parseFloat(a.pot_quantity))
    }

    const filteredBudgets = () => {
        return budgets.filter((budget) => budget.budget_id !== 1)
    }

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

    const chartData = () => {
        return budgets.filter((budget, index) => index < 6)
    }

    const getDateFormat = (transactionDate) => {
        const date = new Date(transactionDate);
        return date.toLocaleDateString('en-GB', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
        }).replace(',', '');
    };

    const getPaidBills = () => {
        const paidBills = recurringBills.reduce((acc, bill) => {
            return bill.bill_status === 'paid'
                ? acc + (parseFloat(bill.bill_amount) || 0)
                : acc;
        }, 0);

        return paidBills.toFixed(2);
    }

    const getUpcomingBills = () => {
        const upcomingBills = recurringBills.reduce((acc, bill) => {
            return bill.bill_status === 'upcoming'
                ? acc + (parseFloat(bill.bill_amount) || 0)
                : acc;
        }, 0);

        return upcomingBills.toFixed(2);
    }

    const getDueSoonBills = () => {
        const dueSoonBills = recurringBills.reduce((acc, bill) => {
            return bill.bill_status === 'due soon'
                ? acc + (parseFloat(bill.bill_amount) || 0)
                : acc;
        }, 0);

        return dueSoonBills.toFixed(2);
    }

    useEffect(() => {
        console.log('📦 Pots atualizados:', pots)
    }, [pots])

    return (
        <PageContainer name="Overview">
            <Container>
                <HeaderBox>
                    <ResumeBox className={'highlight'}>
                        <h3>Current Balance</h3>

                        <h2>${currentBalance}</h2>
                    </ResumeBox>

                    {/* <ResumeBox>
                        <h3>Available Balance</h3>

                        <h2>${summary.available_balance}</h2>
                    </ResumeBox>

                    <ResumeBox>
                        <h3>Month Expenses</h3>

                        <h2>${summary.month_expenses}</h2>
                    </ResumeBox> */}
                </HeaderBox>

                <MainBox>
                    <Column width='55%'>
                        <Card>
                            <CardTitleBox>
                                <h2>Pots</h2>

                                <DetailsButton
                                    label={'See Details'}
                                    route={'pots'}
                                />
                            </CardTitleBox>

                            {pots.length === 0
                                ? <EmptyPageTextBox>
                                    <h1>You don't have any pot created yet.</h1>
                                    <h2>Start setting aside your money.</h2>
                                </EmptyPageTextBox>
                                : <CardContext>
                                    <PotsContainer>
                                        <PotBox>
                                            <PotsIcon
                                                size={40}
                                                color='var(--green)'
                                                strokeWidth={2}
                                            />

                                            <PotDescription>
                                                <h5>Total saved</h5>

                                                <h4>${getPotsTotalSaved()}</h4>
                                            </PotDescription>
                                        </PotBox>

                                        <PotDistributionContainer>
                                            <PotDistributionBox>
                                                {orderPotsByQuantity().map((pot, index) => (
                                                    index < 4 &&
                                                    <Distribution key={pot.pot_id}
                                                        theme={pot.theme_color}
                                                    >
                                                        <h6>{pot.pot_name}</h6>

                                                        <h5>${pot.pot_quantity}</h5>
                                                    </Distribution>
                                                ))}
                                            </PotDistributionBox>
                                        </PotDistributionContainer>
                                    </PotsContainer>
                                </CardContext>
                            }
                        </Card>

                        <Card>
                            <CardTitleBox>
                                <h2>Transactions</h2>

                                <DetailsButton
                                    label={'See Details'}
                                    route={'transactions'}
                                />
                            </CardTitleBox>

                            {transactions.length === 0
                                ? <EmptyPageTextBox>
                                    <h1>You don't have any transaction yet.</h1>
                                    <h2>Start recording your movements.</h2>
                                </EmptyPageTextBox>
                                : <CardContext>
                                    <TransactionsBox>
                                        {transactions.map((transaction, index, arr) => (
                                            index <= 4 &&
                                            <>
                                                <TransactionsItem key={index}>
                                                    <PersonBox>
                                                        {transaction.pot_id
                                                            ? <>
                                                                {transaction.transaction_type === 0
                                                                    ? <PotsWithdrawIcon
                                                                        size={30}
                                                                        color={'var(--red)'}
                                                                        strokeWidth={2.5}
                                                                    />
                                                                    : <PotsAddIcon
                                                                        size={30}
                                                                        color={'var(--green)'}
                                                                        strokeWidth={2.5}
                                                                    />
                                                                }

                                                                <h4>{transaction.pot_name}</h4>
                                                            </>
                                                            : <>
                                                                <ProfilePicture src={Avatar} alt="" />
                                                                <h4>{people.find((person) => person.person_id === transaction.person_id)?.person_name}</h4>
                                                            </>
                                                        }
                                                    </PersonBox>

                                                    <TransactionDetails
                                                        color={transaction.transaction_type === 0 ? 'var(--red)' : 'var(--green)'}
                                                    >
                                                        <h5>{transaction.transaction_type === 0 && '-'}${transaction.transaction_amount}</h5>

                                                        <h6>{getDateFormat(transaction.transaction_date)}</h6>
                                                    </TransactionDetails>
                                                </TransactionsItem >

                                                {index < 4 && <Divider />}
                                            </>
                                        ))}
                                    </TransactionsBox>
                                </CardContext>
                            }
                        </Card>
                    </Column>

                    <Column width='45%'>
                        <Card>
                            <CardTitleBox>
                                <h2>Budgets</h2>

                                <DetailsButton
                                    label={'See Details'}
                                    route={'budgets'}
                                />
                            </CardTitleBox>

                            {budgets.length <= 1
                                ? <EmptyPageTextBox>
                                    <h1>You don't have any budget yet.</h1>
                                    <h2>Start organizing your expenses.</h2>
                                </EmptyPageTextBox>
                                : <CardContext>
                                    <BudgetsContainer>
                                        <ChartContainer>
                                            <Chart data={chartData()} />

                                            <ChartOverall>
                                                <h2>${getBudgetsSpent()}</h2>
                                                <h3>of ${getBudgetsLimit()} limit</h3>
                                            </ChartOverall>
                                        </ChartContainer>

                                        <ChartLegendContainer>
                                            <ChartLegendBox>
                                                {filteredBudgets().map((budget, index) => (
                                                    index < 6 &&
                                                    <ChartLegend key={budget.budget_id}
                                                        theme={budget.theme_color}
                                                    >
                                                        <h6>{budget.budget_name}</h6>

                                                        <h5>${budget.budget_max}</h5>
                                                    </ChartLegend>
                                                ))}
                                            </ChartLegendBox>
                                        </ChartLegendContainer>
                                    </BudgetsContainer>
                                </CardContext>
                            }
                        </Card>

                        <Card>
                            <CardTitleBox>
                                <h2>Recurring Bills</h2>

                                <DetailsButton
                                    label={'See Details'}
                                    route={'recurring-bills'}
                                />
                            </CardTitleBox>

                            {recurringBills.length === 0
                                ? <EmptyPageTextBox>
                                    <h1>You don't have any recurring bill yet.</h1>
                                    <h2>Start recording your fixed expenses.</h2>
                                </EmptyPageTextBox>
                                : <CardContext>
                                    <RecurringBillsContainer>
                                        <BillBox theme={'#277C78'}>
                                            <h5>Paid Bills</h5>

                                            <h4>${getPaidBills()}</h4>
                                        </BillBox>

                                        <BillBox theme={'#F2CDAC'}>
                                            <h5>Total Upcoming</h5>

                                            <h4>${getUpcomingBills()}</h4>
                                        </BillBox>

                                        <BillBox theme={'#82C9D7'}>
                                            <h5>Due Soon</h5>

                                            <h4>${getDueSoonBills()}</h4>
                                        </BillBox>
                                    </RecurringBillsContainer>
                                </CardContext>
                            }
                        </Card>
                    </Column>
                </MainBox>
            </Container>
        </PageContainer>
    )
}

export default Overview