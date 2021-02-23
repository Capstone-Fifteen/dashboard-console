import React from 'react';
import { Col, Panel, Row } from 'rsuite';
import AccuracyBarChart from '../AccuracyBarChart';
import './TeamAnalytics.css';

const TeamAnalytics: React.FunctionComponent = () => {
  return (
    <Row>
      <Col md={12} sm={24}>
        <Panel header="Dance Accuracy" bordered>
          <div className="cardContainer">
            <AccuracyBarChart />
          </div>
        </Panel>
      </Col>
      <Col md={12} sm={24}>
        <Panel header="Position Accuracy" bordered>
          <div className="cardContainer">
            <AccuracyBarChart />
          </div>
        </Panel>
      </Col>
    </Row>
  );
};

export default TeamAnalytics;
