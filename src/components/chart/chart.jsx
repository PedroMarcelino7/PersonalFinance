import React from 'react';
import { PieChart, Pie, Tooltip } from 'recharts';

const data = [
    { name: 'Group A', value: 2400 },
    { name: 'Group B', value: 4567 },
    { name: 'Group C', value: 1398 },
    { name: 'Group D', value: 9800 },
    { name: 'Group E', value: 3908 },
    { name: 'Group F', value: 4800 },
];

const Chart = ({ size = 250 }) => {
    return (
        <PieChart width={size} height={size}>
            <Pie
                dataKey="value"
                isAnimationActive={false}
                data={data}
                innerRadius={85}
                outerRadius={110}
                fill="#82ca9d"
            />
            <Tooltip />
        </PieChart>
    );
}

export default Chart