import React from 'react';
import { Col, Grid, Panel, Row } from 'rsuite';
import AccuracyBarChart from '../AccuracyBarChart';
import RhythmicLineChart from '../RhythmicLineChart';
import './TeamAnalytics.css';

const TeamAnalytics: React.FunctionComponent = () => {
  return (
    <Grid fluid>
      <Row className="rowContainer">
        <Col md={12} sm={24}>
          <Panel header="Dance Accuracy" bordered>
            <div className="cardContainer">
              <AccuracyBarChart />
            </div>
          </Panel>
        </Col>
        <Col md={12} sm={24}>
          <Panel header="Dance Accuracy Over Time" bordered>
            <div className="cardContainer">
              <RhythmicLineChart />
            </div>
          </Panel>
        </Col>
      </Row>
      <Row className="rowContainer">
        <Col md={12} sm={24}>
          <Panel header="Position Accuracy" bordered>
            <div className="cardContainer">
              <AccuracyBarChart />
            </div>
          </Panel>
        </Col>
        <Col md={12} sm={24}>
          <Panel header="Position Accuracy Over Time" bordered>
            <div className="cardContainer">
              <RhythmicLineChart />
            </div>
          </Panel>
        </Col>
      </Row>
      <Row className="rowContainer">
        <Col md={12} sm={24}>
          <Panel header="Rhythmic Performance Over Time" bordered>
            <div className="cardContainer">
              <RhythmicLineChart />
            </div>
          </Panel>
        </Col>
      </Row>
    </Grid>
  );
};

export default TeamAnalytics;
