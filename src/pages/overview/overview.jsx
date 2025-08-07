import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { BillBox, BudgetsContainer, Card, CardContext, CardTitleBox, ChartContainer, ChartLegend, ChartLegendBox, ChartLegendContainer, ChartOverall, Column, Container, DetailsButtonBox, Distribution, HeaderBox, MainBox, PersonBox, PotBox, PotDescription, PotDistributionBox, PotDistributionContainer, PotsContainer, ProfilePicture, RecurringBillsContainer, ResumeBox, TransactionDetails, TransactionsBox, TransactionsItem } from './styles'

import Chart from '../../components/chart/chart'

import PageContainer from '../../components/pageContainer/pageContainer'

import ArrowIcon from '../../assets/images/icon-caret-right.svg'
import PotIcon from '../../assets/images/icon-pot.svg'
import Avatar from '../../assets/images/avatars/james-thompson.jpg'

import { usePots } from '../../contexts/potsContext'
import { useBudgets } from '../../contexts/budgetsContext'
import { usePeople } from '../../contexts/peopleContext'
import { useTransactions } from '../../contexts/transactionsContext'
import { useRecurringBills } from '../../contexts/recurringBillsContext'

const resumeData = [
    { id: 0, name: 'Current Balance', value: '4836.00' },
    { id: 1, name: 'Available Balance', value: '3814.25' },
    { id: 2, name: 'Month Expenses', value: '1700.50' },
]

const Overview = () => {
    const navigate = useNavigate()

    const { pots } = usePots()
    const { budgets } = useBudgets()
    const { people } = usePeople()
    const { transactions } = useTransactions()
    const { recurringBills } = useRecurringBills()

    const getPotsTotalSaved = () => {
        const totalSaved = pots.reduce((acc, pot) => {
            return acc + parseFloat(pot.pot_quantity)
        }, 0)

        return totalSaved.toFixed(2)
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
                    {resumeData.map((resume, index) => (
                        <ResumeBox key={index} className={resume.id === 0 ? 'highlight' : ''}>
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

                                            <h4>${getPotsTotalSaved()}</h4>
                                        </PotDescription>
                                    </PotBox>

                                    <PotDistributionContainer>
                                        <PotDistributionBox>
                                            {pots.map((pot, index) => (
                                                index < 4 &&
                                                <Distribution key={pot.pot_id}
                                                    theme={pot.pot_theme}
                                                >
                                                    <h6>{pot.pot_name}</h6>

                                                    <h5>${pot.pot_quantity}</h5>
                                                </Distribution>
                                            ))}
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
                                    {transactions.map((transaction, index) => (
                                        index <= 4 &&
                                        <>
                                            <TransactionsItem key={index}>
                                                <PersonBox>
                                                    <ProfilePicture src={Avatar} alt="" />

                                                    <h4>{people.find((person) => person.person_id === transaction.person_id)?.person_name}</h4>
                                                </PersonBox>

                                                <TransactionDetails
                                                    color={transaction.transaction_type === 'negative' ? 'var(--red)' : 'var(--green)'}
                                                >
                                                    <h5>{transaction.transaction_type === 'negative' && '-'}${transaction.transaction_amount}</h5>

                                                    <h6>{getDateFormat(transaction.transaction_date)}</h6>
                                                </TransactionDetails>
                                            </TransactionsItem >

                                            {index != 4 && <hr />}
                                        </>
                                    ))}
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
                                        <Chart data={chartData()} />

                                        <ChartOverall>
                                            <h2>${getBudgetsSpent()}</h2>
                                            <h3>of ${getBudgetsLimit()} limit</h3>
                                        </ChartOverall>
                                    </ChartContainer>

                                    <ChartLegendContainer>
                                        <ChartLegendBox>
                                            {budgets.map((budget, index) => (
                                                index < 6 &&
                                                <ChartLegend key={budget.budget_id}
                                                    theme={budget.budget_theme}
                                                >
                                                    <h6>{budget.budget_name}</h6>

                                                    <h5>${budget.budget_max}</h5>
                                                </ChartLegend>
                                            ))}
                                        </ChartLegendBox>
                                    </ChartLegendContainer>
                                </BudgetsContainer>
                            </CardContext>
                        </Card>

                        <Card>
                            <CardTitleBox>
                                <h2>Recurring Bills</h2>

                                <DetailsButtonBox onClick={() => navigate('/recurring-bills')}>
                                    <h5>See Details</h5>

                                    <img src={ArrowIcon} alt="" />
                                </DetailsButtonBox>
                            </CardTitleBox>

                            <CardContext>
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
                        </Card>
                    </Column>
                </MainBox>
            </Container>
        </PageContainer >
    )
}

export default Overview