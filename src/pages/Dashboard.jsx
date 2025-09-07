import React from 'react';
import { useSelector } from 'react-redux';
import StatsCard from '../components/StatsCard';
import ProjectionBarChart from '../components/BarChart';
import RevenueLineChart from '../components/LineChart';
import ProductsTable from '../components/ProductsTable';
import SalesDonutChart from '../components/PieChart';
import WorldMap from '../components/WorldMap'; 
import DigitalCircuitLoader from '../components/DigitalCircuitLoader';

export default function Dashboard() {
  const {
    loading,
    error,
    stats,
    barChart,
    lineChart,
    mapData,
    products,
    totalSales,
  } = useSelector((state) => state.dashboard);

  if (loading) {
    return <DigitalCircuitLoader />;
  }

  if (error) {
  }

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="grid grid-cols-2 gap-6 lg:col-span-2">
          <StatsCard
            title="Customers"
            value={stats.customers?.value || 0}
            change={stats.customers?.change || 0}
          />
          <StatsCard
            title="Orders"
            value={stats.orders?.value || 0}
            change={stats.orders?.change || 0}
          />
          <StatsCard
            title="Revenue"
            value={`$${stats.revenue?.value || 0}`}
            change={stats.revenue?.change || 0}
          />
          <StatsCard
            title="Growth"
            value={`${stats.growth?.value || 0}%`}
            change={stats.growth?.change || 0}
          />
        </div>
        <div className="lg:col-span-1 ">
          <ProjectionBarChart data={barChart} />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-6 ">
        <div className="lg:col-span-3 bg-gray-100 p-4 rounded-lg shadow-md dark:bg-gray-900 text-gray-900 dark:text-gray-300">
          <RevenueLineChart data={lineChart} />
        </div>
        <div className="lg:col-span-1 p-4 rounded-lg shadow-md bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-300">
          <h3 className="mb-4 text-lg font-semibold">Revenue by Location</h3>
          <WorldMap />
          <ul className="space-y-2 mt-4">
            {mapData.map(({ city, value }, idx) => (
              <li key={idx} className="flex justify-between">
                <span>{city}</span>
                <span className="font-semibold">{(value / 1000).toLocaleString()}K</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-6">
        <div className="col-span-3 h-full rounded-lg shadow-md bg-white dark:bg-black text-gray-900 dark:text-gray-300">
          <ProductsTable products={products} />
        </div>
        <div className="col-span-1 h-full rounded-lg shadow-md bg-white dark:bg-black text-gray-900 dark:text-gray-300">
          <SalesDonutChart data={totalSales} />
        </div>
      </div>
    </div>
  );
}
