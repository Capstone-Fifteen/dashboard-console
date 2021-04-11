import React, { useState } from 'react';
import { Pie, PieChart, ResponsiveContainer } from 'recharts';
import { isNil } from 'lodash';
import ActiveShape from './ActiveShape';

interface Props {
  actualData?: any[];
  expectedData?: any[];
  type?: 'move' | 'position';
  positiveValue?: any;
}

const AccuracyPieChart: React.FunctionComponent<Props> = ({ actualData, expectedData, type, positiveValue }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const onMouseEnter = (_: any, index: number) => setActiveIndex(index);

  const calculateAccuracy = () => {
    if (!(expectedData && expectedData.length)) {
      return;
    }

    const dataKey = type === 'move' ? 'dance_move' : 'dance_position';
    const dataLength = Math.min(expectedData!.length, actualData!.length);

    let correctDataCount = 0;
    let incorrectDataCount = 0;
    for (let i = 0; i < dataLength; i++) {
      if (actualData![actualData!.length - i - 1][dataKey] === expectedData![i]) {
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

  const getGraphDataFromPositiveValue = () => {
    const incorrectValue = 1 - positiveValue;

    return [
      { name: 'Correct', value: positiveValue, fill: '#58b158' },
      { name: 'Incorrect', value: incorrectValue, fill: '#f04f43' },
    ];
  };

  // If positiveValue is provided, we don't need to do any calculation of accuracy
  const graphData = isNil(positiveValue) ? calculateAccuracy() : getGraphDataFromPositiveValue();

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          activeIndex={activeIndex}
          activeShape={ActiveShape}
          data={graphData}
          cx="50%"
          cy="50%"
          innerRadius={40}
          outerRadius={60}
          dataKey="value"
          onMouseEnter={onMouseEnter}
        />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default AccuracyPieChart;
