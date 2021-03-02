import React from 'react';
import { Col, Panel } from 'rsuite';
import IndividualAnalytics from '../../component/IndividualAnalytics';
import TeamAnalytics from '../../component/TeamAnalytics';
import { getAccuracyData, getDelayData, getEmgData } from '../../utils/analytic';
import { meanBy, last } from 'lodash';

interface Props {
  predictedData: any[];
  rawData: any[];
  dancerData: any[];
  sessionId: number;
}

const AnalyticsViewContainer: React.FunctionComponent<Props> = ({ predictedData, rawData, dancerData, sessionId }) => {
  const expectedDeviceData = dancerData.map((data) => ({
    ...data,
    device_id: data['device']['id'],
  }));

  const emgData = getEmgData(expectedDeviceData, rawData, true);

  const delayData = getDelayData(expectedDeviceData, predictedData, true);

  const accuracyData = getAccuracyData(expectedDeviceData, predictedData, true);

  const dancerAnalytics = () => {
    const dancerId = expectedDeviceData.map(({ dancer }) => dancer.id);

    return dancerId.map((id) => {
      const associatedDelayData = delayData.find(({ dancerId }) => dancerId === id);
      const associatedEmgData = emgData.find(({ dancerId }) => dancerId === id);
      const associatedAccuracy = accuracyData.find(
        ({ moveAccuracy, positionAccuracy }) => moveAccuracy.dancerId === id || positionAccuracy.dancerId === id,
      );
      const moveAccuracy = associatedAccuracy && last(associatedAccuracy.moveAccuracy.data);
      const positionAccuracy = associatedAccuracy && last(associatedAccuracy.positionAccuracy.data);

      return {
        dancer_id: id,
        session_id: sessionId,
        average_delay: associatedDelayData && meanBy(associatedDelayData.data, (data) => data.value).toFixed(2),
        average_emg: associatedEmgData && meanBy(associatedEmgData.data, (data) => data.value).toFixed(2),
        move_accuracy: moveAccuracy && moveAccuracy.value,
        position_accuracy: positionAccuracy && positionAccuracy.value,
      };
    });
  };

  console.log(dancerAnalytics());

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
