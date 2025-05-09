import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useAssets } from '../../context/AssetsContext';

const PriceHistory: React.FC = () => {
  const { priceHistory } = useAssets();
  
  // Placeholder data until the real data is available
  const data = priceHistory || [
    { date: '2025-01-01', btc: 42000, eth: 2800, sol: 95 },
    { date: '2025-01-02', btc: 43500, eth: 2900, sol: 98 },
    { date: '2025-01-03', btc: 44200, eth: 3000, sol: 102 },
    { date: '2025-01-04', btc: 43800, eth: 2950, sol: 100 },
    { date: '2025-01-05', btc: 45000, eth: 3100, sol: 105 },
    { date: '2025-01-06', btc: 46500, eth: 3200, sol: 108 },
    { date: '2025-01-07', btc: 47000, eth: 3300, sol: 110 },
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
            label={{ 
              value: 'Price USD', 
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
            formatter={(value: number) => [`$${value.toLocaleString()}`, '']}
          />
          <Legend />
          <Line 
            type="monotone" 
            name="BTC"
            dataKey="btc" 
            stroke="#F7931A" 
            activeDot={{ r: 8 }}
            strokeWidth={2}
          />
          <Line 
            type="monotone" 
            name="ETH"
            dataKey="eth" 
            stroke="#627EEA" 
            strokeWidth={2}
          />
          <Line 
            type="monotone" 
            name="SOL"
            dataKey="sol" 
            stroke="#14F195" 
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PriceHistory;