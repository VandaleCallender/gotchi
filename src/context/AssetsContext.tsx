import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Asset, RiskFactor, RiskHistoryPoint } from '../types';

interface TotalRiskScores {
  security: number;
  market: number;
  protocol: number;
  regulatory: number;
  overall: number;
}

interface AssetsContextType {
  assets: Asset[];
  setAssets: React.Dispatch<React.SetStateAction<Asset[]>>;
  riskHistory: RiskHistoryPoint[];
  totalRiskScores: TotalRiskScores;
}

// Sample initial data
const initialAssets: Asset[] = [
  {
    id: 'btc-01',
    name: 'Bitcoin',
    symbol: 'BTC',
    amount: 0.45,
    value: 29343.50,
    overallRisk: 'medium',
    riskFactors: [
      {
        id: 'rf-btc-1',
        name: 'Custody Risk',
        description: 'Your Bitcoin is stored on a centralized exchange',
        level: 'high',
        impact: 8,
        category: 'security',
        actionable: true,
        mitigationSteps: ['Move to a hardware wallet', 'Enable 2FA on exchange']
      },
      {
        id: 'rf-btc-2',
        name: 'Market Volatility',
        description: 'Bitcoin is subject to high market volatility',
        level: 'medium',
        impact: 6,
        category: 'market',
        actionable: false
      }
    ]
  },
  {
    id: 'eth-01',
    name: 'Ethereum',
    symbol: 'ETH',
    amount: 3.2,
    value: 8456.32,
    overallRisk: 'low',
    riskFactors: [
      {
        id: 'rf-eth-1',
        name: 'Smart Contract Risk',
        description: 'Some of your ETH is staked in newer protocols',
        level: 'medium',
        impact: 5,
        category: 'protocol',
        actionable: true,
        mitigationSteps: ['Diversify staking across established providers']
      }
    ]
  },
  {
    id: 'sol-01',
    name: 'Solana',
    symbol: 'SOL',
    amount: 120,
    value: 12360.40,
    overallRisk: 'high',
    riskFactors: [
      {
        id: 'rf-sol-1',
        name: 'Network Reliability',
        description: 'Solana has experienced network outages',
        level: 'high',
        impact: 8,
        category: 'protocol',
        actionable: true,
        mitigationSteps: ['Reduce position size', 'Set stop-loss orders']
      },
      {
        id: 'rf-sol-2',
        name: 'Regulatory Uncertainty',
        description: 'Regulatory status is unclear in your jurisdiction',
        level: 'high',
        impact: 9,
        category: 'regulatory',
        actionable: true,
        mitigationSteps: ['Consult with crypto tax advisor', 'Keep documentation of all transactions']
      }
    ]
  }
];

// Sample risk history
const initialRiskHistory: RiskHistoryPoint[] = [
  { date: new Date('2025-01-01'), overallRisk: 60, securityRisk: 70, marketRisk: 50, protocolRisk: 55, regulatoryRisk: 65 },
  { date: new Date('2025-01-02'), overallRisk: 55, securityRisk: 65, marketRisk: 45, protocolRisk: 50, regulatoryRisk: 60 },
  { date: new Date('2025-01-03'), overallRisk: 58, securityRisk: 60, marketRisk: 55, protocolRisk: 60, regulatoryRisk: 55 },
  { date: new Date('2025-01-04'), overallRisk: 52, securityRisk: 55, marketRisk: 50, protocolRisk: 55, regulatoryRisk: 50 },
  { date: new Date('2025-01-05'), overallRisk: 48, securityRisk: 50, marketRisk: 45, protocolRisk: 50, regulatoryRisk: 45 },
  { date: new Date('2025-01-06'), overallRisk: 45, securityRisk: 45, marketRisk: 40, protocolRisk: 45, regulatoryRisk: 50 },
  { date: new Date('2025-01-07'), overallRisk: 48, securityRisk: 35, marketRisk: 65, protocolRisk: 45, regulatoryRisk: 25 },
];

// Initial risk scores
const initialRiskScores: TotalRiskScores = {
  security: 35,
  market: 65,
  protocol: 45,
  regulatory: 25,
  overall: 48
};

const AssetsContext = createContext<AssetsContextType | undefined>(undefined);

export const AssetsProvider: React.FC<{children: ReactNode}> = ({ children }) => {
  const [assets, setAssets] = useState<Asset[]>(initialAssets);
  const [riskHistory, setRiskHistory] = useState<RiskHistoryPoint[]>(initialRiskHistory);
  const [totalRiskScores, setTotalRiskScores] = useState<TotalRiskScores>(initialRiskScores);
  
  // Calculate risk scores whenever assets change
  useEffect(() => {
    // In a real app, this would be a complex calculation based on multiple factors
    // For demo, we'll use the initial values
    setTotalRiskScores(initialRiskScores);
  }, [assets]);

  return (
    <AssetsContext.Provider value={{ assets, setAssets, riskHistory, totalRiskScores }}>
      {children}
    </AssetsContext.Provider>
  );
};

export const useAssets = (): AssetsContextType => {
  const context = useContext(AssetsContext);
  if (context === undefined) {
    throw new Error('useAssets must be used within an AssetsProvider');
  }
  return context;
};