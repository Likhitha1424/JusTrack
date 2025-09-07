import React from 'react';
import { FiZap } from 'react-icons/fi';

const DigitalCircuitLoader = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-500">
      <div className="relative flex items-center justify-center w-48 h-48">
        <FiZap className="text-blue-500 dark:text-blue-400 text-6xl z-10 animate-pulse" />

        <div className="absolute w-full h-full border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-full animate-spin-slow"></div>
        <div
          className="absolute w-3 h-3 bg-green-400 rounded-full animate-orbit"
          style={{ top: '0%', left: '50%', transform: 'translate(-50%, -50%)' }}
        ></div>
        <div
          className="absolute w-3 h-3 bg-purple-400 rounded-full animate-orbit-delay"
          style={{ bottom: '0%', right: '50%', transform: 'translate(50%, 50%)' }}
        ></div>

        <div className="absolute w-24 h-24 border-2 border-blue-400/30 rounded-full animate-ping"></div>
        <div
          className="absolute w-40 h-40 border-2 border-blue-400/20 rounded-full animate-ping"
          style={{ animationDelay: '0.5s' }}
        ></div>
      </div>
      <div className="text-center mt-8">
        <p className="text-xl font-semibold text-gray-800 dark:text-gray-200">
          Initializing Dashboard...
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 italic">
          Juspay is optimizing your experience ⚡
        </p>
      </div>
    </div>
  );
};

export default DigitalCircuitLoader;
