import React from 'react';
import { Col, Grid, Row } from 'rsuite';
import AccuracyBarChart from '../AccuracyBarChart';
import TimeSeriesMultiLineChart from '../TimeSeriesMultiLineChart';
import Card from '../Card';
import './TeamAnalytics.css';

interface Props {
  delayData: any[];
  emgData: any[];
  accuracyData: any[];
  lastPositionData?: any[];
}

const TeamAnalytics: React.FunctionComponent<Props> = ({ delayData, emgData, accuracyData, lastPositionData }) => {
  const moveAccuracy = accuracyData.map((data) => data.moveAccuracy).filter((dancer) => dancer.data?.length > 0);
  const positionAccuracy = accuracyData
    .map((data) => data.positionAccuracy)
    .filter((dancer) => dancer.data?.length > 0);

  const positionData = lastPositionData
    ?.sort((a, b) => a['dance_position'] - b['dance_position'])
    .map((item) => item['device_id']);

  return (
    <Grid fluid>
      {positionData && positionData.length > 0 && (
        <Row className="rowContainer">
          <Col md={24} sm={24}>
            <Card header="Current Position">
              <h3>{positionData.join(' ')}</h3>
            </Card>
          </Col>
        </Row>
      )}
      {moveAccuracy.length > 0 && (
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
      )}
      {positionAccuracy.length > 0 && (
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
      )}
      <Row className="rowContainer">
        <Col md={12} sm={24}>
          <Card header="Rhythmic Performance Over Time">
            <TimeSeriesMultiLineChart data={delayData} />
          </Card>
        </Col>
        <Col md={12} sm={24}>
          <Card header="Fatigue Level Over Time">
            <TimeSeriesMultiLineChart data={emgData} reference={700} />
          </Card>
        </Col>
      </Row>
    </Grid>
  );
};

export default TeamAnalytics;
