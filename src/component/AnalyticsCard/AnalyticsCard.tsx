import React from 'react';
import { Divider, Panel } from 'rsuite';

import './AnalyticsCard.css';
import RawDataLineChart from '../RawDataLineChart';
import ExecutedDanceTable from '../ExecutedDanceTable';

const AnalyticsCard: React.FunctionComponent<any> = () => {
  return (
    <Panel bordered>
      <div className="sectionContainer">
        <div className="textContainer">
          <span className="subTitle">Expected Dance Move</span>
          <span className="title">Dab</span>
        </div>
        <div className="textContainer">
          <span className="subTitle">Current Dance Move</span>
          <span className="title">Dab</span>
        </div>
      </div>
      <Divider />
      <div className="sectionContainer">
        <div className="textContainer">
          <span className="subTitle">Current Position</span>
          <span className="title">2</span>
        </div>
        <div className="textContainer">
          <span className="subTitle">Expected Position</span>
          <span className="title">2</span>
        </div>
      </div>
      <Divider />
      <div className="sectionContainer">
        <div className="textContainer">
          <span className="subTitle">Rhythmic Performance</span>
          <span className="title">Slow</span>
          <span className="subTitle">0.4 seconds</span>
        </div>
      </div>
      <Divider />
      <div className="sectionContainer">
        <div className="textContainer">
          <span className="subTitle">Executed Dance Moves</span>
          <ExecutedDanceTable />
        </div>
      </div>
      <Divider />
      <div className="sectionContainer">
        <div className="textContainer">
          <span className="subTitle">Accelerometer Reading</span>
          <RawDataLineChart />
        </div>
      </div>
      <Divider />
      <div className="sectionContainer">
        <div className="textContainer">
          <span className="subTitle">Gyroscope Reading</span>
          <RawDataLineChart />
        </div>
      </div>
    </Panel>
  );
};

export default AnalyticsCard;
