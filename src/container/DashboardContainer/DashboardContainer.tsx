import React from 'react';
import IndividualAnalytics from '../../component/IndividualAnalytics';
import './DashboardContainer.css';
import { useSubscription } from '@apollo/client';
import RAW_DATA_SUBSCRIPTION from '../../graphql/subscription/RawDataSubscription';
import PREDICTED_DATA_SUBSCRIPTION from '../../graphql/subscription/PredictedDataSubscription';
import { Col, Panel, PanelGroup, Row } from 'rsuite';
import TeamAnalytics from '../../component/TeamAnalytics';
import { get } from 'lodash';

const DashboardContainer: React.FunctionComponent<any> = () => {
  const { data: rawDataSubscription } = useSubscription(RAW_DATA_SUBSCRIPTION);
  const { data: predictedDataSubscription } = useSubscription(PREDICTED_DATA_SUBSCRIPTION);

  const rawData = get(rawDataSubscription, 'raw_data', []);
  const predictedData = get(predictedDataSubscription, 'predicted_data', []);

  return (
    <PanelGroup accordion bordered>
      <Panel header={<h4>Team Analytics</h4>}>
        <TeamAnalytics />
      </Panel>
      <Panel header={<h4>Individual Analytics</h4>}>
        <Row>
          <Col md={8} sm={24}>
            <IndividualAnalytics
              predictedData={predictedData.filter((value: any) => value['device_id'] === 1)}
              rawData={rawData.filter((value: any) => value['device_id'] === 1)}
              deviceId={1}
              expectedDanceData={['Dab', 'Wipetable', 'Sidepunch', 'Gun', 'Listen', 'Finale']}
              expectedPositionData={[1, 3, 2, 2, 3, 2, 1]}
            />
          </Col>
          <Col md={8} sm={24}>
            <IndividualAnalytics
              predictedData={predictedData.filter((value: any) => value['device_id'] === 2)}
              rawData={rawData.filter((value: any) => value['device_id'] === 2)}
              deviceId={2}
            />
          </Col>
          <Col md={8} sm={24}>
            <IndividualAnalytics
              predictedData={predictedData.filter((value: any) => value['device_id'] === 3)}
              rawData={rawData.filter((value: any) => value['device_id'] === 3)}
              deviceId={3}
            />
          </Col>
        </Row>
      </Panel>
    </PanelGroup>
  );
};

export default DashboardContainer;
