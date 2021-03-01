import React, { useState } from 'react';
import {
  Alert,
  Button,
  ButtonToolbar,
  ControlLabel,
  Form,
  FormControl,
  FormGroup,
  Panel,
  Radio,
  RadioGroup,
} from 'rsuite';
import { dancerAddModel } from '../../constant/FormModel';
import { useMutation } from '@apollo/client';
import ADD_DANCER_MUTATION from '../../graphql/mutation/AddDancerMutation';
import ALL_DANCER_QUERY from '../../graphql/query/AllDancerQuery';

const DancerAddContainer: React.FunctionComponent<any> = () => {
  const initialFormValueState = { name: '', gender: undefined };
  const [formValue, setFormValue] = useState<any>(initialFormValueState);
  const [addDancer, { error }] = useMutation(ADD_DANCER_MUTATION, {
    variables: {
      dancer: formValue,
    },
    onCompleted: () => {
      if (error) {
        Alert.error(`ERROR: Unable to add dancer\n Error Code: ${error}`);
      } else {
        Alert.success(`SUCCESS: Dancer added successfully`);
        setFormValue(initialFormValueState);
      }
    },
    refetchQueries: [{ query: ALL_DANCER_QUERY }],
  });

  const handleSubmission = async () => {
    await addDancer();
  };

  return (
    <Panel header={<h3>Add New Dancer</h3>} bordered>
      <Form
        fluid
        model={dancerAddModel}
        formValue={formValue}
        onChange={(value) => setFormValue(value)}
        onSubmit={(checkStatus) => checkStatus && handleSubmission()}
      >
        <FormGroup>
          <ControlLabel>Dancer Name</ControlLabel>
          <FormControl name="name" />
        </FormGroup>
        <FormGroup>
          <ControlLabel>Gender</ControlLabel>
          <FormControl name="gender" accepter={RadioGroup}>
            <Radio value="Female">Female</Radio>
            <Radio value="Male">Male</Radio>
            <Radio value="Other">Other</Radio>
          </FormControl>
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

export default DancerAddContainer;
