import React from 'react';
import { CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis, YAxis } from 'recharts';
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
    data.map((item) => ({
      ...item,
      created_at: moment(item['created_at']).format('LTS'),
    }));

  const extractLineData = () => {
    if (type === 'accelerometer') {
      return ACCELEROMETER_READING.map((reading, index) => (
        <Line type="monotone" dataKey={reading} stroke={LINE_COLOR_PALETTE[index]} />
      ));
    }
    return GYROSCOPE_READING.map((reading, index) => (
      <Line type="monotone" dataKey={reading} stroke={LINE_COLOR_PALETTE[index]} />
    ));
  };

  return (
    <LineChart
      data={takeRight(graphData, 3)}
      width={500}
      height={300}
      margin={{
        top: 10,
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
  );
};

export default RawDataLineChart;
