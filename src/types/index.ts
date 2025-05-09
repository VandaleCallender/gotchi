export type RiskLevel = 'low' | 'medium' | 'high';

export interface RiskFactor {
  id: string;
  name: string;
  description: string;
  level: RiskLevel;
  impact: number; // 1-10
  category: 'security' | 'market' | 'protocol' | 'regulatory';
  actionable: boolean;
  mitigationSteps?: string[];
}

export interface Asset {
  id: string;
  name: string;
  symbol: string;
  amount: number;
  value: number;
  riskFactors: RiskFactor[];
  overallRisk: RiskLevel;
}

export interface PetState {
  health: number; // 0-100
  happiness: number; // 0-100
  riskTolerance: number; // 0-100, affects how pet reacts to risks
  lastChecked: Date;
  currentMood: 'happy' | 'neutral' | 'sad' | 'sick' | 'critical';
  needsAttention: boolean;
}

export interface PetAction {
  id: string;
  name: string;
  description: string;
  effect: {
    health?: number;
    happiness?: number;
    riskReduction?: number;
  };
  cooldown: number; // in minutes
  lastUsed?: Date;
}

export interface RiskHistoryPoint {
  date: Date;
  overallRisk: number; // 0-100
  securityRisk: number;
  marketRisk: number;
  protocolRisk: number;
  regulatoryRisk: number;
}

export interface UserSettings {
  riskThresholds: {
    low: number;
    medium: number;
    high: number;
  };
  notifications: {
    enabled: boolean;
    riskLevelChange: boolean;
    petNeedsAttention: boolean;
  };
  displayPreferences: {
    theme: 'light' | 'dark';
    soundEffects: boolean;
  };
}