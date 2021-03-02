import React from 'react';
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { LINE_COLOR_PALETTE } from '../../constant/LineChart';

interface Props {
  data: any[];
  dataKey: string;
  name?: string;
}

const EnergyBarChart: React.FunctionComponent<Props> = ({ data, dataKey, name }) => {
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
      >
        <CartesianGrid />
        <XAxis dataKey="name" angle={-45} textAnchor="end" height={100} />
        <YAxis />
        <Tooltip labelStyle={{ color: 'black' }} />
        <Bar dataKey={dataKey} fill={LINE_COLOR_PALETTE[0]} name={name} />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default EnergyBarChart;
