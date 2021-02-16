import React from 'react';
import SideNavContainer from '../SideNavContainer';
import { Container, Content, Header } from 'rsuite';
import { useSubscription } from '@apollo/client';
import RAW_DATA_SUBSCRIPTION from '../../graphql/subscription/RawDataSubscription';
import PREDICTED_DATA_SUBSCRIPTION from '../../graphql/subscription/PredictedDataSubscription';
import DashboardContainer from '../DashboardContainer';

const AuthenticatedContainer = () => {
  const { data: rawData } = useSubscription(RAW_DATA_SUBSCRIPTION);
  const { data: predictedData } = useSubscription(PREDICTED_DATA_SUBSCRIPTION);

  return (
    <Container>
      <SideNavContainer />
      <Container>
        <Header>
          <h2>Dashboard</h2>
        </Header>
        <Content>
          <DashboardContainer />
        </Content>
      </Container>
    </Container>
  );
};

export default AuthenticatedContainer;
