import React from 'react';
import { Alert, Icon, IconButton, Loader, Panel, PanelGroup } from 'rsuite';
import { useMutation, useQuery, useSubscription } from '@apollo/client';
import { useParams } from 'react-router-dom';
import { get } from 'lodash';
import AnalyticsViewContainer from './AnalyticsViewContainer';
import SESSION_BY_PK_QUERY from '../../graphql/query/SessionByPkQuery';
import RAW_DATA_SUBSCRIPTION from '../../graphql/subscription/RawDataSubscription';
import PREDICTED_DATA_SUBSCRIPTION from '../../graphql/subscription/PredictedDataSubscription';
import UPDATE_SESSION_BY_PK_MUTATION from '../../graphql/mutation/UpdateSessionByPkMutation';
import ALL_SESSION_QUERY from '../../graphql/query/AllSessionQuery';
import { isoDateTimeFormatter } from '../../utils/numeric';
import './SessionViewContainer.css';

const SessionViewContainer: React.FunctionComponent<any> = () => {
  const { id } = useParams<any>();

  const { loading, error, data: sessionData } = useQuery(SESSION_BY_PK_QUERY, {
    variables: {
      id,
    },
  });

  const [updateSession, { error: updateError }] = useMutation(UPDATE_SESSION_BY_PK_MUTATION, {
    refetchQueries: [
      {
        query: SESSION_BY_PK_QUERY,
        variables: { id },
      },
      { query: ALL_SESSION_QUERY },
    ],
  });

  const sessionInfo = get(sessionData, 'sessionInfo', null);

  const variables = !loading && {
    deviceId: sessionInfo['participants'].map((value: any) => value.device.id),
    startTime: sessionInfo['start_time'],
    endTime: sessionInfo['end_time'],
  };

  const { data: rawDataSubscription } = useSubscription(RAW_DATA_SUBSCRIPTION, {
    variables,
    skip: loading,
  });

  const { data: predictedDataSubscription } = useSubscription(PREDICTED_DATA_SUBSCRIPTION, {
    variables,
    skip: loading,
  });

  const rawData = get(rawDataSubscription, 'raw_data', []);
  const predictedData = get(predictedDataSubscription, 'predicted_data', []);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    Alert.error('ERROR: Unable to load data');
  }

  if (updateError) {
    Alert.error('ERROR: Unable to end session');
  }

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
                onClick={() => updateSession({ variables: { id, endTime: new Date().toISOString() } })}
                color="red"
                appearance="ghost"
              >
                End Session
              </IconButton>
            )}
          </div>
        }
      />
      <AnalyticsViewContainer predictedData={predictedData} rawData={rawData} dancerData={sessionInfo.participants} />
    </PanelGroup>
  );
};

export default SessionViewContainer;
