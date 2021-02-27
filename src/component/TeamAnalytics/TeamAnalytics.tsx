import React from 'react';
import { Col, Grid, Row } from 'rsuite';
import AccuracyBarChart from '../AccuracyBarChart';
import RhythmicLineChart from '../RhythmicLineChart';
import FatigueLineChart from '../FatigueLineChart';
import Card from '../Card';

import './TeamAnalytics.css';

interface Props {
  predictedData: any[];
  rawData: any[];
  expectedData: any[];
}

const TeamAnalytics: React.FunctionComponent<Props> = ({ predictedData, rawData, expectedData }) => {
  const deviceId = expectedData.map((data) => parseInt(data['device_id']));

  console.log(predictedData);

  const emgData = deviceId.map((id) => {
    const filteredData = rawData
      .filter((data) => data['device_id'] === id)
      .map((data) => ({ timestamp: new Date(data['created_at']).getTime(), value: data['emg_reading'] }));

    return {
      deviceId: id,
      data: filteredData,
    };
  });

  const delayData = deviceId.map((id) => {
    const filteredData = predictedData
      .filter((data) => data['device_id'] === id)
      .map((data) => ({ timestamp: new Date(data['created_at']).getTime(), value: data['delay'] }));

    return {
      deviceId: id,
      data: filteredData,
    };
  });

  return (
    <Grid fluid>
      <Row className="rowContainer">
        <Col md={12} sm={24}>
          <Card header="Average Dance Accuracy">
            <AccuracyBarChart />
          </Card>
        </Col>
        <Col md={12} sm={24}>
          <Card header="Dance Accuracy Over Time">
            <RhythmicLineChart />
          </Card>
        </Col>
      </Row>
      <Row className="rowContainer">
        <Col md={12} sm={24}>
          <Card header="Average Position Accuracy">
            <AccuracyBarChart />
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
            <FatigueLineChart data={delayData} />
          </Card>
        </Col>
        <Col md={12} sm={24}>
          <Card header="Fatigue Level Over Time">
            <FatigueLineChart data={emgData} />
          </Card>
        </Col>
      </Row>
    </Grid>
  );
};

export default TeamAnalytics;
