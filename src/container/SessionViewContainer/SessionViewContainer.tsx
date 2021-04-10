import React from 'react';
import { Alert, Col, Icon, IconButton, Loader, Panel, PanelGroup } from 'rsuite';
import { useMutation, useQuery, useSubscription } from '@apollo/client';
import { useParams } from 'react-router-dom';
import { get, last, meanBy } from 'lodash';
import { isoDateTimeFormatter } from '../../utils/numeric';
import IndividualAnalytics from '../../component/IndividualAnalytics';
import TeamAnalytics from '../../component/TeamAnalytics';
import { getAccuracyData, getDelayData, getEmgData } from '../../utils/analytic';
import SESSION_BY_PK_QUERY from '../../graphql/query/SessionByPkQuery';
import RAW_DATA_SUBSCRIPTION from '../../graphql/subscription/RawDataSubscription';
import PREDICTED_DATA_SUBSCRIPTION from '../../graphql/subscription/PredictedDataSubscription';
import UPDATE_SESSION_BY_PK_MUTATION from '../../graphql/mutation/UpdateSessionByPkMutation';
import ADD_DANCER_ANALYTIC_MUTATION from '../../graphql/mutation/AddDancerAnalyticMutation';
import LAST_POSITION_SUBSCRIPTION from '../../graphql/subscription/LastPositionSubscription';
import ALL_SESSION_QUERY from '../../graphql/query/AllSessionQuery';
import DataLoader from '../../component/DataLoader';
import './SessionViewContainer.css';

