import { PieChart, Pie, Tooltip, Cell } from 'recharts';
import { useTransactions } from '../../contexts/transactionsContext';

const Chart = ({ size = 250, data }) => {
    const { transactions } = useTransactions()

    const budgetSpentCalc = (category_id) => {
        return transactions.reduce((acc, transaction) => {
            return (transaction.category_id === category_id && transaction.transaction_type === 0)
                ? acc + parseFloat(transaction.transaction_amount)
                : acc
        }, 0)
    }

    const chartData = data.map((item) => ({
        name: item.category_name,
        value: budgetSpentCalc(item.category_id)
    }));

    const colors = data.map((item) => item.theme_color)
    const fadedColors = data.map((item) => `${item.theme_color}60`)

    return (
        <PieChart width={size} height={size}>
            <Pie
                data={chartData}
                dataKey="value"
                isAnimationActive={false}
                innerRadius={85}
                outerRadius={110}
                paddingAngle={1}
            >
                {chartData.map((_, index) => (
                    <Cell key={`faded-${index}`} fill={fadedColors[index % fadedColors.length]} />
                ))}
            </Pie>

            <Pie
                data={chartData}
                dataKey="value"
                isAnimationActive={false}
                innerRadius={95}
                outerRadius={120}
                paddingAngle={1}
            >
                {chartData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                ))}
            </Pie>

            <Tooltip />
        </PieChart>
    );
};

export default Chart;
