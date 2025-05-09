import React from 'react';
import { Heart, Smile } from 'lucide-react';

interface PetStatusProps {
  health: number;
  happiness: number;
}

const PetStatus: React.FC<PetStatusProps> = ({ health, happiness }) => {
  const getStatusColor = (value: number) => {
    if (value >= 70) return 'text-success-500';
    if (value >= 40) return 'text-warning-500';
    return 'text-danger-500';
  };
  
  const getProgressColor = (value: number) => {
    if (value >= 70) return 'bg-success-500';
    if (value >= 40) return 'bg-warning-500';
    return 'bg-danger-500';
  };

  return (
    <div className="w-full space-y-2 mt-2">
      <div className="flex items-center space-x-2">
        <Heart className={`h-4 w-4 ${getStatusColor(health)}`} />
        <div className="text-xs font-medium">Health</div>
        <div className={`ml-auto text-xs font-bold ${getStatusColor(health)}`}>
          {health}%
        </div>
      </div>
      <div className="w-full bg-gray-700 rounded-full h-2.5">
        <div 
          className={`${getProgressColor(health)} h-2.5 rounded-full transition-all duration-500 ease-in-out`}
          style={{ width: `${health}%` }}
        ></div>
      </div>
      
      <div className="flex items-center space-x-2 mt-4">
        <Smile className={`h-4 w-4 ${getStatusColor(happiness)}`} />
        <div className="text-xs font-medium">Happiness</div>
        <div className={`ml-auto text-xs font-bold ${getStatusColor(happiness)}`}>
          {happiness}%
        </div>
      </div>
      <div className="w-full bg-gray-700 rounded-full h-2.5">
        <div 
          className={`${getProgressColor(happiness)} h-2.5 rounded-full transition-all duration-500 ease-in-out`}
          style={{ width: `${happiness}%` }}
        ></div>
      </div>
    </div>
  );
};

export default PetStatus;