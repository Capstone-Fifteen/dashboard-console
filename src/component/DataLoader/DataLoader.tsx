import React from 'react';
import { Loader } from 'rsuite';
import './DataLoader.css';

const DataLoader: React.FunctionComponent<any> = () => (
  <div className="loaderContainer">
    <Loader vertical content="Waiting for data..." />
  </div>
);

export default DataLoader;
