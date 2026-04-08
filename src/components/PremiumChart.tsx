'use client';

import { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Loader2 } from 'lucide-react';

export default function PremiumChart() {
  const [data, setData] = useState<Record<string, unknown>[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/premium')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setData(data);
        } else {
          console.error('API Error:', data);
          setData([]); // Fallback
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error('Failed to fetch data:', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex h-[400px] w-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
        <span className="ml-2">Loading data...</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Chart: Premium to NAV over time */}
      <div className="h-[400px] w-full">
        <h3 className="text-xl font-semibold mb-4 text-center">MSTR Premium to NAV (%) Over the Last Year</h3>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
            <CartesianGrid stroke="#f5f5f5" strokeDasharray="5 5" />
            <XAxis dataKey="date" tickFormatter={(str) => {
                const date = new Date(str);
                return `${date.getMonth() + 1}/${date.getDate()}`;
            }} />
            <YAxis unit="%" />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="premium" stroke="#ff7300" yAxisId={0} name="Premium (%)" dot={false} strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Auxiliary Chart: Stock vs BTC Price */}
      <div className="h-[300px] w-full mt-6">
        <h3 className="text-lg font-semibold mb-4 text-center">MSTR Price vs BTC Price</h3>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
            <CartesianGrid stroke="#f5f5f5" strokeDasharray="3 3" />
            <XAxis dataKey="date" hide />
            <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
            <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
            <Tooltip />
            <Legend />
            <Line yAxisId="left" type="monotone" dataKey="mstrPrice" stroke="#8884d8" name="MSTR Price ($)" dot={false} />
            <Line yAxisId="right" type="monotone" dataKey="btcPrice" stroke="#82ca9d" name="BTC Price ($)" dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>    
    </div>
  );
}
