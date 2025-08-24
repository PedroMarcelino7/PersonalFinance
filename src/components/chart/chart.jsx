import React from 'react';
import { PieChart, Pie, Tooltip, Cell } from 'recharts';


const Chart = ({ size = 250, data }) => {
    const chartData = data.map((item) => ({
        name: item.category_name,
        value: Number(item.category_spent)
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
