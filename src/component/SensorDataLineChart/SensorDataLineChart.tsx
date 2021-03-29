import React from 'react';
import { Brush, CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { ACCELEROMETER_READING, GYROSCOPE_READING, LINE_COLOR_PALETTE } from '../../constant/LineChart';
import { epochTimeFormatter } from '../../utils/numeric';

interface Props {
  data: any[];
  type: 'accelerometer' | 'gyroscope';
  showBrush?: boolean;
}

const SensorDataLineChart: React.FunctionComponent<Props> = ({ data, type, showBrush }) => {
  const graphData =
    data &&
    data.map((value) => ({
      ...value,
      timestamp: new Date(value['created_at']).getTime(), // convert timestamp to epoch time for chart support
    }));

  const brushStartIndex = data.length - 300 > 0 ? data.length - 300 : 0;

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
          scale="time"
          dataKey="timestamp"
          tickFormatter={epochTimeFormatter}
          domain={['auto', 'auto']}
          name="Time"
          angle={-45}
          textAnchor="end"
          height={60}
        />
        {showBrush && (
          <Brush dataKey="timestamp" tickFormatter={epochTimeFormatter} startIndex={brushStartIndex} height={20} />
        )}
        <YAxis />
        <Tooltip labelFormatter={epochTimeFormatter} labelStyle={{ color: 'black' }} />
        <Legend wrapperStyle={{ position: 'relative' }} />
        {extractLineData()}
      </LineChart>
    </ResponsiveContainer>
  );
};

export default SensorDataLineChart;
