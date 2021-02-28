import React from 'react';
import { Bar, BarChart, CartesianGrid, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { LINE_COLOR_PALETTE } from '../../constant/LineChart';

interface Props {
  data: any[];
}

const AccuracyBarChart: React.FunctionComponent<Props> = ({ data }) => {
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
        <YAxis type="category" dataKey="deviceId" tickFormatter={(value) => `Device ID: ${value}`} />
        <Tooltip labelFormatter={(label) => `Device ID: ${label}`} labelStyle={{ color: 'black' }} />
        <Bar dataKey="average">
          {data.map((_, index) => (
            <Cell key={index} fill={LINE_COLOR_PALETTE[index]} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};

export default AccuracyBarChart;
