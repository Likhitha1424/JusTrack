import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Direct', value: 300.56 },
  { name: 'Affiliate', value: 135.18 },
  { name: 'Sponsored', value: 154.02 },
  { name: 'E-mail', value: 48.96 },
];

const COLORS = ['#8793e5', '#88c9a3', '#aeb7e6', '#a9d0d3'];

const CustomLabel = ({ viewBox, percent }) => {
  const { cx, cy } = viewBox;
  return (
    <g>
      <rect
        x={cx - 45}
        y={cy - 16}
        rx={6}
        ry={6}
        width={90}
        height={32}
        className="fill-neutral-200 dark:fill-neutral-800 stroke-neutral-400 dark:stroke-neutral-600"
        strokeWidth={1}
      />
      <text
        x={cx}
        y={cy}
        className="fill-black dark:fill-white"
        textAnchor="middle"
        dominantBaseline="central"
        style={{
          fontSize: '14px',
          fontWeight: 'bold',
          fontFamily: 'sans-serif',
        }}
      >
        {`${(percent * 100).toFixed(1)}%`}
      </text>
    </g>
  );
};

export default function TotalSalesDoughnutChart() {
  return (
    <div className="w-full max-w-md p-6 rounded-xl shadow-lg bg-white text-neutral-900 dark:bg-neutral-900 dark:text-white font-sans transition-colors duration-300">
      <h2 className="text-lg sm:text-xl font-semibold mb-6">Total Sales</h2>
      <div className="w-full h-56 sm:h-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius="50%"
              outerRadius="70%"
              paddingAngle={5}
              label={({ name, percent }) => {
                if (name === 'Affiliate') {
                  return (
                    <CustomLabel
                      percent={percent}
                      viewBox={{ cx: 150, cy: 120 }}
                    />
                  );
                }
                return null;
              }}
              labelLine={false}
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-6 space-y-3">
        {data.map((item, index) => (
          <div
            key={item.name}
            className="flex justify-between items-center text-sm sm:text-base"
          >
            <div className="flex items-center space-x-2">
              <span
                className="w-2.5 h-2.5 rounded-full"
                style={{ backgroundColor: COLORS[index % COLORS.length] }}
              ></span>
              <span className="text-neutral-600 dark:text-neutral-400">
                {item.name}
              </span>
            </div>
            <span className="font-medium text-neutral-900 dark:text-neutral-200">
              ${item.value.toFixed(2)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
