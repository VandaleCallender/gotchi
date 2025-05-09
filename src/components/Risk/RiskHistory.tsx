import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useAssets } from '../../context/AssetsContext';

const RiskHistory: React.FC = () => {
  const { riskHistory } = useAssets();
  
  // Placeholder data until the real data is available
  const data = riskHistory || [
    { date: new Date('2025-01-01').toISOString().split('T')[0], overall: 60, security: 70, market: 50, protocol: 55, regulatory: 65 },
    { date: new Date('2025-01-02').toISOString().split('T')[0], overall: 55, security: 65, market: 45, protocol: 50, regulatory: 60 },
    { date: new Date('2025-01-03').toISOString().split('T')[0], overall: 58, security: 60, market: 55, protocol: 60, regulatory: 55 },
    { date: new Date('2025-01-04').toISOString().split('T')[0], overall: 52, security: 55, market: 50, protocol: 55, regulatory: 50 },
    { date: new Date('2025-01-05').toISOString().split('T')[0], overall: 48, security: 50, market: 45, protocol: 50, regulatory: 45 },
    { date: new Date('2025-01-06').toISOString().split('T')[0], overall: 45, security: 45, market: 40, protocol: 45, regulatory: 50 },
    { date: new Date('2025-01-07').toISOString().split('T')[0], overall: 48, security: 35, market: 65, protocol: 45, regulatory: 25 },
  ];

  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#4B5563" />
          <XAxis 
            dataKey="date" 
            stroke="#9CA3AF"
            tick={{ fill: '#9CA3AF', fontSize: 12 }}
          />
          <YAxis 
            stroke="#9CA3AF"
            tick={{ fill: '#9CA3AF', fontSize: 12 }}
            domain={[0, 100]}
            label={{ 
              value: 'Risk %', 
              angle: -90, 
              position: 'insideLeft',
              style: { fill: '#9CA3AF' } 
            }}
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: '#1F2937', 
              borderColor: '#4B5563',
              color: '#F9FAFB' 
            }}
          />
          <Legend />
          <Line 
            type="monotone" 
            dataKey="overall" 
            stroke="#8B5CF6" 
            activeDot={{ r: 8 }}
            strokeWidth={2}
          />
          <Line type="monotone" dataKey="security" stroke="#EC4899" strokeWidth={1.5} />
          <Line type="monotone" dataKey="market" stroke="#06B6D4" strokeWidth={1.5} />
          <Line type="monotone" dataKey="protocol" stroke="#10B981" strokeWidth={1.5} />
          <Line type="monotone" dataKey="regulatory" stroke="#F59E0B" strokeWidth={1.5} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RiskHistory;