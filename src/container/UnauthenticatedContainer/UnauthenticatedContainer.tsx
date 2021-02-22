import React, { useState } from 'react';
import { Button, ButtonToolbar, Container, Form, FormControl, FormGroup, Panel } from 'rsuite';
import './UnauthenticatedContainer.css';
import { useAppDispatch } from '../../redux/hook';
import { setAuthenticated } from '../../redux/reducer/authenticatedSlice';
import { authenticationModel } from '../../constant/FormModel';

const UnauthenticatedContainer: React.FunctionComponent<any> = () => {
  const [formValue, setFormValue] = useState({ secret: '' });
  const dispatch = useAppDispatch();

  const handleSubmission = () => dispatch(setAuthenticated());

  return (
    <Container classPrefix="mainContainer">
      <Panel header={<h3>Admin Secret</h3>} bordered className="loginContainer">
        <Form
          model={authenticationModel}
          fluid
          formValue={formValue}
          onChange={(value: any) => setFormValue(value)}
          onSubmit={(checkStatus) => checkStatus && handleSubmission()}
        >
          <FormGroup>
            <FormControl name="secret" />
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
    </Container>
  );
};

export default UnauthenticatedContainer;
