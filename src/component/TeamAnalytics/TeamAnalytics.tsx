import React from 'react';
import { Col, Grid, Row } from 'rsuite';
import AccuracyBarChart from '../AccuracyBarChart';
import RhythmicLineChart from '../RhythmicLineChart';
import FatigueLineChart from '../FatigueLineChart';

import './TeamAnalytics.css';
import Card from '../Card';

const TeamAnalytics: React.FunctionComponent = () => {
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
            <RhythmicLineChart />
          </Card>
        </Col>
        <Col md={12} sm={24}>
          <Card header="Fatigue Level Over Time">
            <FatigueLineChart />
          </Card>
        </Col>
      </Row>
    </Grid>
  );
};

export default TeamAnalytics;
