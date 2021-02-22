import React, { useState } from 'react';
import { Dropdown, Icon, Nav, Navbar, Sidebar, Sidenav } from 'rsuite';
import { Link } from 'react-router-dom';
import {
  ALL_DANCER_EVENT_KEY,
  DANCER_EVENT_KEY,
  DASHBOARD_EVENT_KEY,
  NEW_DANCER_EVENT_KEY,
  NEW_SESSION_EVENT_KEY,
  OVERVIEW_EVENT_KEY,
  PAST_SESSION_EVENT_KEY,
  SESSION_EVENT_KEY,
} from '../../constant/SideNavEventKey';
import ROUTES from '../../constant/Routes';

import './SideNavContainer.css';

const SideNavContainer: React.FunctionComponent<any> = () => {
  const [expand, setExpand] = useState(true);
  const [selectedPanel, setSelectedPanel] = useState('dashboard');

  const toggleExpand = () => setExpand(!expand);
  const checkActive = (eventKey: string) => selectedPanel === eventKey;

  return (
    <Sidebar className="sideBarContainer" width={expand ? 260 : 56} collapsible>
      <Sidenav expanded={expand} appearance="subtle" onSelect={(eventKey) => setSelectedPanel(eventKey)}>
        <Sidenav.Header>
          <div className="headerContainer">
            <Icon icon="play" size="lg" style={{ verticalAlign: 0 }} />
            {expand && <span style={{ marginLeft: 12 }}>Dance Dance</span>}
          </div>
        </Sidenav.Header>
        <Sidenav.Body>
          <Nav>
            <Nav.Item
              eventKey={DASHBOARD_EVENT_KEY}
              active={checkActive(DASHBOARD_EVENT_KEY)}
              icon={<Icon icon="line-chart" />}
              componentClass={Link}
              to={ROUTES.DASHBOARD}
            >
              Live
            </Nav.Item>
            <Nav.Item
              eventKey={OVERVIEW_EVENT_KEY}
              active={checkActive(OVERVIEW_EVENT_KEY)}
              icon={<Icon icon="dashboard" />}
              componentClass={Link}
              to={ROUTES.OVERVIEW}
            >
              Overview
            </Nav.Item>
            <Dropdown
              eventKey={DANCER_EVENT_KEY}
              title="Dancer"
              icon={<Icon icon="user" />}
              placement="rightStart"
              trigger="hover"
            >
              <Dropdown.Item
                eventKey={NEW_DANCER_EVENT_KEY}
                active={checkActive(NEW_DANCER_EVENT_KEY)}
                componentClass={Link}
                to={ROUTES.DANCER_NEW}
              >
                New Dancer
              </Dropdown.Item>
              <Dropdown.Item
                eventKey={ALL_DANCER_EVENT_KEY}
                active={checkActive(ALL_DANCER_EVENT_KEY)}
                componentClass={Link}
                to={ROUTES.DANCER_NEW}
              >
                All Dancers
              </Dropdown.Item>
            </Dropdown>
            <Dropdown
              eventKey={SESSION_EVENT_KEY}
              title="Session"
              icon={<Icon icon="music" />}
              placement="rightStart"
              trigger="hover"
            >
              <Dropdown.Item
                eventKey={NEW_SESSION_EVENT_KEY}
                active={checkActive(NEW_SESSION_EVENT_KEY)}
                componentClass={Link}
                to={ROUTES.SESSION_NEW}
              >
                New Session
              </Dropdown.Item>
              <Dropdown.Item
                eventKey={PAST_SESSION_EVENT_KEY}
                active={checkActive(PAST_SESSION_EVENT_KEY)}
                componentClass={Link}
                to={ROUTES.SESSION_ALL}
              >
                Past Sessions
              </Dropdown.Item>
            </Dropdown>
          </Nav>
        </Sidenav.Body>
      </Sidenav>
      <Navbar appearance="subtle" className="nav-toggle">
        <Navbar.Body>
          <Nav pullRight>
            <Nav.Item onClick={toggleExpand} style={{ width: 56, textAlign: 'center' }}>
              <Icon icon={expand ? 'angle-left' : 'angle-right'} />
            </Nav.Item>
          </Nav>
        </Navbar.Body>
      </Navbar>
    </Sidebar>
  );
};

export default SideNavContainer;