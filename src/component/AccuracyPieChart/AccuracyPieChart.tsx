import React, { useState } from 'react';
import { Pie, PieChart, ResponsiveContainer } from 'recharts';
import ActiveShape from './ActiveShape';

interface Props {
  actualData: any[];
  expectedData: any[];
  type: 'move' | 'position';
}

const AccuracyPieChart: React.FunctionComponent<Props> = ({ actualData, expectedData, type }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const onMouseEnter = (_: any, index: number) => setActiveIndex(index);

  const calculateAccuracy = () => {
    if (!expectedData.length) {
      return;
    }

    const dataKey = type === 'move' ? 'dance_move' : 'dance_position';
    const dataLength = Math.min(expectedData.length, actualData.length);

    let correctDataCount = 0;
    let incorrectDataCount = 0;
    for (let i = 0; i < dataLength; i++) {
      if (actualData[actualData.length - i - 1][dataKey] === expectedData[i]) {
        correctDataCount++;
      } else {
        incorrectDataCount++;
      }
    }

    return [
      { name: 'Correct', value: correctDataCount, fill: '#58b158' },
      { name: 'Incorrect', value: incorrectDataCount, fill: '#f04f43' },
    ];
  };

  const data = calculateAccuracy();

  return (
    <ResponsiveContainer width="80%" height={300}>
      <PieChart>
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
      </PieChart>
    </ResponsiveContainer>
  );
};

export default AccuracyPieChart;
