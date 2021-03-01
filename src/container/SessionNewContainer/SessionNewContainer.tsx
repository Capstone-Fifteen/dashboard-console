import React, { useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { get, isEmpty, isNull } from 'lodash';
import { Alert, Button, Input, Panel, Table } from 'rsuite';
import ALL_DANCER_QUERY from '../../graphql/query/AllDancerQuery';
import ALL_DEVICE_QUERY from '../../graphql/query/AllDeviceQuery';
import ADD_SESSION_MUTATION from '../../graphql/mutation/AddSessionMutation';
import ALL_SESSION_QUERY from '../../graphql/query/AllSessionQuery';
import { CheckCell, ImageCell, InputCell, SelectPickerCell } from '../../component/SessionTableCell';
import { useHistory } from 'react-router-dom';
import ROUTES from '../../constant/Routes';
import './SessionNewContainer.css';

// TODO: Currently allows multiple dancer to have the same device ID -- need to handle that exception gracefully
const SessionNewContainer: React.FunctionComponent<any> = () => {
  const [formObject, setFormObject] = useState<any>({});
  const [sessionName, setSessionName] = useState<string>('');
  const routeHistory = useHistory();

  const { Column, HeaderCell, Cell } = Table;

  const getParticipantArray = () => {
    const dancerIdArray = Object.keys(formObject); // get participating dancer's dancer ID

    return dancerIdArray.map((id) => ({
      dancer_id: id,
      ...formObject[id],
    }));
  };

  const handleCheck = (value: any, checked: any) => {
    if (!checked) {
      const tempFormObject = formObject;
      delete tempFormObject[value];
      setFormObject({ ...tempFormObject });
    } else {
      setFormObject({ ...formObject, [value]: { device_id: null, expected_moves: '', expected_positions: '' } });
    }
  };

  const handleFormValues = (value: string, dancerId: string, dataKey: string) => {
    setFormObject({
      ...formObject,
      [dancerId]: {
        ...formObject[dancerId],
        [dataKey]: value,
      },
    });
  };

  const formIsValid = () => {
    // when none of the dancers were selected
    if (isEmpty(formObject) || !sessionName.length) {
      return false;
    }
    const objectKeys = Object.keys(formObject); // returns all selected dancer's ID
    let isValid = true;

    objectKeys.forEach((key) => {
      // If device wasn't selected for a participant
      if (isNull(formObject[key]['device_id'])) {
        isValid = false;
        return;
      }
    });
    return isValid;
  };

  const deviceQuery = useQuery(ALL_DEVICE_QUERY);
  const dancerQuery = useQuery(ALL_DANCER_QUERY);
  const [addSession, { error }] = useMutation(ADD_SESSION_MUTATION, {
    variables: {
      name: sessionName,
      startTime: new Date().toISOString(),
      participants: getParticipantArray(),
    },
    onCompleted: ({ session }) => {
      if (error) {
        Alert.error(`ERROR: Unable to start the session\n Error Code: ${error}`);
      } else {
        Alert.success(`SUCCESS: Session added successfully`);
        setSessionName('');
        setFormObject({});

        routeHistory.push(`${ROUTES.SESSION_ALL}/${session.id}`);
      }
    },
    refetchQueries: [
      {
        query: ALL_SESSION_QUERY,
      },
    ],
  });

  const [{ loading: deviceLoading, data: deviceData }, { loading: dancerLoading, data: dancerData }] = [
    deviceQuery,
    dancerQuery,
  ];

  const deviceOptions = get(deviceData, 'device', []).map((value: any) => ({ label: value.name, value: value.id }));

  return (
    <Panel header={<h3>New Session</h3>} bordered>
      <Input
        value={sessionName}
        onChange={(value) => setSessionName(value)}
        placeholder="Session Name"
        style={{ marginBottom: 10 }}
      />
      <Table data={get(dancerData, 'dancer', [])} loading={deviceLoading || dancerLoading} height={500}>
        <Column align="center">
          <HeaderCell>Select</HeaderCell>
          <CheckCell dataKey="id" formObject={formObject} onChange={handleCheck} />
        </Column>
        <Column align="center">
          <HeaderCell />
          <ImageCell dataKey="image" />
        </Column>
        <Column flexGrow={0.4}>
          <HeaderCell>Dancer Name</HeaderCell>
          <Cell dataKey="name" />
        </Column>
        <Column flexGrow={0.4}>
          <HeaderCell>Wearable Name</HeaderCell>
          <SelectPickerCell
            idKey="id"
            dataKey="device_id"
            formObject={formObject}
            data={deviceOptions}
            onChange={handleFormValues}
          />
        </Column>
        <Column flexGrow={1}>
          <HeaderCell>Expected Dance Moves</HeaderCell>
          <InputCell idKey="id" dataKey="expected_moves" formObject={formObject} onChange={handleFormValues} />
        </Column>
        <Column flexGrow={1}>
          <HeaderCell>Expected Positions</HeaderCell>
          <InputCell idKey="id" dataKey="expected_positions" formObject={formObject} onChange={handleFormValues} />
        </Column>
      </Table>
      <div className="buttonContainer">
        <Button appearance="primary" disabled={!formIsValid()} onClick={() => addSession()}>
          Start Session
        </Button>
      </div>
    </Panel>
  );
};

export default SessionNewContainer;
