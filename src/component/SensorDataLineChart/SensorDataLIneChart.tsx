import React from 'react';
import { Brush, CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { ACCELEROMETER_READING, GYROSCOPE_READING, LINE_COLOR_PALETTE } from '../../constant/LineChart';
import { epochTimeFormatter } from '../../utils/numeric';

interface Props {
  data: any[];
  type: 'accelerometer' | 'gyroscope';
}

const SensorDataLIneChart: React.FunctionComponent<Props> = ({ data, type }) => {
  const graphData =
    data &&
    data.map((value) => ({
      ...value,
      timestamp: new Date(value['created_at']).getTime(), // convert timestamp to epoch time for chart support
    }));

  const extractLineData = () => {
    if (type === 'accelerometer') {
      return ACCELEROMETER_READING.map((reading, index) => (
        <Line
          key={reading}
          type="linear"
          isAnimationActive={false}
          dataKey={reading}
          stroke={LINE_COLOR_PALETTE[index]}
          dot={false}
        />
      ));
    }
    return GYROSCOPE_READING.map((reading, index) => (
      <Line
        key={reading}
        type="monotone"
        isAnimationActive={false}
        dataKey={reading}
        stroke={LINE_COLOR_PALETTE[index]}
        dot={false}
      />
    ));
  };

  return (
    <ResponsiveContainer width="80%" height={400}>
      <LineChart data={graphData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          type="number"
          dataKey="timestamp"
          tickFormatter={epochTimeFormatter}
          domain={['auto', 'auto']}
          name="Time"
        />
        <Brush dataKey="time" height={20} stroke="#8884d8" />
        <YAxis />
        <Tooltip labelFormatter={epochTimeFormatter} labelStyle={{ color: 'black' }} />
        <Legend />
        {extractLineData()}
      </LineChart>
    </ResponsiveContainer>
  );
};

export default SensorDataLIneChart;
