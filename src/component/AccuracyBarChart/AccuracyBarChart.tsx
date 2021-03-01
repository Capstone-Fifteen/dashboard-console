import React from 'react';
import { Bar, BarChart, CartesianGrid, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { LINE_COLOR_PALETTE } from '../../constant/LineChart';
import { percentageFormatter } from '../../utils/numeric';
import { isNumber } from 'lodash';

interface Props {
  data: any[];
  percentage?: boolean;
}

const AccuracyBarChart: React.FunctionComponent<Props> = ({ data, percentage }) => {
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
        <XAxis
          type="number"
          tickFormatter={(value) => (percentage ? percentageFormatter(value) : value)}
          domain={percentage ? [0, 1] : ['auto', 'auto']}
        />
        <YAxis
          type="category"
          dataKey="id"
          tickFormatter={(value) => (isNumber(value) ? `Device ID: ${value}` : value)}
        />
        <Tooltip
          labelFormatter={(label) => (isNumber(label) ? `Device ID: ${label}` : label)}
          formatter={(value: any) => (percentage ? percentageFormatter(value) : value)}
          labelStyle={{ color: 'black' }}
        />
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
