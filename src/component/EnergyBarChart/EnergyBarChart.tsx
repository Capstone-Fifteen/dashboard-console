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
    <ResponsiveContainer width="80%" height={400}>
      <BarChart data={data}>
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
