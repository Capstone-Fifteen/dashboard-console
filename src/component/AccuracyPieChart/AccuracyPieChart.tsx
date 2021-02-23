import React, { useState } from 'react';
import { Pie, PieChart } from 'recharts';
import ActiveShape from './ActiveShape';

const AccuracyPieChart: React.FunctionComponent<any> = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const onMouseEnter = (_: any, index: number) => setActiveIndex(index);

  const data = [
    { name: 'Correct', value: 0.4, fill: '#58b158' },
    { name: 'Incorrect', value: 0.6, fill: '#f04f43' },
  ];

  return (
    <PieChart width={400} height={300}>
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
  );
};

export default AccuracyPieChart;
