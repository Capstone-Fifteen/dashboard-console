import React from 'react';
import {
  CartesianGrid,
  Label,
  Legend,
  Line,
  LineChart,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { LINE_COLOR_PALETTE } from '../../constant/LineChart';

const FatigueLineChart: React.FunctionComponent<any> = () => {
  const data = [
    {
      name: 1,
      Sally: 20,
      John: 30,
      Michael: 10,
    },
    {
      name: 2,
      Sally: 40,
      John: 40,
      Michael: 50,
    },
    {
      name: 3,
      Sally: 50,
      John: 40,
      Michael: 40,
    },
    {
      name: 4,
      Sally: 60,
      Michael: 50,
      John: 50,
    },
    {
      name: 5,
      Sally: 60,
      Michael: 80,
      John: 60,
    },
  ];

  return (
    <ResponsiveContainer width={500} height={300}>
      <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <ReferenceLine y={70} stroke="red">
          <Label value="Threshold" fill="white" />
        </ReferenceLine>
        <Line type="monotone" dataKey="John" stroke={LINE_COLOR_PALETTE[0]} />
        <Line type="monotone" dataKey="Sally" stroke={LINE_COLOR_PALETTE[1]} />
        <Line type="monotone" dataKey="Michael" stroke={LINE_COLOR_PALETTE[2]} />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default FatigueLineChart;
