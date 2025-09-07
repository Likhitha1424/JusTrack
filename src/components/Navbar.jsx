import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleFavorite } from '../features/favoriteSlice';
import {
  FiGrid,
  FiStar,
  FiSearch,
  FiSun,
  FiMoon,
  FiBell,
  FiRefreshCcw,
  FiMenu,
} from 'react-icons/fi';
import NotificationBar from './NotificationBar';

export default function Navbar({
  sidebarOpen,
  setSidebarOpen,
  darkMode,
  setDarkMode,
}) {
  const dispatch = useDispatch();
  const [notificationBarOpen, setNotificationBarOpen] = useState(false);

  const favorites = useSelector((state) => state.favorites.items);
  const activeItem = useSelector((state) => state.navigation.activeItem);
  const isFavorited = favorites.some((fav) => fav.id === activeItem.id);

  const handleToggleFavorite = () => {
    if (activeItem && activeItem.id) {
      dispatch(toggleFavorite(activeItem));
    }
  };

  const handleToggleNotificationBar = () => {
    setNotificationBarOpen(!notificationBarOpen);
  };

  return (
    <>
      <nav className="flex flex-wrap items-center justify-between px-4 py-3 border-b border-gray-300 bg-white dark:border-gray-700 dark:bg-black text-gray-700 dark:text-gray-300">
        <div className="flex items-center space-x-4">
          <FiGrid size={20} className="text-gray-500" />
          <button
            onClick={handleToggleFavorite}
            aria-label={isFavorited ? 'Remove from favorites' : 'Add to favorites'}
            className="p-1 rounded-full text-gray-500 hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            <FiStar
              size={20}
              className={`${isFavorited ? 'text-yellow-500' : 'text-gray-400'}`}
              fill={isFavorited ? 'currentColor' : 'none'}
            />
          </button>
          <nav className="flex items-center space-x-1 text-sm">
            <span className="text-gray-400">Dashboards</span>
            <span>/</span>
            <span className="font-semibold dark:text-white">
              {activeItem.title || 'Default'}
            </span>
          </nav>
        </div>

        <div className="flex items-center space-x-4">
          <div className="relative w-full max-w-xs sm:w-64">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500" />
            <input
              type="search"
              placeholder="Search"
              className="w-full pl-10 pr-16 py-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400 select-none pointer-events-none">
              ⌘ /
            </div>
          </div>

          <button
            onClick={() => setDarkMode(!darkMode)}
            aria-label="Toggle dark/light mode"
            className="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            {darkMode ? <FiSun size={18} /> : <FiMoon size={18} />}
          </button>

          <button
            aria-label="Refresh"
            className="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            <FiRefreshCcw size={18} />
          </button>

          <button
            onClick={handleToggleNotificationBar}
            aria-label="Notifications"
            className="relative p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            <FiBell size={18} />
            <span className="absolute top-0 right-0 text-xs font-bold bg-red-600 text-white rounded-full px-1.5 leading-none">
              3
            </span>
          </button>

          <button
            aria-label="Toggle sidebar"
            className="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700 lg:hidden"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <FiMenu size={18} />
          </button>
        </div>
      </nav>

      <NotificationBar
        isOpen={notificationBarOpen}
        onClose={handleToggleNotificationBar}
      />
    </>
  );
}
