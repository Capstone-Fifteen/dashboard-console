import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { get } from 'lodash';
import { Button, Panel, Table } from 'rsuite';
import ALL_DANCER_QUERY from '../../graphql/query/AllDancerQuery';
import ALL_DEVICE_QUERY from '../../graphql/query/AllDeviceQuery';
import { CheckCell, ImageCell, InputCell, SelectPickerCell } from '../../component/SessionTableCell';
import './SessionNewContainer.css';
import { Link } from 'react-router-dom';
import ROUTES from '../../constant/Routes';

const SessionNewContainer: React.FunctionComponent<any> = () => {
  const deviceQuery = useQuery(ALL_DEVICE_QUERY);
  const dancerQuery = useQuery(ALL_DANCER_QUERY);

  const [{ loading: deviceLoading, data: deviceData }, { loading: dancerLoading, data: dancerData }] = [
    deviceQuery,
    dancerQuery,
  ];

  const { Column, HeaderCell, Cell } = Table;

  const deviceOptions = get(deviceData, 'device', []).map((value: any) => ({ label: value.name, value: value.id }));

  const [selectedDancer, setSelectedDancer] = useState<any>([]);

  const handleCheck = (value: any, checked: any) => {
    const nextCheckedKeys = checked ? [...selectedDancer, value] : selectedDancer.filter((item: any) => item !== value);
    setSelectedDancer(nextCheckedKeys);
  };

  return (
    <Panel header={<h3>New Session</h3>} bordered>
      <Table data={get(dancerData, 'dancer', [])} loading={deviceLoading || dancerLoading} height={500}>
        <Column align="center">
          <HeaderCell>Select</HeaderCell>
          <CheckCell dataKey="id" checkedKeys={selectedDancer} onChange={handleCheck} />
        </Column>
        <Column align="center">
          <HeaderCell />
          <ImageCell dataKey="image" />
        </Column>
        <Column flexGrow={1}>
          <HeaderCell>Dancer Name</HeaderCell>
          <Cell dataKey="name" />
        </Column>
        <Column flexGrow={1}>
          <HeaderCell>Wearable Name</HeaderCell>
          <SelectPickerCell data={deviceOptions} />
        </Column>
        <Column flexGrow={1}>
          <HeaderCell>Expected Dance Moves</HeaderCell>
          <InputCell />
        </Column>
        <Column flexGrow={1}>
          <HeaderCell>Expected Positions</HeaderCell>
          <InputCell />
        </Column>
      </Table>
      <div className="buttonContainer">
        <Button appearance="primary" componentClass={Link} to={ROUTES.DASHBOARD}>
          Start Session
        </Button>
      </div>
    </Panel>
  );
};

export default SessionNewContainer;
