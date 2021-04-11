import React from 'react';
import { Alert, Col, Icon, IconButton, Loader, Panel, Row, Table, Tooltip, Whisper } from 'rsuite';
import Card from '../../component/Card';
import AccuracyLineChart from '../../component/AccuracyLineChart';
import EnergyBarChart from '../../component/EnergyBarChart';
import moment from 'moment';
import { Link, useParams } from 'react-router-dom';
import ROUTES from '../../constant/Routes';
import { useQuery } from '@apollo/client';
import { get, takeRight } from 'lodash';
import DANCER_BY_PK_QUERY from '../../graphql/query/DancerByPkQuery';
import DANCER_ANALYTIC_AGGREGATE_QUERY from '../../graphql/query/DancerAnalyticAggregateQuery';
import { percentageFormatter } from '../../utils/numeric';
import DataLoader from '../../component/DataLoader';
import './DancerProfileContainer.css';

const DancerProfileContainer: React.FunctionComponent<any> = () => {
  const { id } = useParams<any>();

  const { loading, error, data, refetch } = useQuery(DANCER_BY_PK_QUERY, {
    variables: {
      id,
    },
  });
  const { loading: aggregateLoading, data: aggregateData, refetch: refetchAggregate } = useQuery(
    DANCER_ANALYTIC_AGGREGATE_QUERY,
  );

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
  const aggregate = get(aggregateData, 'dancer_analytic_aggregate.aggregate');

  const { Column, HeaderCell, Cell } = Table;

  const getGrade = (value: number, mean: number, std: number) => {
    // Assuming normally distributed, we use z * std + mean to find percentile value
    const ninetiethPercentile = 1.28 * std + mean;
    const eightiethPercentile = 0.84 * std + mean;
    const seventiethPercentile = 0.52 * std + mean;
    const sixtiethPercentile = 0.25 * std + mean;

    if (value >= ninetiethPercentile) return 'S';
    if (value < ninetiethPercentile && value >= eightiethPercentile) return 'A';
    if (value < eightiethPercentile && value >= seventiethPercentile) return 'B';
    if (value < seventiethPercentile && value >= sixtiethPercentile) return 'C';
    if (value < sixtiethPercentile && value >= mean) return 'D';
    return 'E';
  };

  if (loading || aggregateLoading || !dancerInfo) return <Loader />;

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
          <IconButton
            icon={<Icon icon="refresh" />}
            onClick={() => {
              refetch();
              refetchAggregate();
            }}
          >
            Refresh
          </IconButton>
        </div>
      }
      bordered
    >
      {totalSession ? (
        <>
          <Row style={{ display: 'flex', marginBottom: 10 }}>
            <Col md={6} sm={8} style={{ flexGrow: 1 }}>
              <Card header="Total Sessions">
                <h4>{totalSession}</h4>
              </Card>
            </Col>
            <Col md={6} sm={8}>
              <Card header="Average Dance Move Accuracy">
                <h4>{(avgData['move_accuracy'] * 100)?.toFixed(2)}%</h4>
                <Whisper
                  placement="bottom"
                  trigger="hover"
                  speaker={
                    <Tooltip>
                      <div>Min: {percentageFormatter(aggregate['min']['move_accuracy'])}</div>
                      <div>Max: {percentageFormatter(aggregate['max']['move_accuracy'])}</div>
                      <div>Mean: {percentageFormatter(aggregate['avg']['move_accuracy'])}</div>
                      <div>Std: {aggregate['stddev']['move_accuracy'].toFixed(2)}</div>
                      <div>Var: {aggregate['variance']['move_accuracy'].toFixed(2)}</div>
                    </Tooltip>
                  }
                >
                  <h6>
                    Grade:{' '}
                    {getGrade(
                      avgData['move_accuracy'],
                      aggregate['avg']['move_accuracy'],
                      aggregate['stddev']['move_accuracy'],
                    )}
                  </h6>
                </Whisper>
              </Card>
            </Col>
            <Col md={6} sm={8}>
              <Card header="Average Dance Position Accuracy">
                <h4>{(avgData['position_accuracy'] * 100).toFixed(2)}%</h4>
                <Whisper
                  placement="bottom"
                  trigger="hover"
                  speaker={
                    <Tooltip>
                      <div>Min: {percentageFormatter(aggregate['min']['position_accuracy'])}</div>
                      <div>Max: {percentageFormatter(aggregate['max']['position_accuracy'])}</div>
                      <div>Mean: {percentageFormatter(aggregate['avg']['position_accuracy'])}</div>
                      <div>Std: {aggregate['stddev']['position_accuracy'].toFixed(2)}</div>
                      <div>Var: {aggregate['variance']['position_accuracy'].toFixed(2)}</div>
                    </Tooltip>
                  }
                >
                  <h6>
                    Grade:{' '}
                    {getGrade(
                      avgData['position_accuracy'],
                      aggregate['avg']['position_accuracy'],
                      aggregate['stddev']['position_accuracy'],
                    )}
                  </h6>
                </Whisper>
              </Card>
            </Col>
            <Col md={6} sm={8}>
              <Card header="Average Sync Delay (ms)">
                <h4>{avgData?.averge_delay?.toFixed(2)}</h4>
              </Card>
            </Col>
          </Row>
          <Row style={{ marginBottom: 10 }}>
            <Col md={12} sm={24}>
              <Card header="Average Sync Delay Over Session">
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
              <Card header="Average Calories Burned Per Session">
                <EnergyBarChart data={takeRight(sessionAggregateData, 5)} dataKey="emgReading" name="Calories Burned" />
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
        </>
      ) : (
        <DataLoader content="Waiting for New Sessions" />
      )}
    </Panel>
  );
};

export default DancerProfileContainer;
