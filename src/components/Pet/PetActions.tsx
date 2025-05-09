import React from 'react';
import { Shield, RefreshCw, Award } from 'lucide-react';
import { PetAction } from '../../types';

interface PetActionsProps {
  actions: PetAction[];
}

const PetActions: React.FC<PetActionsProps> = ({ actions }) => {
  const handleAction = (action: PetAction) => {
    // This would be handled in the context
    console.log(`Performing action: ${action.name}`);
  };
  
  const isActionDisabled = (action: PetAction): boolean => {
    if (!action.lastUsed) return false;
    
    const now = new Date();
    const lastUsed = new Date(action.lastUsed);
    const diffMinutes = (now.getTime() - lastUsed.getTime()) / (1000 * 60);
    
    return diffMinutes < action.cooldown;
  };
  
  const getRemainingCooldown = (action: PetAction): string => {
    if (!action.lastUsed) return '';
    
    const now = new Date();
    const lastUsed = new Date(action.lastUsed);
    const diffMinutes = (now.getTime() - lastUsed.getTime()) / (1000 * 60);
    const remaining = Math.ceil(action.cooldown - diffMinutes);
    
    if (remaining <= 0) return '';
    return `${remaining}m`;
  };
  
  // Map action IDs to icons
  const actionIcons: Record<string, React.ReactNode> = {
    'security-audit': <Shield className="h-4 w-4" />,
    'refresh-strategy': <RefreshCw className="h-4 w-4" />,
    'portfolio-review': <Award className="h-4 w-4" />,
  };

  return (
    <div className="w-full grid grid-cols-3 gap-2 mt-4">
      {actions.map((action) => (
        <button
          key={action.id}
          onClick={() => handleAction(action)}
          disabled={isActionDisabled(action)}
          className={`flex flex-col items-center justify-center p-2 rounded-lg border border-gray-700 ${
            isActionDisabled(action)
              ? 'bg-gray-700 opacity-50 cursor-not-allowed'
              : 'bg-gray-700 hover:bg-gray-600 hover:border-primary-500 transition-all'
          }`}
          title={action.description}
        >
          <div className="text-primary-400 mb-1">
            {actionIcons[action.id] || <Shield className="h-4 w-4" />}
          </div>
          <div className="text-xs text-center">{action.name}</div>
          {isActionDisabled(action) && (
            <div className="text-xs text-gray-400 mt-1">
              {getRemainingCooldown(action)}
            </div>
          )}
        </button>
      ))}
    </div>
  );
};

export default PetActions;