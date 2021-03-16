import React, { useState } from 'react';
import Modal from '../../component/Modal';
import { Button, ControlLabel, Form, FormControl, FormGroup } from 'rsuite';
import { dancerExpectedValuesModel } from '../../constant/FormModel';

interface Props {
  dancer: any;
  index: number;
  dancerData: any[];
  setDancerData: Function;
}

const EditDancerModal: React.FunctionComponent<Props> = ({ dancer, index, dancerData, setDancerData }) => {
  const [formValue, setFormValue] = useState<any>({
    expected_moves: dancer['expected_moves'],
    expected_positions: dancer['expected_positions'],
  });

  const closeModal = () => {
    let tempData = [...dancerData];
    tempData[index].showEditModal = false;
    setDancerData(tempData);
  };

  const handleSubmit = () => {
    let tempData = [...dancerData];
    tempData[index]['expected_moves'] = formValue['expected_moves'];
    tempData[index]['expected_positions'] = formValue['expected_positions'];
    setDancerData(tempData);
    closeModal();
  };

  return (
    <Modal
      title={`Edit Expected Value for Device ID ${dancer['device_id']}`}
      show={dancer.showEditModal}
      onHide={() => closeModal()}
      actionArea={
        <>
          <Button appearance="primary" onClick={() => handleSubmit()}>
            Confirm
          </Button>
          <Button onClick={() => closeModal()}>Cancel</Button>
        </>
      }
    >
      <Form fluid model={dancerExpectedValuesModel} formValue={formValue} onChange={(value) => setFormValue(value)}>
        <FormGroup>
          <ControlLabel>Expected Dance Positions</ControlLabel>
          <FormControl name="expected_positions" />
        </FormGroup>
        <FormGroup>
          <ControlLabel>Expected Dance Moves</ControlLabel>
          <FormControl name="expected_moves" />
        </FormGroup>
      </Form>
    </Modal>
  );
};

export default EditDancerModal;
