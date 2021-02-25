import React from 'react';
import { Divider, Panel } from 'rsuite';
import RawDataLineChart from '../RawDataLineChart';
import ExecutedDanceTable from '../ExecutedDanceTable';
import AccuracyPieChart from '../AccuracyPieChart';
import { takeRight, get } from 'lodash';

import './IndividualAnalytics.css';

interface Props {
  rawData: any[];
  predictedData: any[];
  deviceId?: number;
  expectedDanceData?: string[];
  expectedPositionData?: number[];
}

const IndividualAnalytics: React.FunctionComponent<Props> = ({
  rawData,
  predictedData,
  deviceId,
  expectedDanceData,
  expectedPositionData,
}) => {
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
        {expectedDanceData && (
          <div className="textContainer">
            <span className="subTitle">Expected Dance Move</span>
            <span className="title">{expectedDanceData[predictedData.length - 1]}</span>
          </div>
        )}
        <div className="textContainer">
          <span className="subTitle">Current Dance Move</span>
          <span className="title">{(currentPredictedData && currentPredictedData['dance_move']) || 'No data'}</span>
        </div>
        {expectedDanceData && (
          <AccuracyPieChart actualData={predictedData} expectedData={expectedDanceData} type="move" />
        )}
      </div>
      <Divider />
      <div className="sectionContainer">
        {expectedPositionData && (
          <div className="textContainer">
            <span className="subTitle">Expected Position</span>
            <span className="title">
              {(currentPredictedData && currentPredictedData['dance_position']) || 'No data'}
            </span>
          </div>
        )}
        <div className="textContainer">
          <span className="subTitle">Current Position</span>
          <span className="title">2</span>
        </div>
        {expectedPositionData && (
          <AccuracyPieChart actualData={predictedData} expectedData={expectedPositionData} type="position" />
        )}
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
          <ExecutedDanceTable data={predictedData} expectedDanceData={expectedDanceData} />
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
