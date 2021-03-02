import React from 'react';
import { Col, Panel } from 'rsuite';
import IndividualAnalytics from '../../component/IndividualAnalytics';
import TeamAnalytics from '../../component/TeamAnalytics';
import { getAccuracyData, getDelayData, getEmgData } from '../../utils/analytic';

interface Props {
  predictedData: any[];
  rawData: any[];
  dancerData: any[];
}

const AnalyticsViewContainer: React.FunctionComponent<Props> = ({ predictedData, rawData, dancerData }) => {
  const expectedDeviceData = dancerData.map((data) => ({
    ...data,
    device_id: data['device']['id'],
  }));

  const emgData = getEmgData(expectedDeviceData, rawData, true);

  const delayData = getDelayData(expectedDeviceData, predictedData, true);

  const accuracyData = getAccuracyData(expectedDeviceData, predictedData, true);

  const renderIndividualAnalytics = () => {
    return dancerData.map((dancer: any, index: number) => (
      <Col md={24 / dancerData.length} sm={24} key={index}>
        <Panel bordered header={dancer['dancer']['name']}>
          <IndividualAnalytics
            predictedData={predictedData.filter((value: any) => value['device_id'] === dancer['device']['id'])}
            rawData={rawData.filter((value: any) => value['device_id'] === dancer['device']['id'])}
            expectedDanceData={dancer['expected_moves'].split(',').map((i: string) => i.trim())}
            expectedPositionData={dancer['expected_positions'].split(',').map((i: string) => parseInt(i.trim()))}
          />
        </Panel>
      </Col>
    ));
  };

  return (
    <>
      <Panel header={<h4>Individual Analytics</h4>} collapsible defaultExpanded>
        {renderIndividualAnalytics()}
      </Panel>
      <Panel header={<h4>Team Analytics</h4>} collapsible defaultExpanded>
        <TeamAnalytics accuracyData={accuracyData} emgData={emgData} delayData={delayData} />
      </Panel>
    </>
  );
};

export default AnalyticsViewContainer;
