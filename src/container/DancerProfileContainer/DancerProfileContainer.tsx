import React from 'react';
import { Alert, Col, Icon, IconButton, Loader, Panel, Row, Table } from 'rsuite';
import Card from '../../component/Card';
import AccuracyLineChart from '../../component/AccuracyLineChart';
import moment from 'moment';
import { Link, useParams } from 'react-router-dom';
import ROUTES from '../../constant/Routes';
import { useQuery } from '@apollo/client';
import { get } from 'lodash';
import DANCER_BY_PK_QUERY from '../../graphql/query/DancerByPkQuery';
import './DancerProfileContainer.css';

const DancerProfileContainer: React.FunctionComponent<any> = () => {
  const { id } = useParams<any>();

  const { loading, error, data, refetch } = useQuery(DANCER_BY_PK_QUERY, {
    variables: {
      id,
    },
  });

  const dancerInfo = get(data, 'dancer');
  const totalSession = get(dancerInfo, 'participants_aggregate.aggregate.count');
  const avgData = get(dancerInfo, 'dancer_analytics_aggregate.aggregate.avg');
  const sessionAggregateData = get(dancerInfo, 'dancer_analytics', []).map((data: any) => ({
    name: data['session']['name'],
    sessionId: data['session']['id'],
    startTime: moment(data['session']['start_time']).format('lll'),
    endTime: moment(data['session']['end_time']).format('lll') || 'In Progress',
    moveAccuracy: (data['move_accuracy'] * 100).toFixed(2),
    positionAccuracy: (data['position_accuracy'] * 100).toFixed(2),
    emgReading: data['average_emg'],
    delayReading: data['average_delay'],
  }));

  const { Column, HeaderCell, Cell } = Table;

  const getGrade = (value: number) => {
    if (value >= 0.9) return 'S';
    if (value < 0.9 && value >= 0.8) return 'A';
    if (value < 0.8 && value >= 0.7) return 'B';
    if (value < 0.7 && value >= 0.6) return 'C';
    if (value < 0.6 && value >= 0.5) return 'D';
    return 'E';
  };

  const getDelayType = (delay: number) => {
    if (delay > 0.5) {
      return 'Fast';
    }
    if (delay < -0.5) {
      return 'Slow';
    }
    return 'On Time';
  };

  if (loading || !dancerInfo) return <Loader />;

  if (error) {
    Alert.error('ERROR: Unable to load dancer');
  }

  return (
    <Panel
      header={
        <div className="profileHeaderContainer">
          <div>
            <h3>Dancer Profile</h3>
            <h5>{dancerInfo.name}</h5>
          </div>
          <IconButton icon={<Icon icon="refresh" />} onClick={() => refetch()}>
            Refresh
          </IconButton>
        </div>
      }
      bordered
    >
      <Row style={{ display: 'flex', marginBottom: 10 }}>
        <Col md={6} sm={8} style={{ flexGrow: 1 }}>
          <Card header="Total Sessions">
            <h4>{totalSession}</h4>
          </Card>
        </Col>
        <Col md={6} sm={8}>
          <Card header="Average Dance Move Accuracy">
            <h4>{(avgData['move_accuracy'] * 100).toFixed(2)}%</h4>
            <h6>Grade: {getGrade(avgData['move_accuracy'])}</h6>
          </Card>
        </Col>
        <Col md={6} sm={8}>
          <Card header="Average Dance Position Accuracy">
            <h4>{(avgData['position_accuracy'] * 100).toFixed(2)}%</h4>
            <h6>Grade: {getGrade(avgData['position_accuracy'])}</h6>
          </Card>
        </Col>
        <Col md={6} sm={8}>
          <Card header="Average Rhythmic Performance">
            <h4>{avgData['average_delay'].toFixed(2)} s</h4>
            <h6>{getDelayType(avgData['average_delay'])}</h6>
          </Card>
        </Col>
      </Row>
      <Row style={{ marginBottom: 10 }}>
        <Col md={12} sm={24}>
          <Card header="Average Dance Accuracy Over Session">
            <AccuracyLineChart
              data={sessionAggregateData}
              dataKey="moveAccuracy"
              domain={[0, 100]}
              name="Move Accuracy"
              percentage
            />
          </Card>
        </Col>
        <Col md={12} sm={24}>
          <Card header="Average Position Accuracy Over Session">
            <AccuracyLineChart
              data={sessionAggregateData}
              dataKey="positionAccuracy"
              domain={[0, 100]}
              name="Position Accuracy"
              percentage
            />
          </Card>
        </Col>
      </Row>
      <Row style={{ marginBottom: 10 }}>
        <Col md={12} sm={24}>
          <Card header="Average Fatigue Level Over Session">
            <AccuracyLineChart
              threshold={70}
              data={sessionAggregateData}
              dataKey="emgReading"
              domain={['auto', 'auto']}
              name="Fatigue"
            />
          </Card>
        </Col>
        <Col md={12} sm={24}>
          <Card header="Average Rhythmic Performance Over Session">
            <AccuracyLineChart data={sessionAggregateData} dataKey="delayReading" domain={[-5, 5]} name="Delay" />
          </Card>
        </Col>
      </Row>
      <Row>
        <Col md={24} sm={24}>
          <Panel bordered header="All Participated Sessions">
            <Table data={sessionAggregateData} height={500}>
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
                <Cell dataKey="moveAccuracy" />
              </Column>
              <Column align="center" flexGrow={1}>
                <HeaderCell>Position Accuracy</HeaderCell>
                <Cell dataKey="positionAccuracy" />
              </Column>
              <Column align="center" flexGrow={1}>
                <HeaderCell>Fatigue</HeaderCell>
                <Cell dataKey="emgReading" />
              </Column>
              <Column align="center" flexGrow={1}>
                <HeaderCell>Rhythmic</HeaderCell>
                <Cell dataKey="delayReading" />
              </Column>
              <Column width={100}>
                <HeaderCell>Actions</HeaderCell>
                <Cell>{(rowData: any) => <Link to={`${ROUTES.SESSION_ALL}/${rowData.sessionId}`}>View</Link>}</Cell>
              </Column>
            </Table>
          </Panel>
        </Col>
      </Row>
    </Panel>
  );
};

export default DancerProfileContainer;
