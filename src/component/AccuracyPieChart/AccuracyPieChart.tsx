import React, { useState } from 'react';
import { Pie, PieChart } from 'recharts';
import ActiveShape from './ActiveShape';

interface Props {
  actualData: any[];
  expectedData?: any[];
  type: 'move' | 'position';
  donut?: boolean;
}

const AccuracyPieChart: React.FunctionComponent<Props> = ({ actualData, expectedData, type, donut }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const onMouseEnter = (_: any, index: number) => setActiveIndex(index);

  const calculateAccuracy = () => {
    if (!expectedData) {
      return;
    }

    // TODO: Refactor this ugly code
    const correctDataCount =
      type === 'move'
        ? actualData
            .map((value, index) => (value['dance_move'] === expectedData[actualData.length - index - 1] ? 1 : 0))
            .reduce((a: number, b: number) => a + b, 0)
        : actualData
            .map((value, index) => (value['dance_position'] === expectedData[actualData.length - index - 1] ? 1 : 0))
            .reduce((a: number, b: number) => a + b, 0);
    const incorrectDataCount = actualData.length - correctDataCount;

    return [
      { name: 'Correct', value: correctDataCount, fill: '#58b158' },
      { name: 'Incorrect', value: incorrectDataCount, fill: '#f04f43' },
    ];
  };

  const RADIAN = Math.PI / 180;

  // @ts-ignore
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  const data = calculateAccuracy();

  return (
    <PieChart width={400} height={300}>
      {donut ? (
        <Pie
          activeIndex={activeIndex}
          activeShape={ActiveShape}
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={80}
          dataKey="value"
          onMouseEnter={onMouseEnter}
        />
      ) : (
        <Pie data={data} dataKey="value" outerRadius={80} label={renderCustomizedLabel} labelLine={false} />
      )}
    </PieChart>
  );
};

export default AccuracyPieChart;
