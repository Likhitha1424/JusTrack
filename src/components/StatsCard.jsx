import React from 'react';
import { FiArrowUpRight, FiArrowDownRight } from 'react-icons/fi';

export default function StatsCard({ title, value, change }) {
  const isPositive = change >= 0;
  return (
    <div
      className={`p-4 rounded-lg shadow-md
        bg-gray-100 dark:bg-gray-800
        text-gray-900 dark:text-gray-200
        `}
    >
      <h3 className="text-sm font-medium">{title}</h3>
      <p className="mt-1 text-3xl font-bold">{value.toLocaleString()}</p>
      <p
        className={`mt-2 flex items-center text-sm font-medium ${
          isPositive ? 'text-green-600 dark:text-green-500' : 'text-red-600 dark:text-red-500'
        }`}
      >
        {isPositive ? <FiArrowUpRight /> : <FiArrowDownRight />}
        <span className="ml-1">{Math.abs(change).toFixed(2)}%</span>
      </p>
    </div>
  );
}