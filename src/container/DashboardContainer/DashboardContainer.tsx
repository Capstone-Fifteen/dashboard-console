import React from 'react';
import AnalyticsCard from '../../component/AnalyticsCard';
import './DashboardContainer.css';
import { useSubscription } from '@apollo/client';
import RAW_DATA_SUBSCRIPTION from '../../graphql/subscription/RawDataSubscription';
import PREDICTED_DATA_SUBSCRIPTION from '../../graphql/subscription/PredictedDataSubscription';

const DashboardContainer: React.FunctionComponent<any> = () => {
  const { data: rawDataSubscription } = useSubscription(RAW_DATA_SUBSCRIPTION);
  const { data: predictedDataSubscription } = useSubscription(PREDICTED_DATA_SUBSCRIPTION);

  return (
    <div className="dashboardContainer">
      <AnalyticsCard
        predictedData={predictedDataSubscription && predictedDataSubscription['predicted_data']}
        rawData={rawDataSubscription && rawDataSubscription['raw_data']}
      />
    </div>
  );
};

export default DashboardContainer;
