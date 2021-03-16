import React from 'react';
import { Loader } from 'rsuite';
import './LoadingData.css';

const LoadingData: React.FunctionComponent<any> = () => (
  <div className="loaderContainer">
    <Loader vertical content="Waiting for data..." />
  </div>
);

export default LoadingData;
