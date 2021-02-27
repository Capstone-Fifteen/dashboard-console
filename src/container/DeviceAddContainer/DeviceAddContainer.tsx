import React, { useState } from 'react';
import { Alert, Button, ButtonToolbar, ControlLabel, Form, FormControl, FormGroup, Panel } from 'rsuite';
import { deviceAddModel } from '../../constant/FormModel';
import { useMutation } from '@apollo/client';
import ADD_DEVICE_MUTATION from '../../graphql/mutation/AddDeviceMutation';
import ALL_DEVICE_QUERY from '../../graphql/query/AllDeviceQuery';

const DeviceAddContainer: React.FunctionComponent<any> = () => {
  const [formValue, setFormValue] = useState<any>({ deviceName: '' });
  const [addDevice, { error }] = useMutation(ADD_DEVICE_MUTATION, {
    variables: {
      wearable: { name: formValue.deviceName },
    },
    onCompleted: () => {
      if (error) {
        Alert.error(`ERROR: Unable to add device\n Error Code: ${error}`);
      } else {
        Alert.success(`SUCCESS: Device added successfully`);
        setFormValue({ deviceName: '' });
      }
    },
    refetchQueries: [{ query: ALL_DEVICE_QUERY }],
  });

  const handleSubmission = async () => {
    await addDevice();
  };

  return (
    <Panel header={<h3>Add New Wearable</h3>} bordered>
      <Form
        fluid
        model={deviceAddModel}
        formValue={formValue}
        onChange={(value) => setFormValue(value)}
        onSubmit={(checkStatus) => checkStatus && handleSubmission()}
      >
        <FormGroup>
          <ControlLabel>Device Name</ControlLabel>
          <FormControl name="deviceName" />
        </FormGroup>
        <FormGroup>
          <ButtonToolbar>
            <Button appearance="primary" type="submit">
              Submit
            </Button>
          </ButtonToolbar>
        </FormGroup>
      </Form>
    </Panel>
  );
};

export default DeviceAddContainer;
