import React from "react";

export default function ProjectionBarChart({ data }) {
  if (!data || !data.labels || !data.projections || !data.actuals) {
    return (
      <div className="p-4 rounded-lg shadow-md bg-gray-100 dark:bg-gray-900">
        <h3 className="mb-2 text-lg font-semibold text-gray-800 dark:text-gray-200">
          Projections vs Actuals
        </h3>
        <p className="text-gray-600 dark:text-gray-400">No data available</p>
      </div>
    );
  }

  const yAxisLabels = ["30M", "20M", "10M", "0"];
  const maxValue = 30000000;

  const chartData = data.labels.map((label, idx) => ({
    name: label,
    projection: Math.max(data.projections[idx], data.actuals[idx]),
    actual: data.actuals[idx],
  }));

  return (
    <div className="w-full p-4 rounded-lg shadow-md bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
      <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-gray-50">
        Projections vs Actuals
      </h3>
      <div className="flex flex-grow relative h-64 sm:h-72 md:h-80 lg:h-96">
        <div className="flex flex-col justify-between h-full pr-2 text-[10px] sm:text-xs text-gray-600 dark:text-gray-400">
          {yAxisLabels.map((label) => (
            <div key={label} className="text-right">
              {label}
            </div>
          ))}
        </div>
        <div className="flex-grow relative">
          <div className="absolute inset-0 flex flex-col justify-between pb-[2px] pt-[2px]">
            {yAxisLabels.slice(0, -1).map((_, index) => (
              <div
                key={`grid-${index}`}
                className="w-full h-px bg-gray-300 dark:bg-gray-700"
              ></div>
            ))}
          </div>
          <div className="flex justify-around items-end h-full relative z-10 px-1">
            {chartData.map((item) => {
              const actualHeightPercent = (item.actual / maxValue) * 100;
              const totalHeightPercent = (item.projection / maxValue) * 100;
              const totalProjection = (item.projection / 1000000).toFixed(1);
              const actualValue = (item.actual / 1000000).toFixed(1);
              return (
                <div
                  key={item.name}
                  className="relative flex flex-col w-6 sm:w-8 h-full mx-1 group cursor-pointer transition-all duration-200"
                  title={`Month: ${item.name}\nProjected: $${totalProjection}M\nActual: $${actualValue}M`}
                >
                  <div
                    className="absolute bottom-0.5 w-full bg-blue-400 dark:bg-blue-300 rounded-md transition-all duration-300"
                    style={{ height: `${actualHeightPercent}%` }}
                  ></div>
                  <div
                    className="absolute bottom-0.5 w-full bg-gray-400 dark:bg-gray-500 opacity-60 rounded-t-md transition-all duration-300"
                    style={{ height: `${totalHeightPercent}%` }}
                  ></div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className="flex justify-around mt-3 text-[10px] sm:text-xs text-gray-600 dark:text-gray-400 ml-6">
        {data.labels.map((label) => (
          <div key={label} className="text-center flex-1">
            {label}
          </div>
        ))}
      </div>
    </div>
  );
}
