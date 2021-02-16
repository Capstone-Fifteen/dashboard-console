import React from 'react';
import SideNavContainer from '../SideNavContainer';
import { Container, Content, Header } from 'rsuite';
import DashboardContainer from '../DashboardContainer';

const AuthenticatedContainer = () => {
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
