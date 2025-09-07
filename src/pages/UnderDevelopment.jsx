import React from 'react';
import { VscTools } from 'react-icons/vsc'; // Make sure you have react-icons installed

export default function UnderDevelopment({ title }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-black text-gray-800 dark:text-gray-200 p-4">
      <div className="bg-white dark:bg-gray-800 p-8 sm:p-12 rounded-lg shadow-xl text-center max-w-lg w-full transform transition-transform duration-300 hover:scale-105">
        <VscTools className="text-6xl text-blue-500 dark:text-blue-400 mx-auto mb-6" />
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-gray-100 mb-2">
          {title || "Page Under Development"}
        </h1>
        <p className="text-md sm:text-lg text-gray-600 dark:text-gray-400 italic">
          We're working hard to bring you a great experience. Please check back soon!
        </p>
      </div>
    </div>
  );
}