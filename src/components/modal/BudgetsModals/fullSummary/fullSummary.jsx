import { ChartBox, ChartOverall, FormContainer } from './styles'

// COMPONENTS
import Chart from '../../../chart/chart'

// CONTEXTS
import { useCategories } from '../../../../contexts/categoriesContext'
import { useTransactions } from '../../../../contexts/transactionsContext'

const FullSummary = () => {
    const { categories } = useCategories()
    const { transactions } = useTransactions()

    const budgetSpentCalc = (category_id) => {
        return transactions.reduce((acc, transaction) => {
            return (transaction.category_id === category_id && transaction.transaction_type === 0)
                ? acc + parseFloat(transaction.transaction_amount)
                : acc
        }, 0)
    }

    const getBudgetsSpent = () => {
        const budgetsSpent = categories.reduce((acc, category) => {
            return acc + budgetSpentCalc(category.category_id)
        }, 0)

        return budgetsSpent.toFixed(2)
    }

    const getBudgetsLimit = () => {
        const budgetsLimit = categories.reduce((acc, category) => {
            return acc + parseFloat(category.category_max)
        }, 0)

        return budgetsLimit.toFixed(2)
    }

    return (
        <FormContainer>
            <ChartBox>
                <Chart data={categories} />

                <ChartOverall>
                    <h2>${getBudgetsSpent()}</h2>
                    <h3>of ${getBudgetsLimit()} limit</h3>
                </ChartOverall>
            </ChartBox>
        </FormContainer>
    )
}

export default FullSummary