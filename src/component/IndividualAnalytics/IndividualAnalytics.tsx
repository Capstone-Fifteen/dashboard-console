import React from 'react';
import { Divider } from 'rsuite';
import RawDataLineChart from '../RawDataLineChart';
import PerformanceTable from '../PerformanceTable';
import AccuracyPieChart from '../AccuracyPieChart';
import { get } from 'lodash';

import './IndividualAnalytics.css';

interface Props {
  rawData: any[];
  predictedData: any[];
  expectedDanceData?: string[];
  expectedPositionData?: number[];
}

const IndividualAnalytics: React.FunctionComponent<Props> = ({
  rawData,
  predictedData,
  expectedDanceData,
  expectedPositionData,
}) => {
  const currentPredictedData = predictedData && predictedData[0];

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

  const getCurrentExpectedData = (expectedData: any[]) => {
    const dataLength = Math.min(predictedData.length, expectedData.length);

    return expectedData[dataLength - 1];
  };

  return (
    <>
      <div className="sectionContainer">
        {expectedDanceData && (
          <div className="textContainer">
            <span className="subTitle">Expected Dance Move</span>
            <span className="title">{getCurrentExpectedData(expectedDanceData)}</span>
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
            <span className="title">{getCurrentExpectedData(expectedPositionData)}</span>
          </div>
        )}
        <div className="textContainer">
          <span className="subTitle">Current Position</span>
          <span className="title">{(currentPredictedData && currentPredictedData['dance_position']) || 'No data'}</span>
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
          <PerformanceTable data={predictedData} expectedData={expectedDanceData} type="move" />
        </div>
      </div>
      <Divider />
      <div className="sectionContainer">
        <div className="textContainer">
          <span className="subTitle">Executed Dance Positions</span>
          <PerformanceTable data={predictedData} expectedData={expectedPositionData} type="position" />
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
    </>
  );
};

export default IndividualAnalytics;
