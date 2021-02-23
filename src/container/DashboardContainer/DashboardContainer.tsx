import React from 'react';
import IndividualAnalytics from '../../component/IndividualAnalytics';
import './DashboardContainer.css';
import { useSubscription } from '@apollo/client';
import RAW_DATA_SUBSCRIPTION from '../../graphql/subscription/RawDataSubscription';
import PREDICTED_DATA_SUBSCRIPTION from '../../graphql/subscription/PredictedDataSubscription';
import { Col, Panel, PanelGroup, Row } from 'rsuite';
import TeamAnalytics from '../../component/TeamAnalytics';

const DashboardContainer: React.FunctionComponent<any> = () => {
  const { data: rawDataSubscription } = useSubscription(RAW_DATA_SUBSCRIPTION);
  const { data: predictedDataSubscription } = useSubscription(PREDICTED_DATA_SUBSCRIPTION);

  return (
    <PanelGroup accordion bordered>
      <Panel header={<h4>Team Analytics</h4>}>
        <TeamAnalytics />
      </Panel>
      <Panel header={<h4>Individual Analytics</h4>}>
        <Row>
          <Col md={12} sm={24}>
            <IndividualAnalytics
              predictedData={predictedDataSubscription && predictedDataSubscription['predicted_data']}
              rawData={rawDataSubscription && rawDataSubscription['raw_data']}
            />
          </Col>
          <Col md={12} sm={24}>
            <IndividualAnalytics
              predictedData={predictedDataSubscription && predictedDataSubscription['predicted_data']}
              rawData={rawDataSubscription && rawDataSubscription['raw_data']}
            />
          </Col>
        </Row>
      </Panel>
    </PanelGroup>
  );
};

export default DashboardContainer;
