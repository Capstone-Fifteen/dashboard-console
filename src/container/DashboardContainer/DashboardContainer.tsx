import React, { useState } from 'react';
import IndividualAnalytics from '../../component/IndividualAnalytics';
import { useSubscription } from '@apollo/client';
import RAW_DATA_SUBSCRIPTION from '../../graphql/subscription/RawDataSubscription';
import PREDICTED_DATA_SUBSCRIPTION from '../../graphql/subscription/PredictedDataSubscription';
import LAST_POSITION_SUBSCRIPTION from '../../graphql/subscription/LastPositionSubscription';
import {
  Button,
  ButtonGroup,
  ButtonToolbar,
  Col,
  DatePicker,
  Icon,
  IconButton,
  Input,
  InputGroup,
  Panel,
  PanelGroup,
  Popover,
  Row,
  Whisper,
} from 'rsuite';
import TeamAnalytics from '../../component/TeamAnalytics';
import DataLoader from '../../component/DataLoader';
import EditDancerModal from './EditDancerModal';
import { get } from 'lodash';
import { getAccuracyData, getDelayData, getEmgData } from '../../utils/analytic';
import './DashboardContainer.css';

const DashboardContainer: React.FunctionComponent<any> = () => {
  const initialFormState = { expected_moves: '', expected_positions: '', device_id: '' };
  const [dancerData, setDancerData] = useState<any>([]);
  const [addFormData, setAddFormData] = useState<any>(initialFormState);
  const [startTime, setStartTime] = useState<Date>(new Date());
  const [endTime, setEndTime] = useState<Date | any>(null);

  const variables = {
    deviceId: dancerData.map((data: any) => data['device_id']),
    startTime: startTime.toISOString(),
    endTime: endTime?.toISOString(),
  };

  const streamingVariables = {
    ...variables,
    order: 'desc',
    limit: 600,
  };

  const { data: rawDataSubscription } = useSubscription(RAW_DATA_SUBSCRIPTION, {
    variables: endTime ? { ...variables, order: 'asc' } : { ...streamingVariables },
    skip: !dancerData.length,
  });
  const { data: predictedDataSubscription } = useSubscription(PREDICTED_DATA_SUBSCRIPTION, {
    variables,
    skip: !dancerData.length,
  });

  const { data: lastPositionSubscription } = useSubscription(LAST_POSITION_SUBSCRIPTION, {
    variables,
    skip: !dancerData.length,
  });

  const rawData = get(rawDataSubscription, 'raw_data', []);
  const predictedData = get(predictedDataSubscription, 'predicted_data', []);
  const lastPositionData = get(lastPositionSubscription, 'predicted_data', []);

  const handleFormChange = (value: string, dataKey: string) => {
    setAddFormData((prevState: any) => ({
      ...prevState,
      [dataKey]: value,
    }));
  };

  const expectedDeviceData = dancerData.map((data: any) => ({
    ...data,
    device_id: parseInt(data['device_id']),
  }));

  const emgData = getEmgData(expectedDeviceData, rawData);

  const delayData = getDelayData(expectedDeviceData, predictedData);

  const accuracyData = getAccuracyData(expectedDeviceData, predictedData);

  const renderAddForm = () => (
    <div className="addFormContainer">
      <InputGroup style={{ width: 406 }}>
        <DatePicker
          format="YYYY-MM-DD HH:mm:ss"
          value={startTime}
          onChange={(value) => setStartTime(value)}
          onClean={() => setStartTime(new Date())}
          placeholder="Start Time"
          ranges={[
            {
              label: 'Now',
              value: new Date(),
            },
          ]}
        />
        <InputGroup.Addon>To</InputGroup.Addon>
        <DatePicker
          style={{ minWidth: 183 }}
          format="YYYY-MM-DD HH:mm:ss"
          value={endTime}
          onChange={(value) => setEndTime(value)}
          placeholder="End Time"
          ranges={[
            {
              label: 'Now',
              value: new Date(),
            },
          ]}
        />
      </InputGroup>
      <ButtonToolbar>
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
                  setDancerData((prevState: any) => [...prevState, { ...addFormData, showEditModal: false }]);
                  setAddFormData(initialFormState);
                }}
              >
                Add
              </Button>
            </Popover>
          }
        >
          <IconButton disabled={dancerData.length >= 3} icon={<Icon icon="plus" />}>
            Add Dancer
          </IconButton>
        </Whisper>
        <IconButton
          icon={<Icon icon="clock-o" />}
          onClick={() => {
            setStartTime(new Date());
            setEndTime(null);
          }}
        >
          Reset Start Time
        </IconButton>
      </ButtonToolbar>
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
              <ButtonGroup>
                <IconButton
                  icon={<Icon icon="minus" />}
                  onClick={() => {
                    const tempData = [...dancerData];
                    tempData.splice(index, 1);
                    setDancerData(tempData);
                  }}
                />
                <IconButton
                  icon={<Icon icon="pencil" />}
                  onClick={() => {
                    let tempData = [...dancerData];
                    tempData[index].showEditModal = true;
                    setDancerData(tempData);
                  }}
                />
              </ButtonGroup>
            </div>
          }
        >
          <EditDancerModal dancer={dancer} index={index} dancerData={dancerData} setDancerData={setDancerData} />
          <IndividualAnalytics
            predictedData={predictedData.filter((value: any) => value['device_id'] === parseInt(dancer['device_id']))}
            rawData={rawData.filter((value: any) => value['device_id'] === parseInt(dancer['device_id']))}
            expectedDanceData={
              dancer['expected_moves'].length > 0 && dancer['expected_moves'].split(',').map((i: string) => i.trim())
            }
            expectedPositionData={
              dancer['expected_positions'].length > 0 &&
              dancer['expected_positions'].split(',').map((i: string) => parseInt(i.trim()))
            }
            showBrush={!!endTime}
          />
        </Panel>
      </Col>
    ));
  };

  return (
    <PanelGroup accordion bordered>
      <Panel header={<h4>Individual Analytics</h4>} defaultExpanded>
        {renderAddForm()}
        <Row>{renderIndividualAnalytics()}</Row>
      </Panel>
      {dancerData.length > 0 && (
        <Panel header={<h4>Team Analytics</h4>} defaultExpanded>
          {rawData.length > 0 || predictedData.length > 0 ? (
            <TeamAnalytics
              delayData={delayData}
              emgData={emgData}
              accuracyData={accuracyData}
              lastPositionData={lastPositionData}
            />
          ) : (
            <DataLoader />
          )}
        </Panel>
      )}
    </PanelGroup>
  );
};

export default DashboardContainer;
