import React from 'react';
import { Panel, PanelProps } from 'rsuite';
import './Card.css';

const Card: React.FunctionComponent<PanelProps> = ({ header, children }) => (
  <Panel header={header} bordered className="panelContainer">
    <div className="cardContent">{children}</div>
  </Panel>
);

export default Card;
