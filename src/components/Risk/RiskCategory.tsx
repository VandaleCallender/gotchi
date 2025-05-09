import React, { ReactNode } from 'react';
import Tooltip from '../common/Tooltip';

interface RiskCategoryProps {
  title: string;
  value: number;
  icon: ReactNode;
  description: string;
}

const RiskCategory: React.FC<RiskCategoryProps> = ({ 
  title, 
  value, 
  icon,
  description 
}) => {
  const getRiskLevelClass = (score: number) => {
    if (score < 40) return 'bg-success-500';
    if (score < 70) return 'bg-warning-500';
    return 'bg-danger-500';
  };
  
  const getRiskLevelText = (score: number) => {
    if (score < 40) return 'Low Risk';
    if (score < 70) return 'Medium Risk';
    return 'High Risk';
  };

  return (
    <div className="bg-gray-700 rounded-lg p-4 hover:shadow-lg transition-all">
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center space-x-2">
          <div className="text-primary-400">
            {icon}
          </div>
          <h4 className="font-medium text-sm">{title}</h4>
          
          <Tooltip content={description}>
            <div className="cursor-help text-gray-400 hover:text-white transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
                <line x1="12" y1="17" x2="12.01" y2="17"></line>
              </svg>
            </div>
          </Tooltip>
        </div>
        <div className={`px-2 py-1 rounded-full text-xs ${getRiskLevelClass(value)}`}>
          {value}%
        </div>
      </div>
      
      <div className="w-full bg-gray-600 rounded-full h-2">
        <div 
          className={`${getRiskLevelClass(value)} h-2 rounded-full transition-all duration-500 ease-in-out`}
          style={{ width: `${value}%` }}
        ></div>
      </div>
      
      <div className="mt-2 text-xs text-right">
        {getRiskLevelText(value)}
      </div>
    </div>
  );
};

export default RiskCategory;