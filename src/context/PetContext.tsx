import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { PetState, PetAction } from '../types';

interface PetContextType {
  pet: PetState;
  setPet: React.Dispatch<React.SetStateAction<PetState>>;
  petActions: PetAction[];
  initialized: boolean;
  performAction: (actionId: string) => void;
}

const defaultPetState: PetState = {
  health: 80,
  happiness: 75,
  riskTolerance: 50,
  lastChecked: new Date(),
  currentMood: 'happy',
  needsAttention: false
};

const defaultPetActions: PetAction[] = [
  {
    id: 'security-audit',
    name: 'Security Audit',
    description: 'Analyze and improve security measures',
    effect: {
      health: 10,
      happiness: 5,
      riskReduction: 15
    },
    cooldown: 60,
  },
  {
    id: 'refresh-strategy',
    name: 'Update Strategy',
    description: 'Refresh your risk management approach',
    effect: {
      health: 5,
      happiness: 15,
      riskReduction: 10
    },
    cooldown: 30,
  },
  {
    id: 'portfolio-review',
    name: 'Portfolio Review',
    description: 'Review and rebalance your portfolio',
    effect: {
      health: 15,
      happiness: 10,
      riskReduction: 20
    },
    cooldown: 120,
  }
];

const PetContext = createContext<PetContextType | undefined>(undefined);

export const PetProvider: React.FC<{children: ReactNode}> = ({ children }) => {
  const [pet, setPet] = useState<PetState>(defaultPetState);
  const [petActions, setPetActions] = useState<PetAction[]>(defaultPetActions);
  const [initialized, setInitialized] = useState(false);
  
  // Simulate degradation of pet health/happiness over time
  useEffect(() => {
    const decreaseInterval = setInterval(() => {
      setPet(currentPet => {
        // Random small decrease in health and happiness
        const healthDecrease = Math.random() * 2;
        const happinessDecrease = Math.random() * 3;
        
        const newHealth = Math.max(0, currentPet.health - healthDecrease);
        const newHappiness = Math.max(0, currentPet.happiness - happinessDecrease);
        
        // Determine new mood based on health and happiness
        let newMood: PetState['currentMood'] = 'happy';
        const combinedScore = (newHealth + newHappiness) / 2;
        
        if (combinedScore < 20) {
          newMood = 'critical';
        } else if (combinedScore < 40) {
          newMood = 'sick';
        } else if (combinedScore < 60) {
          newMood = 'sad';
        } else if (combinedScore < 80) {
          newMood = 'neutral';
        }
        
        // Pet needs attention if health or happiness drops below threshold
        const needsAttn = newHealth < 50 || newHappiness < 40;
        
        return {
          ...currentPet,
          health: newHealth,
          happiness: newHappiness,
          currentMood: newMood,
          needsAttention: needsAttn,
          lastChecked: new Date()
        };
      });
    }, 60000); // Every minute in real app; faster for demo
    
    // Initialize the app after a short delay
    const initTimer = setTimeout(() => {
      setInitialized(true);
    }, 500);
    
    return () => {
      clearInterval(decreaseInterval);
      clearTimeout(initTimer);
    };
  }, []);
  
  const performAction = (actionId: string) => {
    // Find the action
    const action = petActions.find(a => a.id === actionId);
    if (!action) return;
    
    // Check cooldown
    if (action.lastUsed) {
      const now = new Date();
      const lastUsed = new Date(action.lastUsed);
      const diffMinutes = (now.getTime() - lastUsed.getTime()) / (1000 * 60);
      
      if (diffMinutes < action.cooldown) {
        console.log(`Action ${action.name} is still on cooldown`);
        return;
      }
    }
    
    // Apply effects
    setPet(currentPet => {
      return {
        ...currentPet,
        health: Math.min(100, currentPet.health + (action.effect.health || 0)),
        happiness: Math.min(100, currentPet.happiness + (action.effect.happiness || 0)),
        needsAttention: false // Reset needs attention after an action
      };
    });
    
    // Update action's last used time
    setPetActions(currentActions => {
      return currentActions.map(a => {
        if (a.id === actionId) {
          return { ...a, lastUsed: new Date() };
        }
        return a;
      });
    });
  };

  return (
    <PetContext.Provider value={{ pet, setPet, petActions, initialized, performAction }}>
      {children}
    </PetContext.Provider>
  );
};

export const usePet = (): PetContextType => {
  const context = useContext(PetContext);
  if (context === undefined) {
    throw new Error('usePet must be used within a PetProvider');
  }
  return context;
};