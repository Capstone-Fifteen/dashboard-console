import React from 'react';
import { Col, Grid, Row } from 'rsuite';
import AccuracyBarChart from '../AccuracyBarChart';
import TimeSeriesMultiLineChart from '../TimeSeriesMultiLineChart';
import Card from '../Card';
import { mean } from 'lodash';

import './TeamAnalytics.css';

interface Props {
  predictedData: any[];
  rawData: any[];
  expectedData: any[];
  session?: boolean;
}

const TeamAnalytics: React.FunctionComponent<Props> = ({ predictedData, rawData, expectedData, session }) => {
  // Restructure expectedData so that deviceId has a type int

  const expectedDeviceData = expectedData.map((data) => ({
    ...data,
    device_id: session ? data['device']['id'] : parseInt(data['device_id']),
  }));

  const emgData = expectedDeviceData.map(({ device_id, dancer }) => {
    const filteredData = rawData
      .filter((data) => data['device_id'] === device_id)
      .map((data) => ({ timestamp: new Date(data['created_at']).getTime(), value: data['emg_reading'] }));

    return {
      id: session ? dancer.name : device_id, // we use dancer's name as the identifier
      data: filteredData,
    };
  });

  const delayData = expectedDeviceData.map(({ device_id, dancer }) => {
    const filteredData = predictedData
      .filter((data) => data['device_id'] === device_id)
      .map((data) => ({ timestamp: new Date(data['created_at']).getTime(), value: data['delay'] }));

    return {
      id: session ? dancer.name : device_id,
      data: filteredData,
    };
  });

  const accuracyData = expectedDeviceData.map(({ device_id, expected_moves, expected_positions, dancer }) => {
    // get predicted data for the specific device ID
    const filteredData = predictedData.filter((data) => data['device_id'] === device_id);

    // get expected dance moves
    const expectedDanceMoves = expected_moves.split(',').map((move: string) => move.trim());

    // get expected dance positions
    const expectedDancePositions = expected_positions.split(',').map((position: string) => parseInt(position.trim()));
    const dataLength = Math.min(filteredData.length, expectedDanceMoves.length);

    // accuracy of dance moves so far
    let moveAccuracyRate: number[] = [];

    // accuracy of dance positions so far
    let positionAccuracyRate: number[] = [];
    let timestamp: number[] = [];

    let currentMoveAccuracy = 0;
    let currentPositionAccuracy = 0;
    for (let i = 0; i < dataLength; i++) {
      // get current predicted data (indexed from the back)
      const currentPredictedData = filteredData[filteredData.length - i - 1];

      // set accuracy += 1 if predicted = expected
      if (currentPredictedData['dance_move'] === expectedDanceMoves[i]) {
        currentMoveAccuracy++;
      }
      if (currentPredictedData['dance_position'] === expectedDancePositions[i]) {
        currentPositionAccuracy++;
      }

      // calculate the running average
      const averageMoveAccuracy = currentMoveAccuracy / (i + 1);
      const averagePositionAccuracy = currentPositionAccuracy / (i + 1);

      // push current accuracy into respective accuracy array
      moveAccuracyRate.push(averageMoveAccuracy);
      positionAccuracyRate.push(averagePositionAccuracy);
      timestamp.push(new Date(currentPredictedData['created_at']).getTime());
    }

    return {
      moveAccuracy: {
        id: session ? dancer.name : device_id,
        data: moveAccuracyRate.map((value, index) => ({
          timestamp: timestamp[index],
          value,
        })),
        average: mean(moveAccuracyRate),
      },
      positionAccuracy: {
        id: session ? dancer.name : device_id,
        data: positionAccuracyRate.map((value, index) => ({
          timestamp: timestamp[index],
          value,
        })),
        average: mean(positionAccuracyRate),
      },
    };
  });

  const moveAccuracy = accuracyData.map((data) => data.moveAccuracy);
  const positionAccuracy = accuracyData.map((data) => data.positionAccuracy);

  return (
    <Grid fluid>
      <Row className="rowContainer">
        <Col md={12} sm={24}>
          <Card header="Average Dance Accuracy">
            <AccuracyBarChart percentage data={moveAccuracy} />
          </Card>
        </Col>
        <Col md={12} sm={24}>
          <Card header="Dance Accuracy Over Time">
            <TimeSeriesMultiLineChart percentage data={moveAccuracy} />
          </Card>
        </Col>
      </Row>
      <Row className="rowContainer">
        <Col md={12} sm={24}>
          <Card header="Average Position Accuracy">
            <AccuracyBarChart percentage data={positionAccuracy} />
          </Card>
        </Col>
        <Col md={12} sm={24}>
          <Card header="Position Accuracy Over Time">
            <TimeSeriesMultiLineChart percentage data={positionAccuracy} />
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
