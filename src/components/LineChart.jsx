import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const baseData = [
  { month: "Jan", currentWeek: 13000000, previousWeek: 7000000 },
  { month: "Feb", currentWeek: 8000000, previousWeek: 16000000 },
  { month: "Mar", currentWeek: 9000000, previousWeek: 11000000 },
  { month: "Apr", currentWeek: 15000000, previousWeek: 10000000 },
  { month: "May", currentWeek: 20000000, previousWeek: 12000000 },
  { month: "Jun", currentWeek: 20000000, previousWeek: 23000000 },
];

const data = baseData.map((d, i) => ({
  ...d,
  currentSolid: i <= 3 ? d.currentWeek : null,
  currentDashed: i >= 3 ? d.currentWeek : null,
}));

const formatTicks = (tick) => {
  if (tick >= 1000000) return `${tick / 1000000}M`;
  if (tick >= 1000) return `${tick / 1000}K`;
  return tick;
};

const RevenueChart = () => {
  return (
    <div className="w-full h-[350px] p-5 font-sans">
      <div className="mb-5 flex items-center text-sm space-x-6">
        <strong className="mr-2">Revenue</strong>

        <span className="h-4 w-px bg-gray-300" />

        <div className="flex items-center space-x-1">
          <span className="w-2 h-2 rounded-full bg-black inline-block" />
          <span>
            Current Week <strong className="ml-1">$58,211</strong>
          </span>
        </div>

        <div className="flex items-center space-x-1">
          <span className="w-2 h-2 rounded-full bg-[#a9bddb] inline-block" />
          <span>
            Previous Week <strong className="ml-1">$68,768</strong>
          </span>
        </div>
      </div>

      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{ top: 10, right: 20, left: 0, bottom: 0 }}
        >
          <CartesianGrid stroke="#e0e0e0" vertical={false} />

          <XAxis
            dataKey="month"
            tick={{ fill: "#a0a0a0", fontSize: 12 }}
            axisLine={{ stroke: "#e0e0e0" }}
            tickLine={false}
          />

          <YAxis
            tickFormatter={formatTicks}
            tick={{ fill: "#a0a0a0", fontSize: 12 }}
            axisLine={false}
            tickLine={false}
            width={60}
            domain={[0, 30000000]}
          />

          <Tooltip
            formatter={(value) => `$${value.toLocaleString()}`}
            cursor={{ stroke: "#bbb", strokeDasharray: "3 3" }}
          />

          <Line
            type="monotone"
            dataKey="currentSolid"
            stroke="black"
            strokeWidth={2}
            dot={false}
            isAnimationActive={false}
          />

          <Line
            type="monotone"
            dataKey="currentDashed"
            stroke="black"
            strokeWidth={2}
            dot={false}
            strokeDasharray="4 4"
            isAnimationActive={false}
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
