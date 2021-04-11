import React from 'react';
import { Loader } from 'rsuite';
import './DataLoader.css';

const DataLoader: React.FunctionComponent<any> = ({ content = 'Waiting for data ...' }) => (
  <div className="loaderContainer">
    <Loader vertical content={content} />
  </div>
);

export default DataLoader;
