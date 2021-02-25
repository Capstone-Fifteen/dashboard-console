import React from 'react';
import { Col, Panel, Row, Table } from 'rsuite';
import Card from '../../component/Card';
import AccuracyLineChart from '../../component/AccuracyLineChart';
import moment from 'moment';
import { Link } from 'react-router-dom';
import ROUTES from '../../constant/Routes';

const DancerProfileContainer: React.FunctionComponent<any> = () => {
  const { Column, HeaderCell, Cell } = Table;

  const danceAccuracyData = [
    {
      name: 'Hip-Hop 1',
      value: 0.8,
    },
    {
      name: 'Jazz 1',
      value: 0.75,
    },
    {
      name: 'Hip-Hop 2',
      value: 0.65,
    },
    {
      name: 'Jazz 2',
      value: 0.44,
    },
    {
      name: 'Ballet 1',
      value: 0.62,
    },
  ];

  const positionAccuracyData = [
    {
      name: 'Hip-Hop 1',
      value: 0.54,
    },
    {
      name: 'Jazz 1',
      value: 0.68,
    },
    {
      name: 'Hip-Hop 2',
      value: 0.27,
    },
    {
      name: 'Jazz 2',
      value: 0.55,
    },
    {
      name: 'Ballet 1',
      value: 0.95,
    },
  ];

  const fatigueData = [
    {
      name: 'Hip-Hop 1',
      value: 50,
    },
    {
      name: 'Jazz 1',
      value: 80,
    },
    {
      name: 'Hip-Hop 2',
      value: 60,
    },
    {
      name: 'Jazz 2',
      value: 54,
    },
    {
      name: 'Ballet 1',
      value: 75,
    },
  ];

  const rhythmData = [
    {
      name: 'Hip-Hop 1',
      value: -0.25,
    },
    {
      name: 'Jazz 1',
      value: 1.03,
    },
    {
      name: 'Hip-Hop 2',
      value: 0.54,
    },
    {
      name: 'Jazz 2',
      value: -0.65,
    },
    {
      name: 'Ballet 1',
      value: -0.15,
    },
  ];

  const sessionData = () => {
    return danceAccuracyData.map((item, index) => ({
      name: item.name,
      danceAccuracy: item.value,
      positionAccuracy: positionAccuracyData[index].value,
      fatigue: fatigueData[index].value,
      rhythm: rhythmData[index].value,
      startTime: moment(new Date()).format('LT'),
      endTime: moment(new Date()).format('LT'),
    }));
  };

  return (
    <Panel header={<h3>Dancer Profile</h3>} bordered>
      <Row style={{ display: 'flex', marginBottom: 10 }}>
        <Col md={6} sm={8} style={{ flexGrow: 1 }}>
          <Card header="Total Sessions">
            <h4>5</h4>
          </Card>
        </Col>
        <Col md={6} sm={8}>
          <Card header="Average Dance Move Accuracy">
            <h4>88%</h4>
            <h6>Grade: S</h6>
          </Card>
        </Col>
        <Col md={6} sm={8}>
          <Card header="Average Dance Position Accuracy">
            <h4>75%</h4>
            <h6>Grade: A</h6>
          </Card>
        </Col>
        <Col md={6} sm={8}>
          <Card header="Average Rhythmic Performance">
            <h4>-0.5</h4>
            <h6>On-Time</h6>
          </Card>
        </Col>
      </Row>
      <Row style={{ marginBottom: 10 }}>
        <Col md={12} sm={24}>
          <Card header="Average Dance Accuracy Over Session">
            <AccuracyLineChart data={danceAccuracyData} />
          </Card>
        </Col>
        <Col md={12} sm={24}>
          <Card header="Average Position Accuracy Over Session">
            <AccuracyLineChart data={positionAccuracyData} />
          </Card>
        </Col>
      </Row>
      <Row style={{ marginBottom: 10 }}>
        <Col md={12} sm={24}>
          <Card header="Average Fatigue Level Over Session">
            <AccuracyLineChart threshold={70} data={fatigueData} />
          </Card>
        </Col>
        <Col md={12} sm={24}>
          <Card header="Average Rhythmic Performance Over Session">
            <AccuracyLineChart data={rhythmData} />
          </Card>
        </Col>
      </Row>
      <Row>
        <Col md={24} sm={24}>
          <Panel bordered header="All Participated Sessions">
            <Table data={sessionData()} height={500}>
              <Column align="center" flexGrow={1}>
                <HeaderCell>Session Name</HeaderCell>
                <Cell dataKey="name" />
              </Column>
              <Column align="center" flexGrow={1}>
                <HeaderCell>Start Time</HeaderCell>
                <Cell dataKey="startTime" />
              </Column>
              <Column align="center" flexGrow={1}>
                <HeaderCell>End Time</HeaderCell>
                <Cell dataKey="endTime" />
              </Column>
              <Column align="center" flexGrow={1}>
                <HeaderCell>Dance Accuracy</HeaderCell>
                <Cell dataKey="danceAccuracy" />
              </Column>
              <Column align="center" flexGrow={1}>
                <HeaderCell>Position Accuracy</HeaderCell>
                <Cell dataKey="positionAccuracy" />
              </Column>
              <Column align="center" flexGrow={1}>
                <HeaderCell>Fatigue</HeaderCell>
                <Cell dataKey="fatigue" />
              </Column>
              <Column align="center" flexGrow={1}>
                <HeaderCell>Rhythmic</HeaderCell>
                <Cell dataKey="rhythm" />
              </Column>
              <Column width={100}>
                <HeaderCell>Actions</HeaderCell>
                <Cell>{() => <Link to={ROUTES.DASHBOARD}>View</Link>}</Cell>
              </Column>
            </Table>
          </Panel>
        </Col>
      </Row>
    </Panel>
  );
};

export default DancerProfileContainer;
