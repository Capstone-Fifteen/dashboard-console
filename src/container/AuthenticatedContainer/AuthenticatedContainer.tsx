import React from 'react';
import SideNavContainer from '../SideNavContainer';
import { Affix, Container, Content, Header } from 'rsuite';
import { Switch, Route } from 'react-router-dom';
import DashboardContainer from '../DashboardContainer';
import './AuthenticatedContainer.css';
import ROUTES from '../../constant/Routes';

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
          <Switch>
            <Route path={ROUTES.DASHBOARD}>
              <DashboardContainer />
            </Route>
            <Route path={ROUTES.ROOT}>
              <DashboardContainer />
            </Route>
          </Switch>
        </Content>
      </Container>
    </Container>
  );
};

export default AuthenticatedContainer;
