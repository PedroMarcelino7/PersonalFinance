import React from 'react';
import { PieChart, Pie, Tooltip, Cell } from 'recharts';

const Colors = ['#626070', '#277C78', '#82C9D7', '#F2CDAC'];
const FadedColors = ['#62607077', '#277C7877', '#82C9D777', '#F2CDAC77'];

const Chart = ({ size = 250 }) => {
    const data = [
        { name: 'Group A', value: 2400 },
        { name: 'Group B', value: 4567 },
        { name: 'Group C', value: 1398 },
        { name: 'Group D', value: 9800 },
    ];

    return (
        <PieChart width={size} height={size}>
            <Pie
                data={data}
                dataKey="value"
                isAnimationActive={false}
                innerRadius={85}
                outerRadius={110}
                paddingAngle={1}
            >
                {data.map((_, index) => (
                    <Cell key={`faded-${index}`} fill={FadedColors[index % FadedColors.length]} />
                ))}
            </Pie>

            <Pie
                data={data}
                dataKey="value"
                isAnimationActive={false}
                innerRadius={95}
                outerRadius={120}
                paddingAngle={1}
            >
                {data.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={Colors[index % Colors.length]} />
                ))}
            </Pie>

            <Tooltip />
        </PieChart>
    );
};

export default Chart;
