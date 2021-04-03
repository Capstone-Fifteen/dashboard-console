import React, { useState } from 'react';
import CSVReader from 'react-csv-reader';
import './DataVisualizationContainer.css';
import { Panel } from 'rsuite';
import { Brush, CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { ACCELEROMETER_READING, GYROSCOPE_READING, LINE_COLOR_PALETTE } from '../../constant/LineChart';

const DataVisualizationContainer = () => {
  const [graphData, setGraphData] = useState<any>(null);

  return (
    <Panel header={<h3>Data Visualization</h3>} bordered>
      <CSVReader
        onFileLoaded={(data) => {
          const consolidatedData: any[] = [];

          data.forEach((item, index) => {
            const x_reading = parseInt(item[0]);
            const y_reading = parseInt(item[1]);
            const z_reading = parseInt(item[2]);
            const yaw_reading = parseInt(item[3]);
            const pitch_reading = parseInt(item[4]);
            const roll_reading = parseInt(item[5]);
            consolidatedData.push({ index, x_reading, y_reading, z_reading, yaw_reading, pitch_reading, roll_reading });
          });

          setGraphData(consolidatedData);
        }}
      />
      <ResponsiveContainer width="80%" height={800}>
        <LineChart data={graphData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis type="number" dataKey="index" domain={['auto', 'auto']} name="Index" />
          <YAxis />
          <Tooltip labelStyle={{ color: 'black' }} />
          <Legend />
          {ACCELEROMETER_READING.map((reading, index) => (
            <Line
              key={reading}
              type="monotone"
              isAnimationActive={false}
              dataKey={reading}
              stroke={LINE_COLOR_PALETTE[index]}
              dot={false}
            />
          ))}
          {GYROSCOPE_READING.map((reading, index) => (
            <Line
              key={reading}
              type="monotone"
              isAnimationActive={false}
              dataKey={reading}
              stroke={LINE_COLOR_PALETTE[index + 3]}
              dot={false}
            />
          ))}
          <Brush height={20} />
        </LineChart>
      </ResponsiveContainer>
    </Panel>
  );
};

export default DataVisualizationContainer;
