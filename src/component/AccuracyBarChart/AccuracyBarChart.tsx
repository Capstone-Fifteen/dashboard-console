import React from 'react';
import { Bar, BarChart, CartesianGrid, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { LINE_COLOR_PALETTE } from '../../constant/LineChart';

const AccuracyBarChart: React.FunctionComponent<any> = () => {
  const data = [
    {
      name: 'John',
      accuracy: 0.6,
    },
    {
      name: 'Sally',
      accuracy: 0.8,
    },
    {
      name: 'Michael',
      accuracy: 0.8,
    },
  ];

  return (
    <ResponsiveContainer width={500} height={300}>
      <BarChart
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
        layout="vertical"
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis type="number" />
        <YAxis type="category" dataKey="name" />
        <Tooltip />
        <Bar dataKey="accuracy">
          {data.map((_, index) => (
            <Cell fill={LINE_COLOR_PALETTE[index]} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};

export default AccuracyBarChart;
