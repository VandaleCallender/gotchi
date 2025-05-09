import React from 'react';
import { useAssets } from '../../context/AssetsContext';
import RiskCategory from './RiskCategory';
import { AlertTriangle, TrendingDown, Activity, Scale } from 'lucide-react';

const RiskOverview: React.FC = () => {
  const { totalRiskScores } = useAssets();
  
  // Placeholder until real data is available
  const riskScores = totalRiskScores || {
    security: 35,
    market: 65,
    protocol: 45,
    regulatory: 25,
    overall: 48
  };
  
  const getRiskLevelClass = (score: number) => {
    if (score < 40) return 'bg-success-500';
    if (score < 70) return 'bg-warning-500';
    return 'bg-danger-500';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">Overall Risk</h3>
        <div className={`px-3 py-1 rounded-full text-sm font-medium ${getRiskLevelClass(riskScores.overall)}`}>
          {riskScores.overall}%
        </div>
      </div>
      
      <div className="w-full bg-gray-700 rounded-full h-3">
        <div 
          className={`${getRiskLevelClass(riskScores.overall)} h-3 rounded-full transition-all duration-500 ease-in-out`}
          style={{ width: `${riskScores.overall}%` }}
        ></div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <RiskCategory 
          title="Security Risk" 
          value={riskScores.security} 
          icon={<AlertTriangle className="h-5 w-5" />}
          description="Vulnerabilities, smart contract risks, and wallet security" 
        />
        
        <RiskCategory 
          title="Market Risk" 
          value={riskScores.market} 
          icon={<TrendingDown className="h-5 w-5" />}
          description="Price volatility, liquidity, and market cap concerns" 
        />
        
        <RiskCategory 
          title="Protocol Risk" 
          value={riskScores.protocol} 
          icon={<Activity className="h-5 w-5" />} 
          description="Reliability, decentralization, and technical risks"
        />
        
        <RiskCategory 
          title="Regulatory Risk" 
          value={riskScores.regulatory} 
          icon={<Scale className="h-5 w-5" />}
          description="Legal compliance and regulatory uncertainty" 
        />
      </div>
    </div>
  );
};

export default RiskOverview;