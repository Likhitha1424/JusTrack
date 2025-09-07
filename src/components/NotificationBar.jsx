// src/components/NotificationBar.jsx
import React from 'react';
import {
  FiX,
  FiBell,
  FiUser,
  FiFileText,
  FiCheckCircle,
  FiTrash2,
  FiMail,
} from 'react-icons/fi';

const NotificationBar = ({ isOpen, onClose }) => {
  return (
    <div
      className={`fixed top-0 right-0 h-full w-80 bg-white dark:bg-gray-800 shadow-xl transition-transform duration-300 ease-in-out z-50 transform ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}
    >
      <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
          Notifications
        </h3>
        <button
          onClick={onClose}
          className="p-1 rounded-full text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700"
        >
          <FiX size={20} />
        </button>
      </div>

      <div className="p-4 space-y-4 overflow-y-auto h-full pb-20">
        <div className="space-y-2">
          <h4 className="text-sm font-semibold text-gray-500 dark:text-gray-400">
            Notifications
          </h4>
          <div className="space-y-3">
            <div className="flex items-start space-x-3 text-gray-700 dark:text-gray-300">
              <div className="flex-shrink-0 mt-1">
                <FiBell size={18} className="text-green-500" />
              </div>
              <div>
                <p className="text-sm">
                  You have a bug that needs...
                  <span className="block text-xs text-gray-400 mt-1">
                    31 minutes ago
                  </span>
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3 text-gray-700 dark:text-gray-300">
              <div className="flex-shrink-0 mt-1">
                <FiUser size={18} className="text-blue-500" />
              </div>
              <div>
                <p className="text-sm">
                  New user registered
                  <span className="block text-xs text-gray-400 mt-1">
                    39 minutes ago
                  </span>
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3 text-gray-700 dark:text-gray-300">
              <div className="flex-shrink-0 mt-1">
                <FiBell size={18} className="text-yellow-500" />
              </div>
              <div>
                <p className="text-sm">
                  You have a bug that needs...
                  <span className="block text-xs text-gray-400 mt-1">
                    12 hours ago
                  </span>
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3 text-gray-700 dark:text-gray-300">
              <div className="flex-shrink-0 mt-1">
                <FiMail size={18} className="text-purple-500" />
              </div>
              <div>
                <p className="text-sm">
                  Andi Lane subscribed to you
                  <span className="block text-xs text-gray-400 mt-1">
                    Today, 11:59 AM
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
        <hr className="border-gray-200 dark:border-gray-700 my-4" />

        <div className="space-y-2">
          <h4 className="text-sm font-semibold text-gray-500 dark:text-gray-400">
            Activities
          </h4>
          <div className="space-y-3">
            <div className="flex items-start space-x-3 text-gray-700 dark:text-gray-300">
              <div className="flex-shrink-0 mt-1">
                <FiBell size={18} className="text-red-500" />
              </div>
              <div>
                <p className="text-sm">
                  You have a bug that needs...
                  <span className="block text-xs text-gray-400 mt-1">
                    12 hours ago
                  </span>
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3 text-gray-700 dark:text-gray-300">
              <div className="flex-shrink-0 mt-1">
                <FiCheckCircle size={18} className="text-green-500" />
              </div>
              <div>
                <p className="text-sm">
                  Released a new version
                  <span className="block text-xs text-gray-400 mt-1">
                    Submitted a bug
                  </span>
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3 text-gray-700 dark:text-gray-300">
              <div className="flex-shrink-0 mt-1">
                <FiFileText size={18} className="text-yellow-500" />
              </div>
              <div>
                <p className="text-sm">
                  Modified A data in Page X
                  <span className="block text-xs text-gray-400 mt-1">
                    Today, 11:59 AM
                  </span>
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3 text-gray-700 dark:text-gray-300">
              <div className="flex-shrink-0 mt-1">
                <FiTrash2 size={18} className="text-red-500" />
              </div>
              <div>
                <p className="text-sm">
                  Deleted a page in Project X
                  <span className="block text-xs text-gray-400 mt-1">
                    Feb 2, 2021
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
        <hr className="border-gray-200 dark:border-gray-700 my-4" />

        <div className="space-y-2">
          <h4 className="text-sm font-semibold text-gray-500 dark:text-gray-400">
            Contacts
          </h4>
          <div className="space-y-3">
            {['Natali Craig', 'Drew Cano', 'Orlando Diggs', 'Andi Lane', 'Kate Morrison', 'Koray Okumus'].map((name, index) => (
              <div key={index} className="flex items-center space-x-3 text-gray-700 dark:text-gray-300">
                <div className="flex-shrink-0">
                  <div className="h-8 w-8 rounded-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center text-xs font-semibold">
                    {name.split(' ').map(n => n[0]).join('')}
                  </div>
                </div>
                <p className="text-sm">{name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationBar;
