import React from 'react';
import Pet from './Pet/Pet';
import RiskOverview from './Risk/RiskOverview';
import Actions from './Actions/Actions';
import PriceHistory from './Risk/RiskHistory';
import AssetsList from './Assets/AssetsList';

const Dashboard: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Left Column - Pet & Actions */}
      <div className="md:col-span-1 space-y-6">
        <div className="card">
          <Pet />
        </div>
        <div className="card">
          <h2 className="mb-4 text-primary-400">Actions</h2>
          <Actions />
        </div>
      </div>
      
      {/* Right Column - Risk Overview & Assets */}
      <div className="md:col-span-2 space-y-6">
        <div className="card">
          <h2 className="mb-4 text-primary-400">Risk Overview</h2>
          <RiskOverview />
        </div>
        
        <div className="card">
          <h2 className="mb-4 text-primary-400">Assets</h2>
          <AssetsList />
        </div>
        
        <div className="card">
          <h2 className="mb-4 text-primary-400">Price History</h2>
          <PriceHistory />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;