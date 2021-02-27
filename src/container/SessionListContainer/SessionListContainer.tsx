import React from 'react';
import { useQuery } from '@apollo/client';
import ALL_SESSION_QUERY from '../../graphql/query/AllSessionQuery';
import { Alert, Panel, Table } from 'rsuite';
import { get } from 'lodash';
import moment from 'moment';
import { Link } from 'react-router-dom';
import ROUTES from '../../constant/Routes';

const SessionListContainer: React.FunctionComponent<any> = () => {
  const { loading, error, data } = useQuery(ALL_SESSION_QUERY);
  const { Column, HeaderCell, Cell } = Table;

  if (error) {
    Alert.error('Error: Unable to load data');
  }

  return (
    <Panel header={<h3>All Sessions</h3>} bordered>
      <Table data={get(data, 'session', [])} loading={loading} height={500}>
        <Column align="center">
          <HeaderCell>ID</HeaderCell>
          <Cell dataKey="id" />
        </Column>
        <Column align="center" flexGrow={1}>
          <HeaderCell>Name</HeaderCell>
          <Cell dataKey="name" />
        </Column>
        <Column align="center" flexGrow={1}>
          <HeaderCell>Start Time</HeaderCell>
          <Cell>{(rowData: any) => moment(rowData['start_time']).format('llll')}</Cell>
        </Column>
        <Column align="center" flexGrow={1}>
          <HeaderCell>End Time</HeaderCell>
          <Cell>
            {(rowData: any) => (rowData['end_time'] ? moment(rowData['end_time']).format('llll') : 'In Progress')}
          </Cell>
        </Column>
        <Column align="center" flexGrow={1}>
          <HeaderCell>Total Participants</HeaderCell>
          <Cell>{(rowData: any) => rowData['participants_aggregate']['aggregate']['count']}</Cell>
        </Column>
        <Column width={100}>
          <HeaderCell>Actions</HeaderCell>
          <Cell>{() => <Link to={ROUTES.DASHBOARD}>View</Link>}</Cell>
        </Column>
      </Table>
    </Panel>
  );
};

export default SessionListContainer;
