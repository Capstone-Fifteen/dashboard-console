import React from 'react';
import {
  CartesianGrid,
  Label,
  Line,
  LineChart,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { LINE_COLOR_PALETTE } from '../../constant/LineChart';

const AccuracyLineChart: React.FunctionComponent<any> = ({ threshold, data, dataKey, domain, name, percentage }) => {
  return (
    <ResponsiveContainer width="80%" height={400}>
      <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" type="category" />
        <YAxis domain={domain} tickFormatter={(value) => (percentage ? `${value}%` : value)} />
        {threshold && (
          <ReferenceLine y={70} stroke="red">
            <Label value="Threshold" fill="white" />
          </ReferenceLine>
        )}
        <Tooltip labelStyle={{ color: 'black' }} formatter={(value: any) => (percentage ? `${value}%` : value)} />
        <Line type="monotone" dataKey={dataKey} stroke={LINE_COLOR_PALETTE[0]} name={name} />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default AccuracyLineChart;
