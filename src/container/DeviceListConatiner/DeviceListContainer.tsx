import React from 'react';
import { Alert, Panel, Table } from 'rsuite';
import { useQuery } from '@apollo/client';
import ALL_DEVICE_QUERY from '../../graphql/query/AllDeviceQuery';
import { get } from 'lodash';

const DeviceListContainer: React.FunctionComponent<any> = () => {
  const { loading, error, data } = useQuery(ALL_DEVICE_QUERY);
  const { Column, HeaderCell, Cell } = Table;

  if (error) {
    Alert.error('Error: Unable to load data');
  }

  return (
    <Panel header={<h3>All Wearables</h3>} bordered>
      <Table data={get(data, 'device', [])} loading={loading} height={500}>
        <Column align="center">
          <HeaderCell>Wearable ID</HeaderCell>
          <Cell dataKey="id" />
        </Column>
        <Column flexGrow={1}>
          <HeaderCell>Wearable Name</HeaderCell>
          <Cell dataKey="name" />
        </Column>
      </Table>
    </Panel>
  );
};

export default DeviceListContainer;
