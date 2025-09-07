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
   // ... your error UI
}

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <ProjectionBarChart data={barChart} />
        <RevenueLineChart data={lineChart} />

      <div className="p-4 rounded-lg shadow-md bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-300">
  <h3 className="mb-4 text-lg font-semibold">Revenue by Location</h3>

  <div className="mb-6">
    <WorldMap />
  </div>

  <ul className="space-y-2">
    {mapData.map(({ city, value }, idx) => (
      <li key={idx} className="flex justify-between">
        <span>{city}</span>
        <span className="font-semibold">{(value / 1000).toLocaleString()}</span>
      </li>
    ))}
  </ul>
</div>

      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2">
          <ProductsTable products={products} />
        </div>
        <SalesDonutChart data={totalSales} />
      </div>
    </div>
  );
}
