import React from 'react';
import SideNavContainer from '../SideNavContainer';
import { Affix, Container, Content } from 'rsuite';
import { Switch, Route } from 'react-router-dom';
import DashboardContainer from '../DashboardContainer';
import ROUTES from '../../constant/Routes';

const AuthenticatedContainer = () => {
  return (
    <Container>
      <Affix>
        <SideNavContainer />
      </Affix>
      <Container>
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
