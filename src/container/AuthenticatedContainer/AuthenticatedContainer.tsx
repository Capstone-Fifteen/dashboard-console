import React from 'react';
import SideNavContainer from '../SideNavContainer';
import { Container, Content } from 'rsuite';
import { Switch, Route } from 'react-router-dom';
import DashboardContainer from '../DashboardContainer';
import ROUTES from '../../constant/Routes';
import DeviceAddContainer from '../DeviceAddContainer';
import DeviceListContainer from '../DeviceListConatiner';
import DancerAddContainer from '../DancerAddContainer';
import DancerListContainer from '../DancerListContainer';
import SessionNewContainer from '../SessionNewContainer';
import DancerProfileContainer from '../DancerProfileContainer';

import './AuthenticatedContainer.css';

const AuthenticatedContainer = () => {
  return (
    <Container>
      <SideNavContainer />
      <Container>
        <Content className="contentContainer">
          <Switch>
            <Route path={ROUTES.DASHBOARD}>
              <DashboardContainer />
            </Route>
            <Route path={ROUTES.DANCER_NEW}>
              <DancerAddContainer />
            </Route>
            <Route path={ROUTES.DANCER_INFO}>
              <DancerProfileContainer />
            </Route>
            <Route path={ROUTES.DANCER_ALL}>
              <DancerListContainer />
            </Route>
            <Route path={ROUTES.DEVICE_NEW}>
              <DeviceAddContainer />
            </Route>
            <Route path={ROUTES.DEVICE_ALL}>
              <DeviceListContainer />
            </Route>
            <Route path={ROUTES.SESSION_NEW}>
              <SessionNewContainer />
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
