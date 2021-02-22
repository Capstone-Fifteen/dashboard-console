import React from 'react';
import SideNavContainer from '../SideNavContainer';
import { Affix, Container, Content } from 'rsuite';
import { Switch, Route } from 'react-router-dom';
import DashboardContainer from '../DashboardContainer';
import ROUTES from '../../constant/Routes';
import DeviceAddContainer from '../DeviceAddContainer';
import './AuthenticatedContainer.css';

const AuthenticatedContainer = () => {
  return (
    <Container>
      <Affix>
        <SideNavContainer />
      </Affix>
      <Container>
        <Content classPrefix="contentContainer">
          <Switch>
            <Route path={ROUTES.DASHBOARD}>
              <DashboardContainer />
            </Route>
            <Route path={ROUTES.DEVICE_NEW}>
              <DeviceAddContainer />
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
