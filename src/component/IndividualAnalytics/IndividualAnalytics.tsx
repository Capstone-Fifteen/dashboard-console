import React from 'react';
import { Divider, Panel } from 'rsuite';
import RawDataLineChart from '../RawDataLineChart';
import ExecutedDanceTable from '../ExecutedDanceTable';
import './IndividualAnalytics.css';
import AccuracyPieChart from '../AccuracyPieChart';
import { takeRight, get } from 'lodash';

interface Props {
  rawData: any[];
  predictedData: any[];
  deviceId?: number;
}

const IndividualAnalytics: React.FunctionComponent<Props> = ({ rawData, predictedData, deviceId }) => {
  const currentPredictedData = takeRight(predictedData, 1)[0];

  const getDelayType = (delay: number) => {
    if (!delay) {
      return 'No data';
    }
    if (delay > 0.5) {
      return 'Fast';
    }
    if (delay < -0.5) {
      return 'Slow';
    }
    return 'On Time';
  };

  return (
    <Panel bordered header={`Device ID: ${deviceId || 'None'}`}>
      <div className="sectionContainer">
        <div className="textContainer">
          <span className="subTitle">Expected Dance Move</span>
          <span className="title">Dab</span>
        </div>
        <div className="textContainer">
          <span className="subTitle">Current Dance Move</span>
          <span className="title">{(currentPredictedData && currentPredictedData['dance_move']) || 'No data'}</span>
        </div>
        <AccuracyPieChart />
      </div>
      <Divider />
      <div className="sectionContainer">
        <div className="textContainer">
          <span className="subTitle">Current Position</span>
          <span className="title">2</span>
        </div>
        <div className="textContainer">
          <span className="subTitle">Expected Position</span>
          <span className="title">{(currentPredictedData && currentPredictedData['dance_position']) || 'No data'}</span>
        </div>
        <AccuracyPieChart />
      </div>
      <Divider />
      <div className="sectionContainer">
        <div className="textContainer">
          <span className="subTitle">Rhythmic Performance</span>
          <span className="title">{getDelayType(get(currentPredictedData, 'delay', null))}</span>
          <span className="subTitle">{get(currentPredictedData, 'delay', null) || 'No data'}</span>
        </div>
      </div>
      <Divider />
      <div className="sectionContainer">
        <div className="textContainer">
          <span className="subTitle">Executed Dance Moves</span>
          <ExecutedDanceTable data={predictedData} />
        </div>
      </div>
      <Divider />
      <div className="sectionContainer">
        <div className="textContainer">
          <span className="subTitle">Accelerometer Reading</span>
          <RawDataLineChart data={rawData} type="accelerometer" />
        </div>
      </div>
      <Divider />
      <div className="sectionContainer">
        <div className="textContainer">
          <span className="subTitle">Gyroscope Reading</span>
          <RawDataLineChart data={rawData} type="gyroscope" />
        </div>
      </div>
    </Panel>
  );
};

export default IndividualAnalytics;
