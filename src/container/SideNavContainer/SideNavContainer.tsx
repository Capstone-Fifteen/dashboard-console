import React, { useState } from 'react';
import { Affix, Dropdown, Icon, Nav, Navbar, Sidebar, Sidenav } from 'rsuite';
import { Link } from 'react-router-dom';
import {
  ALL_DANCER_EVENT_KEY,
  ALL_DEVICE_EVENT_KEY,
  DANCER_EVENT_KEY,
  DASHBOARD_EVENT_KEY,
  DEVICE_EVENT_KEY,
  NEW_DANCER_EVENT_KEY,
  NEW_DEVICE_EVENT_KEY,
  NEW_SESSION_EVENT_KEY,
  ALL_SESSION_EVENT_KEY,
  SESSION_EVENT_KEY,
  OTHERS_EVENT_KEY,
  SIGN_OUT_EVENT_KEY,
  DATA_COLLECTION_EVENT_KEY,
  DATA_VISUALIZATION_EVENT_KEY,
  DATA_TOOL_EVENT_KEY,
} from '../../constant/SideNavEventKey';
import ROUTES from '../../constant/Routes';
import { useAppDispatch } from '../../redux/hook';
import { clearSession } from '../../redux/reducer/authenticatedSlice';
import packageJson from '../../../package.json';
import './SideNavContainer.css';

const SideNavContainer: React.FunctionComponent<any> = () => {
  const [expand, setExpand] = useState(true);
  const [selectedPanel, setSelectedPanel] = useState('dashboard');
  const dispatch = useAppDispatch();

  const toggleExpand = () => setExpand(!expand);
  const checkActive = (eventKey: string) => selectedPanel === eventKey;

  return (
    <Sidebar className="sideBarContainer" width={expand ? 260 : 56} collapsible>
      <Affix>
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
              <Dropdown
                eventKey={DEVICE_EVENT_KEY}
                title="Wearables"
                icon={<Icon icon="tablet" />}
                placement="rightStart"
                trigger="hover"
              >
                <Dropdown.Item
                  eventKey={NEW_DEVICE_EVENT_KEY}
                  active={checkActive(NEW_DEVICE_EVENT_KEY)}
                  componentClass={Link}
                  to={ROUTES.DEVICE_NEW}
                >
                  New Device
                </Dropdown.Item>
                <Dropdown.Item
                  eventKey={ALL_DEVICE_EVENT_KEY}
                  active={checkActive(ALL_DEVICE_EVENT_KEY)}
                  componentClass={Link}
                  to={ROUTES.DEVICE_ALL}
                >
                  All Devices
                </Dropdown.Item>
              </Dropdown>
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
                  to={ROUTES.DANCER_ALL}
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
                  eventKey={ALL_SESSION_EVENT_KEY}
                  active={checkActive(ALL_SESSION_EVENT_KEY)}
                  componentClass={Link}
                  to={ROUTES.SESSION_ALL}
                >
                  All Sessions
                </Dropdown.Item>
              </Dropdown>
              <Dropdown
                eventKey={DATA_TOOL_EVENT_KEY}
                title="Data Tool"
                icon={<Icon icon="dashboard" />}
                placement="rightStart"
                trigger="hover"
              >
                <Dropdown.Item
                  eventKey={DATA_COLLECTION_EVENT_KEY}
                  active={checkActive(DATA_COLLECTION_EVENT_KEY)}
                  componentClass={Link}
                  to={ROUTES.DATA_COLLECTION}
                >
                  Data Collection
                </Dropdown.Item>
                <Dropdown.Item
                  eventKey={DATA_VISUALIZATION_EVENT_KEY}
                  active={checkActive(DATA_VISUALIZATION_EVENT_KEY)}
                  componentClass={Link}
                  to={ROUTES.DATA_VISUALIZATION}
                >
                  Data Visualization
                </Dropdown.Item>
              </Dropdown>
              <Dropdown
                eventKey={OTHERS_EVENT_KEY}
                title="Setting"
                icon={<Icon icon="cog" />}
                placement="rightStart"
                trigger="hover"
              >
                <Dropdown.Item
                  eventKey={SIGN_OUT_EVENT_KEY}
                  active={checkActive(SIGN_OUT_EVENT_KEY)}
                  onSelect={() => dispatch(clearSession())}
                >
                  Sign Out
                </Dropdown.Item>
                <Dropdown.Item disabled>Version {packageJson.version}</Dropdown.Item>
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
      </Affix>
    </Sidebar>
  );
};

export default SideNavContainer;
