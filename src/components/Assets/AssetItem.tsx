import React from 'react';
import { Asset, RiskLevel } from '../../types';
import { AlertTriangle, Eye, Shield } from 'lucide-react';

interface AssetItemProps {
  asset: Asset;
}

const AssetItem: React.FC<AssetItemProps> = ({ asset }) => {
  const getRiskBadgeClass = (level: RiskLevel) => {
    switch (level) {
      case 'low': return 'bg-success-500 text-success-50';
      case 'medium': return 'bg-warning-500 text-warning-50';
      case 'high': return 'bg-danger-500 text-danger-50';
      default: return 'bg-gray-500 text-gray-50';
    }
  };
  
  return (
    <tr className="bg-gray-800 border-b border-gray-700 hover:bg-gray-700">
      <td className="px-4 py-3">
        <div className="flex items-center">
          <div className="w-8 h-8 mr-3 rounded-full bg-primary-700 flex items-center justify-center font-semibold">
            {asset.symbol.substring(0, 2).toUpperCase()}
          </div>
          <div>
            <div className="font-medium">{asset.name}</div>
            <div className="text-xs text-gray-400">{asset.symbol.toUpperCase()}</div>
          </div>
        </div>
      </td>
      <td className="px-4 py-3 font-mono">
        {asset.amount.toFixed(4)}
      </td>
      <td className="px-4 py-3 font-mono">
        ${asset.value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
      </td>
      <td className="px-4 py-3">
        <span className={`px-2 py-1 rounded-full text-xs ${getRiskBadgeClass(asset.overallRisk)}`}>
          {asset.overallRisk.charAt(0).toUpperCase() + asset.overallRisk.slice(1)}
        </span>
      </td>
      <td className="px-4 py-3">
        <div className="flex space-x-2">
          <button className="p-1 rounded-md hover:bg-gray-600" title="View Details">
            <Eye className="h-4 w-4 text-primary-400" />
          </button>
          <button className="p-1 rounded-md hover:bg-gray-600" title="View Risk Factors">
            <AlertTriangle className="h-4 w-4 text-warning-400" />
          </button>
          <button className="p-1 rounded-md hover:bg-gray-600" title="Apply Security Measures">
            <Shield className="h-4 w-4 text-secondary-400" />
          </button>
        </div>
      </td>
    </tr>
  );
};

export default AssetItem;