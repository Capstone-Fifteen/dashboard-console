import React from 'react';
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { LINE_COLOR_PALETTE } from '../../constant/LineChart';

const RhythmicLineChart: React.FunctionComponent = () => {
  const data = [
    {
      name: 1,
      Sally: 0,
      John: 0,
      Michael: 0,
    },
    {
      name: 2,
      Sally: 0.5,
      John: 0,
      Michael: 0,
    },
    {
      name: 3,
      Sally: 0,
      John: 0,
      Michael: 1.2,
    },
    {
      name: 4,
      Sally: 0.2,
      Michael: 0,
      John: 0,
    },
    {
      name: 5,
      Sally: 0,
      Michael: 0,
      John: 0,
    },
  ];

  return (
    <ResponsiveContainer width={500} height={300}>
      <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis domain={[-5, 5]} />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="John" stroke={LINE_COLOR_PALETTE[0]} />
        <Line type="monotone" dataKey="Sally" stroke={LINE_COLOR_PALETTE[1]} />
        <Line type="monotone" dataKey="Michael" stroke={LINE_COLOR_PALETTE[2]} />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default RhythmicLineChart;
