import React from 'react';
import { Loader } from 'rsuite';

const LoadingData: React.FunctionComponent<any> = () => (
  <div style={{ height: 300 }}>
    <Loader size="md" center vertical content="Waiting for data..." />
  </div>
);

export default LoadingData;
