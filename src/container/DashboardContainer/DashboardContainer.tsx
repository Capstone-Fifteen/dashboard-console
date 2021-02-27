import React, { useState } from 'react';
import IndividualAnalytics from '../../component/IndividualAnalytics';
import { useSubscription } from '@apollo/client';
import RAW_DATA_SUBSCRIPTION from '../../graphql/subscription/RawDataSubscription';
import PREDICTED_DATA_SUBSCRIPTION from '../../graphql/subscription/PredictedDataSubscription';
import { Button, Col, Icon, IconButton, Input, Panel, PanelGroup, Popover, Row, Whisper } from 'rsuite';
import TeamAnalytics from '../../component/TeamAnalytics';
import { get } from 'lodash';
import './DashboardContainer.css';

const DashboardContainer: React.FunctionComponent<any> = () => {
  const { data: rawDataSubscription } = useSubscription(RAW_DATA_SUBSCRIPTION);
  const { data: predictedDataSubscription } = useSubscription(PREDICTED_DATA_SUBSCRIPTION);

  const rawData = get(rawDataSubscription, 'raw_data', []);
  const predictedData = get(predictedDataSubscription, 'predicted_data', []);

  const initialFormState = { expected_moves: '', expected_positions: '', device_id: '' };
  const [dancerData, setDancerData] = useState<any>([]);
  const [addFormData, setAddFormData] = useState<any>(initialFormState);

  const handleFormChange = (value: string, dataKey: string) => {
    setAddFormData((prevState: any) => ({
      ...prevState,
      [dataKey]: value,
    }));
  };

  const renderAddForm = () => (
    <div className="addFormContainer">
      <Whisper
        trigger="click"
        placement="left"
        speaker={
          <Popover title="Add A Dancer">
            <Input
              placeholder="Expected Dance Moves"
              value={addFormData['expected_moves']}
              onChange={(value) => handleFormChange(value, 'expected_moves')}
            />
            <Input
              placeholder="Expected Dance Positions"
              value={addFormData['expected_positions']}
              onChange={(value) => handleFormChange(value, 'expected_positions')}
            />
            <Input
              placeholder="Wearable ID"
              value={addFormData['device_id']}
              onChange={(value) => handleFormChange(value, 'device_id')}
            />
            <Button
              onClick={() => {
                setDancerData((prevState: any) => [...prevState, addFormData]);
                setAddFormData(initialFormState);
              }}
            >
              Add
            </Button>
          </Popover>
        }
      >
        <IconButton disabled={dancerData.length >= 3} icon={<Icon icon="plus" />} />
      </Whisper>
    </div>
  );

  const renderIndividualAnalytics = () => {
    return dancerData.map((dancer: any, index: number) => (
      <Col md={24 / dancerData.length} sm={24} key={index}>
        <Panel
          bordered
          header={
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
              Device ID: {dancer['device_id']}
              <IconButton
                icon={<Icon icon="minus" />}
                onClick={() => {
                  const tempData = [...dancerData];
                  tempData.splice(index, 1);
                  setDancerData(tempData);
                }}
              />
            </div>
          }
        >
          <IndividualAnalytics
            predictedData={predictedData.filter((value: any) => value['device_id'] === parseInt(dancer['device_id']))}
            rawData={rawData.filter((value: any) => value['device_id'] === parseInt(dancer['device_id']))}
            expectedDanceData={dancer['expected_moves'].split(',').map((i: string) => i.trim())}
            expectedPositionData={dancer['expected_positions'].split(',').map((i: string) => parseInt(i.trim()))}
          />
        </Panel>
      </Col>
    ));
  };

  return (
    <PanelGroup accordion bordered>
      <Panel header={<h4>Team Analytics</h4>} defaultExpanded>
        <TeamAnalytics />
      </Panel>
      <Panel header={<h4>Individual Analytics</h4>} defaultExpanded>
        {renderAddForm()}
        <Row>{renderIndividualAnalytics()}</Row>
      </Panel>
    </PanelGroup>
  );
};

export default DashboardContainer;
