import React, { useState } from 'react';
import { Animation, Divider, Icon, IconButton } from 'rsuite';
import SensorDataLineChart from '../SensorDataLineChart';
import PerformanceTable from '../PerformanceTable';
import AccuracyPieChart from '../AccuracyPieChart';
import DataLoader from '../DataLoader';
import { get } from 'lodash';
import './IndividualAnalytics.css';

interface Props {
  rawData: any[];
  predictedData: any[];
  expectedDanceData: string[];
  expectedPositionData: number[];
  showBrush?: boolean;
}

const IndividualAnalytics: React.FunctionComponent<Props> = ({
  rawData,
  predictedData,
  expectedDanceData,
  expectedPositionData,
  showBrush,
}) => {
  const currentPredictedData = predictedData && predictedData[0];

  const [showSensorReading, setShowSensorReading] = useState(false);

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

  if (!predictedData.length && !rawData.length) {
    return <DataLoader />;
  }

  return (
    <>
      <div className="sectionContainer">
        {expectedDanceData?.length > 0 && (
          <div className="textContainer">
            <span className="subTitle">Expected Dance Move</span>
            <span className="title">{getCurrentExpectedData(expectedDanceData)}</span>
          </div>
        )}
        <div className="textContainer">
          <span className="subTitle">Current Dance Move</span>
          <span className="title">{(currentPredictedData && currentPredictedData['dance_move']) || 'No data'}</span>
        </div>
        {expectedDanceData?.length > 0 && (
          <AccuracyPieChart actualData={predictedData} expectedData={expectedDanceData} type="move" />
        )}
      </div>
      <Divider />
      <div className="sectionContainer">
        {expectedPositionData?.length > 0 && (
          <div className="textContainer">
            <span className="subTitle">Expected Position</span>
            <span className="title">{getCurrentExpectedData(expectedPositionData)}</span>
          </div>
        )}
        <div className="textContainer">
          <span className="subTitle">Current Position</span>
          <span className="title">{(currentPredictedData && currentPredictedData['dance_position']) || 'No data'}</span>
        </div>
        {expectedPositionData?.length > 0 && (
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
        </div>
        <PerformanceTable data={predictedData} expectedData={expectedDanceData} type="move" />
      </div>
      <Divider />
      <div className="sectionContainer">
        <div className="textContainer">
          <span className="subTitle">Executed Dance Positions</span>
        </div>
        <PerformanceTable data={predictedData} expectedData={expectedPositionData} type="position" />
      </div>
      <Divider />
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <IconButton
          icon={<Icon icon={showSensorReading ? 'arrow-up' : 'arrow-down'} />}
          onClick={() => setShowSensorReading(!showSensorReading)}
          appearance="subtle"
          size="xs"
        >
          {showSensorReading ? 'Hide' : 'Show'} Sensor Readings
        </IconButton>
      </div>
      <Animation.Collapse in={showSensorReading}>
        <div>
          <div className="sectionContainer">
            <div className="textContainer">
              <span className="subTitle">Accelerometer Reading</span>
            </div>
            <SensorDataLineChart data={rawData} type="accelerometer" showBrush={showBrush} />
          </div>
          <Divider />
          <div className="sectionContainer">
            <div className="textContainer">
              <span className="subTitle">Gyroscope Reading</span>
            </div>
            <SensorDataLineChart data={rawData} type="gyroscope" showBrush={showBrush} />
          </div>
        </div>
      </Animation.Collapse>
    </>
  );
};

export default IndividualAnalytics;
