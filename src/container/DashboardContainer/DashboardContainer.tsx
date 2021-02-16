import React from 'react';
import AnalyticsCard from '../../component/AnalyticsCard';
import './DashboardContainer.css';

const DashboardContainer: React.FunctionComponent<any> = () => {
  return (
    <div className="dashboardContainer">
      <AnalyticsCard />
      <AnalyticsCard />
      <AnalyticsCard />
    </div>
  );
};

export default DashboardContainer;
