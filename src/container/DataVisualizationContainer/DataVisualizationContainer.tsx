import React, { useState } from 'react';
import ReactECharts from 'echarts-for-react';
import CSVReader from 'react-csv-reader';
import './DataVisualizationContainer.css';
import { Panel } from 'rsuite';

const DataVisualizationContainer = () => {
  const [graphData, setGraphData] = useState<any>(null);

  return (
    <Panel header={<h3>Data Visualization</h3>} bordered>
      <CSVReader
        onFileLoaded={(data) => {
          const xAxisData: number[] = [];
          const xReading: any[] = [];
          const yReading: any[] = [];
          const zReading: any[] = [];
          const yawReading: any[] = [];
          const pitchReading: any[] = [];
          const rollReading: any[] = [];

          data.forEach((item, index) => {
            const x_reading = parseInt(item[0]);
            const y_reading = parseInt(item[1]);
            const z_reading = parseInt(item[2]);
            const yaw_reading = parseInt(item[3]);
            const pitch_reading = parseInt(item[4]);
            const roll_reading = parseInt(item[5]);

            xAxisData.push(index);
            xReading.push(x_reading);
            yReading.push(y_reading);
            zReading.push(z_reading);
            yawReading.push(yaw_reading);
            pitchReading.push(pitch_reading);
            rollReading.push(roll_reading);
          });
          setGraphData({
            xAxis: {
              type: 'category',
              data: xAxisData,
            },
            yAxis: {
              type: 'value',
            },
            series: [
              { data: xReading, name: 'acc_x', type: 'line' },
              { data: yReading, name: 'acc_y', type: 'line' },
              { data: zReading, name: 'acc_z', type: 'line' },
              { data: yawReading, name: 'yaw', type: 'line' },
              { data: pitchReading, name: 'pitch', type: 'line' },
              { data: rollReading, name: 'roll', type: 'line' },
            ],
            tooltip: {
              trigger: 'axis',
            },
          });
        }}
      />
      {graphData && <ReactECharts style={{ height: 800 }} option={graphData} />}
    </Panel>
  );
};

export default DataVisualizationContainer;
