import React from 'react';
import { Col, Grid, Row } from 'rsuite';
import AccuracyBarChart from '../AccuracyBarChart';
import RhythmicLineChart from '../RhythmicLineChart';
import TimeSeriesMultiLineChart from '../TimeSeriesMultiLineChart';
import Card from '../Card';
import { mean } from 'lodash';

import './TeamAnalytics.css';

interface Props {
  predictedData: any[];
  rawData: any[];
  expectedData: any[];
}

const TeamAnalytics: React.FunctionComponent<Props> = ({ predictedData, rawData, expectedData }) => {
  // Restructure expectedData so that deviceId has a type int
  const expectedDeviceData = expectedData.map((data) => ({ ...data, device_id: parseInt(data['device_id']) }));

  const emgData = expectedDeviceData.map(({ device_id }) => {
    const filteredData = rawData
      .filter((data) => data['device_id'] === device_id)
      .map((data) => ({ timestamp: new Date(data['created_at']).getTime(), value: data['emg_reading'] }));

    return {
      deviceId: device_id,
      data: filteredData,
    };
  });

  const delayData = expectedDeviceData.map(({ device_id }) => {
    const filteredData = predictedData
      .filter((data) => data['device_id'] === device_id)
      .map((data) => ({ timestamp: new Date(data['created_at']).getTime(), value: data['delay'] }));

    return {
      deviceId: device_id,
      data: filteredData,
    };
  });

  const moveAccuracyData = expectedDeviceData.map(({ device_id, expected_moves }) => {
    // get predicted data for the specific device ID
    const filteredData = predictedData.filter((data) => data['device_id'] === device_id);

    // get expected dance moves
    const expectedDanceMoves = expected_moves.split(',').map((move: string) => move.trim());
    const dataLength = Math.min(filteredData.length, expectedDanceMoves.length);
    let accuracyRate: number[] = [];
    let timestamp: number[] = [];

    for (let i = 0; i < dataLength; i++) {
      let currentAccuracy = 0;

      // get current predicted data (indexed from the back)
      const currentPredictedData = filteredData[filteredData.length - i - 1];

      // set accuracy to 1 if predicted = expected
      if (currentPredictedData['dance_move'] === expectedDanceMoves[i]) {
        currentAccuracy = 1;
      }

      // calculate the running average
      const averageAccuracy = mean([...accuracyRate, currentAccuracy]);
      accuracyRate.push(averageAccuracy);
      timestamp.push(new Date(currentPredictedData['created_at']).getTime());
    }

    return {
      deviceId: device_id,
      data: accuracyRate.map((value, index) => ({
        timestamp: timestamp[index],
        value,
      })),
      average: mean(accuracyRate),
    };
  });

  return (
    <Grid fluid>
      <Row className="rowContainer">
        <Col md={12} sm={24}>
          <Card header="Average Dance Accuracy">
            <AccuracyBarChart data={moveAccuracyData} />
          </Card>
        </Col>
        <Col md={12} sm={24}>
          <Card header="Dance Accuracy Over Time">
            <TimeSeriesMultiLineChart data={moveAccuracyData} />
          </Card>
        </Col>
      </Row>
      <Row className="rowContainer">
        <Col md={12} sm={24}>
          <Card header="Average Position Accuracy">
            <AccuracyBarChart data={moveAccuracyData} />
          </Card>
        </Col>
        <Col md={12} sm={24}>
          <Card header="Position Accuracy Over Time">
            <RhythmicLineChart />
          </Card>
        </Col>
      </Row>
      <Row className="rowContainer">
        <Col md={12} sm={24}>
          <Card header="Rhythmic Performance Over Time">
            <TimeSeriesMultiLineChart data={delayData} />
          </Card>
        </Col>
        <Col md={12} sm={24}>
          <Card header="Fatigue Level Over Time">
            <TimeSeriesMultiLineChart data={emgData} reference={70} />
          </Card>
        </Col>
      </Row>
    </Grid>
  );
};

export default TeamAnalytics;
