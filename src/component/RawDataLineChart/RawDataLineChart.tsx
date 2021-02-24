import React from 'react';
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import moment from 'moment';
import { takeRight } from 'lodash';
import { ACCELEROMETER_READING, GYROSCOPE_READING, LINE_COLOR_PALETTE } from '../../constant/LineChart';

interface Props {
  data: any[];
  type: 'accelerometer' | 'gyroscope';
}

const RawDataLineChart: React.FunctionComponent<Props> = ({ data, type }) => {
  const graphData =
    data &&
    data.map((value) => ({
      ...value,
      created_at: moment(value['created_at']).format('LTS'),
    }));

  const extractLineData = () => {
    if (type === 'accelerometer') {
      return ACCELEROMETER_READING.map((reading, index) => (
        <Line
          key={reading}
          type="monotone"
          isAnimationActive={false}
          dataKey={reading}
          stroke={LINE_COLOR_PALETTE[index]}
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
      />
    ));
  };

  return (
    <ResponsiveContainer width={500} height={300}>
      <LineChart
        data={takeRight(graphData, 30)}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="created_at" />
        <YAxis />
        <Tooltip />
        <Legend />
        {extractLineData()}
      </LineChart>
    </ResponsiveContainer>
  );
};

export default RawDataLineChart;