const SessionViewContainer: React.FunctionComponent<any> = () => {
  const { id } = useParams<any>();

  const { loading, error, data: sessionData } = useQuery(SESSION_BY_PK_QUERY, {
    variables: {
      id,
    },
  });

  const sessionInfo = get(sessionData, 'sessionInfo', null);

  const endTime = sessionInfo && sessionInfo['end_time'];

  const variables = !loading && {
    deviceId: sessionInfo['participants'].map((value: any) => value.device.id),
    startTime: sessionInfo['start_time'],
    endTime: sessionInfo['end_time'],
  };

  // During real-time streaming we only want the last 600 data-points
  const streamingVariables = {
    ...variables,
    order: 'desc',
    limit: 600,
  };

  const { data: rawDataSubscription } = useSubscription(RAW_DATA_SUBSCRIPTION, {
    variables: endTime ? { ...variables, order: 'asc' } : streamingVariables,
    skip: loading,
  });

  const { data: predictedDataSubscription } = useSubscription(PREDICTED_DATA_SUBSCRIPTION, {
    variables: endTime ? variables : streamingVariables,
    skip: loading,
  });

  const { data: lastPositionSubscription } = useSubscription(LAST_POSITION_SUBSCRIPTION, {
    variables: endTime ? variables : streamingVariables,
    skip: loading,
  });

  const rawData = get(rawDataSubscription, 'raw_data', []);
  const predictedData = get(predictedDataSubscription, 'predicted_data', []);
  const dancerData = get(sessionInfo, 'participants', []);
  const lastPositionData = get(lastPositionSubscription, 'predicted_data', []);

  const expectedDeviceData = dancerData.map((data: any) => ({
    ...data,
    device_id: data['device']['id'],
  }));

  const emgData = getEmgData(expectedDeviceData, rawData, true);

  const delayData = getDelayData(expectedDeviceData, predictedData, true);

  const accuracyData = getAccuracyData(expectedDeviceData, predictedData, true);

  const getDancerAnalytics = () => {
    const dancerId = expectedDeviceData
      .filter((data: any) => data['expected_moves']?.length > 0 && data['expected_positions']?.length > 0)
      .map(({ dancer }: any) => dancer.id);

    return dancerId.map((id: number) => {
      const associatedDelayData = delayData.find(({ dancerId }) => dancerId === id);
      const associatedEmgData = emgData.find(({ dancerId }) => dancerId === id);
      const associatedAccuracy = accuracyData.find(
        ({ moveAccuracy, positionAccuracy }) => moveAccuracy.dancerId === id || positionAccuracy.dancerId === id,
      );
      const moveAccuracy = associatedAccuracy && last(associatedAccuracy.moveAccuracy.data);
      const positionAccuracy = associatedAccuracy && last(associatedAccuracy.positionAccuracy.data);

      return {
        dancer_id: id,
        session_id: sessionInfo.id,
        average_delay: associatedDelayData && meanBy(associatedDelayData.data, (data) => data.value).toFixed(2),
        average_emg: associatedEmgData && meanBy(associatedEmgData.data, (data) => data.value).toFixed(2),
        move_accuracy: moveAccuracy?.value,
        position_accuracy: positionAccuracy?.value,
      };
    });
  };

  const [updateSession, { error: updateError }] = useMutation(UPDATE_SESSION_BY_PK_MUTATION, {
    refetchQueries: [
      {
        query: SESSION_BY_PK_QUERY,
        variables: { id },
      },
      { query: ALL_SESSION_QUERY },
    ],
  });

  const [updateDancerAnalytic, { error: addAnalyticsError }] = useMutation(ADD_DANCER_ANALYTIC_MUTATION, {
    variables: {
      data: getDancerAnalytics(),
    },
    onCompleted: () => updateSession({ variables: { id, endTime: new Date().toISOString() } }),
  });

  if (loading) {
    return <Loader />;
  }

  if (error) {
    Alert.error('ERROR: Unable to load data');
  }

  if (updateError) {
    Alert.error('ERROR: Unable to end session');
  }

  if (addAnalyticsError) {
    Alert.error('ERROR: Unable to update dancer analytics');
  }

  const renderIndividualAnalytics = () => {
    // Sort dancer by device ID
    const sortedDancerData = [...dancerData].sort((a: any, b: any) => a.device.id - b.device.id);

    return sortedDancerData.map((dancer: any, index: number) => (
      <Col md={24 / dancerData.length} sm={24} key={index}>
        <Panel bordered header={`${dancer['dancer']['name']} (${dancer['device']['id']})`}>
          <IndividualAnalytics
            predictedData={predictedData.filter((value: any) => value['device_id'] === dancer['device']['id'])}
            rawData={rawData.filter((value: any) => value['device_id'] === dancer['device']['id'])}
            expectedDanceData={
              dancer['expected_moves'].length > 0 && dancer['expected_moves'].split(',').map((i: string) => i.trim())
            }
            expectedPositionData={
              dancer['expected_positions'].length > 0 &&
              dancer['expected_positions'].split(',').map((i: string) => parseInt(i.trim()))
            }
            showBrush={!!endTime}
          />
        </Panel>
      </Col>
    ));
  };

  return (
    <PanelGroup bordered>
      <Panel
        collapsible={false}
        header={
          <div className="sessionHeaderContainer">
            <div className="sessionInfoContainer">
              <h3>{sessionInfo.name}</h3>
              <span>Start: {isoDateTimeFormatter(sessionInfo['start_time'])}</span>
              {sessionInfo['end_time'] && <span>End: {isoDateTimeFormatter(sessionInfo['end_time'])}</span>}
            </div>
            {!sessionInfo['end_time'] && (
              <IconButton
                icon={<Icon icon="stop" />}
                onClick={() => updateDancerAnalytic()}
                color="red"
                appearance="ghost"
              >
                End Session
              </IconButton>
            )}
          </div>
        }
      />
      <Panel style={{ marginBottom: 20 }} header={<h4>Individual Analytics</h4>} collapsible defaultExpanded>
        {renderIndividualAnalytics()}
      </Panel>
      <Panel header={<h4>Team Analytics</h4>} collapsible defaultExpanded>
        {rawData.length > 0 || predictedData.length > 0 ? (
          <TeamAnalytics
            accuracyData={accuracyData}
            emgData={emgData}
            delayData={delayData}
            lastPositionData={lastPositionData}
          />
        ) : (
          <DataLoader />
        )}
      </Panel>
    </PanelGroup>
  );
};

export default SessionViewContainer;
