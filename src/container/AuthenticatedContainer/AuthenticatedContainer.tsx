import React from 'react';
import SideNavContainer from '../SideNavContainer';
import { Affix, Container, Content, Header } from 'rsuite';
import DashboardContainer from '../DashboardContainer';
import './AuthenticatedContainer.css';

const AuthenticatedContainer = () => {
  return (
    <Container>
      <Affix classPrefix="sideNavAffixContainer">
        <SideNavContainer />
      </Affix>
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
