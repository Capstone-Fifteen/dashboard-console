import React from 'react';
import SideNavContainer from '../SideNavContainer';
import { Container, Content, Header } from 'rsuite';

export default class AuthenticatedContainer extends React.Component<any, any> {
  render() {
    return (
      <Container>
        <SideNavContainer />
        <Container>
          <Header>
            <h2>Dashboard</h2>
          </Header>
          <Content>Hello World</Content>
        </Container>
      </Container>
    );
  }
}
