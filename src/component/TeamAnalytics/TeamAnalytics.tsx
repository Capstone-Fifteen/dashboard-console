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
}

const TeamAnalytics: React.FunctionComponent<Props> = ({ delayData, emgData, accuracyData }) => {
  const moveAccuracy = accuracyData.map((data) => data.moveAccuracy).filter((dancer) => dancer.data?.length > 0);
  const positionAccuracy = accuracyData
    .map((data) => data.positionAccuracy)
    .filter((dancer) => dancer.data?.length > 0);

  return (
    <Grid fluid>
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
            <TimeSeriesMultiLineChart data={emgData} reference={70} />
          </Card>
        </Col>
      </Row>
    </Grid>
  );
};

export default TeamAnalytics;
