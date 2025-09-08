import React from 'react';

export default function ProductsTable({ products }) {
  return (
    <div className="p-6 rounded-lg  bg-gray-100 dark:bg-gray-900">
      <h3 className="mb-4 mt-20 text-lg font-semibold text-gray-900 dark:text-gray-50">
        Top Selling Products
      </h3>

      <div className="overflow-x-auto">
        <table className="w-full text-left table-auto border-collapse min-w-[500px]">
          <thead>
            <tr>
              <th className="border-b border-gray-300 dark:border-gray-700 px-4 py-2 text-gray-500 dark:text-gray-400">
                Product Name
              </th>
              <th className="border-b border-gray-300 dark:border-gray-700 px-4 py-2 text-gray-500 dark:text-gray-400">
                Price
              </th>
              <th className="border-b border-gray-300 dark:border-gray-700 px-4 py-2 text-gray-500 dark:text-gray-400">
                Quantity
              </th>
              <th className="border-b border-gray-300 dark:border-gray-700 px-4 py-2 text-gray-500 dark:text-gray-400">
                Total Amount
              </th>
            </tr>
          </thead>
          <tbody>
            {products.map(({ name, price, quantity }, idx) => {
              const amount = price * quantity;
              return (
                <tr
                  key={idx}
                  className={
                    idx % 2 === 0
                      ? 'bg-gray-50 dark:bg-black'
                      : 'bg-white dark:bg-gray-800'
                  }
                >
                  <td className="border-b border-gray-200 dark:border-gray-700 px-4 py-2 text-gray-800 dark:text-gray-200">
                    {name}
                  </td>
                  <td className="border-b border-gray-200 dark:border-gray-700 px-4 py-2 text-gray-800 dark:text-gray-200">
                    ${price.toFixed(2)}
                  </td>
                  <td className="border-b border-gray-200 dark:border-gray-700 px-4 py-2 text-gray-800 dark:text-gray-200">
                    {quantity}
                  </td>
                  <td className="border-b border-gray-200 dark:border-gray-700 px-4 py-2 text-gray-800 dark:text-gray-200">
                    ${amount.toFixed(2)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
