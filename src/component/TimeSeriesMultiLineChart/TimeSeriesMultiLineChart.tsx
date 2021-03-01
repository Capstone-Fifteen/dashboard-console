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
import { epochTimeFormatter, percentageFormatter } from '../../utils/numeric';
import { isNumber } from 'lodash';

interface Props {
  data: any[];
  reference?: number;
  percentage?: boolean;
}

const TimeSeriesMultiLineChart: React.FunctionComponent<Props> = ({ data, reference, percentage }) => {
  const renderLine = () =>
    data.map((item: any, index: number) => (
      <Line
        key={item.id}
        type="monotone"
        dataKey="value"
        data={item.data}
        stroke={LINE_COLOR_PALETTE[index]}
        name={isNumber(item.id) ? `Device ID: ${item.id}` : item.id}
        dot={false}
        isAnimationActive={false}
      />
    ));

  return (
    <ResponsiveContainer width={500} height={300}>
      <LineChart margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          type="number"
          dataKey="timestamp"
          tickFormatter={epochTimeFormatter}
          domain={['auto', 'auto']}
          name="Time"
        />
        <YAxis
          tickFormatter={(value) => (percentage ? percentageFormatter(value) : value)}
          domain={percentage ? [0, 1] : ['auto', 'auto']}
        />
        <Tooltip
          labelFormatter={epochTimeFormatter}
          formatter={(value: any) => (percentage ? percentageFormatter(value) : value)}
          labelStyle={{ color: 'black' }}
        />
        <Legend />
        {reference && (
          <ReferenceLine y={reference} stroke="red">
            <Label value="Threshold" fill="white" />
          </ReferenceLine>
        )}
        {renderLine()}
      </LineChart>
    </ResponsiveContainer>
  );
};

export default TimeSeriesMultiLineChart;
