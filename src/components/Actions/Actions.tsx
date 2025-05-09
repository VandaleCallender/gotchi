import React from 'react';
import { useAssets } from '../../context/AssetsContext';
import { Shield, RefreshCw, TrendingUp, Upload, Search, AlertTriangle } from 'lucide-react';

const Actions: React.FC = () => {
  const actionButtons = [
    {
      id: 'security-scan',
      name: 'Security Scan',
      icon: <Shield className="h-4 w-4" />,
      action: () => console.log('Performing security scan')
    },
    {
      id: 'market-analysis',
      name: 'Market Analysis',
      icon: <TrendingUp className="h-4 w-4" />,
      action: () => console.log('Performing market analysis')
    },
    {
      id: 'sync-portfolio',
      name: 'Sync Portfolio',
      icon: <RefreshCw className="h-4 w-4" />,
      action: () => console.log('Syncing portfolio')
    },
    {
      id: 'add-asset',
      name: 'Add Asset',
      icon: <Upload className="h-4 w-4" />,
      action: () => console.log('Adding new asset')
    },
    {
      id: 'scan-contract',
      name: 'Scan Contract',
      icon: <Search className="h-4 w-4" />,
      action: () => console.log('Scanning smart contract')
    },
    {
      id: 'risk-report',
      name: 'Risk Report',
      icon: <AlertTriangle className="h-4 w-4" />,
      action: () => console.log('Generating risk report')
    }
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
      {actionButtons.map(button => (
        <button
          key={button.id}
          onClick={button.action}
          className="flex flex-col items-center justify-center p-3 rounded-lg bg-gray-700 hover:bg-gray-600 border border-gray-600 hover:border-primary-500 transition-all"
        >
          <div className="text-primary-400 mb-2">
            {button.icon}
          </div>
          <div className="text-xs text-center">{button.name}</div>
        </button>
      ))}
    </div>
  );
};

export default Actions;