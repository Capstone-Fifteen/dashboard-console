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

const AccuracyLineChart: React.FunctionComponent<any> = ({ threshold, data }) => {
  return (
    <ResponsiveContainer width={500} height={300}>
      <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis domain={[0, 1]} />
        {threshold && (
          <ReferenceLine y={70} stroke="red">
            <Label value="Threshold" fill="white" />
          </ReferenceLine>
        )}
        <Tooltip />
        <Line type="monotone" dataKey="value" stroke={LINE_COLOR_PALETTE[0]} />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default AccuracyLineChart;
