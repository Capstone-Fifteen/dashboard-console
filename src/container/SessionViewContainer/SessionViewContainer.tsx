import React from 'react';
import { Alert, Loader, PanelGroup } from 'rsuite';
import { useQuery, useSubscription } from '@apollo/client';
import { useParams } from 'react-router-dom';
import { get } from 'lodash';
import SESSION_BY_PK_QUERY from '../../graphql/query/SessionByPkQuery';
import RAW_DATA_SUBSCRIPTION from '../../graphql/subscription/RawDataSubscription';
import PREDICTED_DATA_SUBSCRIPTION from '../../graphql/subscription/PredictedDataSubscription';

const SessionViewContainer: React.FunctionComponent<any> = () => {
  const { id } = useParams<any>();

  const { loading, error, data: sessionData } = useQuery(SESSION_BY_PK_QUERY, {
    variables: {
      id,
    },
  });

  const sessionInfo = get(sessionData, 'sessionInfo', null);

  const variables = {
    deviceId: sessionInfo['participants'].map((value: any) => value.device.id),
    // startTime: sessionInfo['start_time'],
    // endTime: sessionInfo['end_time'],
  };

  const { data: rawDataSubscription } = useSubscription(RAW_DATA_SUBSCRIPTION, {
    variables,
    skip: loading,
  });

  const { data: predictedDataSubscription } = useSubscription(PREDICTED_DATA_SUBSCRIPTION, {
    variables,
    skip: loading,
  });

  if (loading) {
    return <Loader />;
  }

  if (error) {
    Alert.error('Error: Unable to load data');
  }

  return (
    <PanelGroup accordion bordered>
      <h3 style={{ padding: '10px 20px' }}>{sessionInfo.name}</h3>
    </PanelGroup>
  );
};

export default SessionViewContainer;
