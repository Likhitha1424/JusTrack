import React from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from 'recharts';

const data = [
  { month: 'Jan', currentWeek: 13000000, previousWeek: 7000000 },
  { month: 'Feb', currentWeek: 8000000, previousWeek: 16000000 },
  { month: 'Mar', currentWeek: 9000000, previousWeek: 11000000 },
  { month: 'Apr', currentWeek: 15000000, previousWeek: 10000000 },
  { month: 'May', currentWeek: 20000000, previousWeek: 12000000 },
  { month: 'Jun', currentWeek: 20000000, previousWeek: 23000000 },
];

const formatTicks = (tick) => {
  if (tick >= 1000000) return `${tick / 1000000}M`;
  if (tick >= 1000) return `${tick / 1000}K`;
  return tick;
};

const RevenueChart = () => {
  return (
    <div style={{ width: '100%', height: 350, padding: 20, fontFamily: 'Arial, sans-serif' }}>
      <div style={{ marginBottom: 20, display: 'flex', alignItems: 'center', fontSize: 14 }}>
        <strong style={{ marginRight: 10 }}>Revenue</strong>
        <div style={{ display: 'flex', alignItems: 'center', marginRight: 20 }}>
          <span
            style={{
              width: 10,
              height: 10,
              borderRadius: '50%',
              backgroundColor: 'black',
              display: 'inline-block',
              marginRight: 6,
            }}
          />
          Current Week <strong style={{ marginLeft: 4 }}>$58,211</strong>
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <span
            style={{
              width: 10,
              height: 10,
              borderRadius: '50%',
              backgroundColor: '#a9bddb',
              display: 'inline-block',
              marginRight: 6,
            }}
          />
          Previous Week <strong style={{ marginLeft: 4 }}>$68,768</strong>
        </div>
      </div>

      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
          <CartesianGrid stroke="#e0e0e0" vertical={false} />
          <XAxis
            dataKey="month"
            tick={{ fill: '#a0a0a0', fontSize: 12 }}
            axisLine={{ stroke: '#e0e0e0' }}
            tickLine={false}
          />
          <YAxis
            tickFormatter={formatTicks}
            tick={{ fill: '#a0a0a0', fontSize: 12 }}
            axisLine={false}
            tickLine={false}
            width={60}
            domain={[0, 30000000]}
          />
          <Tooltip
            formatter={(value) => `$${value.toLocaleString()}`}
            cursor={{ stroke: '#bbb', strokeDasharray: '3 3' }}
          />
          <Legend verticalAlign="top" height={36} />

          <Line
            type="monotone"
            dataKey="currentWeek"
            stroke="black"
            strokeWidth={2}
            dot={false}
          />

          <Line
            type="monotone"
            dataKey="currentWeek"
            stroke="black"
            strokeWidth={2}
            dot={false}
            strokeDasharray="0"
            isAnimationActive={false}
            activeDot={false}
            segment={(props) => {
              const { index } = props;
              if (index < 4) {
                return <Line {...props} />;
              }
              return null;
            }}
          />

          <Line
            type="monotone"
            dataKey="currentWeek"
            stroke="black"
            strokeWidth={2}
            dot={false}
            strokeDasharray="4 4"
            isAnimationActive={false}
            activeDot={false}
            segment={(props) => {
              const { index } = props;
              if (index >= 4) {
                return <Line {...props} />;
              }
              return null;
            }}
          />

          <Line
            type="monotone"
            dataKey="previousWeek"
            stroke="#a9bddb"
            strokeWidth={3}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RevenueChart;
