import React from 'react';
import { useQuery } from '@apollo/client';
import ALL_DANCER_QUERY from '../../graphql/query/AllDancerQuery';
import { Alert, Panel, Table } from 'rsuite';
import { get } from 'lodash';
import { Link } from 'react-router-dom';
import ROUTES from '../../constant/Routes';
import { isoDateTimeFormatter } from '../../utils/numeric';

const DancerListContainer: React.FunctionComponent<any> = () => {
  const { loading, error, data } = useQuery(ALL_DANCER_QUERY);
  const { Column, HeaderCell, Cell } = Table;

  if (error) {
    Alert.error('Error: Unable to load data');
  }

  return (
    <Panel header={<h3>All Dancers</h3>} bordered>
      <Table data={get(data, 'dancer', [])} loading={loading} height={500}>
        <Column align="center">
          <HeaderCell>ID</HeaderCell>
          <Cell dataKey="id" />
        </Column>
        <Column flexGrow={1}>
          <HeaderCell>Dancer Name</HeaderCell>
          <Cell dataKey="name" />
        </Column>
        <Column flexGrow={1}>
          <HeaderCell>Dancer Gender</HeaderCell>
          <Cell dataKey="gender" />
        </Column>
        <Column flexGrow={1}>
          <HeaderCell>Last Updated</HeaderCell>
          <Cell>{(rowData: any) => isoDateTimeFormatter(rowData['last_updated'])}</Cell>
        </Column>
        <Column width={100}>
          <HeaderCell>Actions</HeaderCell>
          <Cell>{(rowData: any) => <Link to={`${ROUTES.DANCER_ALL}/${rowData.id}`}>View</Link>}</Cell>
        </Column>
      </Table>
    </Panel>
  );
};

export default DancerListContainer;
