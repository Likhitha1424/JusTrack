import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleFavorite } from '../features/favoriteSlice';
import { setActiveItem } from '../features/navigationSlice';
import {
  FiPieChart, FiShoppingCart, FiFolder, FiBookOpen, FiFileText,
  FiUser, FiBriefcase, FiUsers, FiMenu, FiStar, FiChevronDown, FiChevronUp,
} from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const iconMap = {
  FiPieChart, FiShoppingCart, FiFolder, FiBookOpen, FiFileText,
  FiUser, FiBriefcase, FiUsers,
};

const menuItems = [
  {
    title: 'Dashboards',
    icon: FiPieChart,
    subItems: [
      { id: 'default', title: 'Default', icon: FiPieChart, iconName: 'FiPieChart' },
      { id: 'ecommerce', title: 'eCommerce', icon: FiShoppingCart, iconName: 'FiShoppingCart' },
      { id: 'projects_dash', title: 'Projects', icon: FiFolder, iconName: 'FiFolder' },
      { id: 'courses', title: 'Online Courses', icon: FiBookOpen, iconName: 'FiBookOpen' },
    ],
  },
  {
    title: 'Pages',
    icon: FiFileText,
    subItems: [
      { id: 'userProfile', title: 'User Profile', icon: FiUser, iconName: 'FiUser' },
      { id: 'overview', title: 'Overview', icon: FiPieChart, iconName: 'FiPieChart' },
      { id: 'projects_pages', title: 'Projects', icon: FiFolder, iconName: 'FiFolder' },
      { id: 'campaigns', title: 'Campaigns', icon: FiBriefcase, iconName: 'FiBriefcase' },
      { id: 'documents', title: 'Documents', icon: FiFileText, iconName: 'FiFileText' },
      { id: 'followers', title: 'Followers', icon: FiUsers, iconName: 'FiUsers' },
    ],
  },
  { id: 'account', title: 'Account', icon: FiUser, iconName: 'FiUser' },
  { id: 'corporate', title: 'Corporate', icon: FiBriefcase, iconName: 'FiBriefcase' },
  { id: 'blog', title: 'Blog', icon: FiFileText, iconName: 'FiFileText' },
  { id: 'social', title: 'Social', icon: FiUsers, iconName: 'FiUsers' },
];

export default function Sidebar({ sidebarOpen, setSidebarOpen }) {
  const navigate = useNavigate();
  const [expandedMenus, setExpandedMenus] = useState({ Dashboards: true, Pages: false });
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites.items);
  const activeItem = useSelector((state) => state.navigation.activeItem);

  const handleNavigation = (path) => {
    navigate(path);
    setSidebarOpen(false);
  };

  const handleSetActiveItem = (item) => {
    dispatch(setActiveItem(item));
    const pathMap = {
      default: '/default',
      ecommerce: '/ecommerce',
      projects_dash: '/projects',
      projects_pages: '/projects',
      userProfile: '/user-profile',
      overview: '/overview',
      campaigns: '/campaigns',
      documents: '/documents',
      followers: '/followers',
      account: '/account',
      corporate: '/corporate',
      blog: '/blog',
      social: '/social',
    };
    const path = pathMap[item.id] || '/';
    navigate(path);
  };

  const handleToggleFavorite = (item) => {
    dispatch(toggleFavorite(item));
  };

  const isActive = (item) => activeItem.id === item.id;

  const sectionsWithSubItems = menuItems.filter(item => item.subItems);
  const singleItems = menuItems.filter(item => !item.subItems);

  return (
    <>
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-20 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-30 w-64 bg-white dark:bg-black border-r border-gray-200 dark:border-gray-700 transform transition-transform duration-300 ease-in-out ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          } lg:translate-x-0 lg:static lg:inset-auto flex flex-col`}
        aria-label="Sidebar navigation"
      >
        <div className="flex items-center justify-between px-4 py-4 border-b border-gray-300 dark:border-gray-700 shrink-0">
          <h1 className="text-lg font-bold tracking-widest dark:text-gray-200 cursor-default select-none">ByeWind</h1>
          <button
            className="lg:hidden p-2 text-gray-600 dark:text-gray-300 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            onClick={() => setSidebarOpen(false)}
            aria-label="Close sidebar"
          >
            <FiMenu size={20} />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-4 py-6 text-gray-600 dark:text-gray-400 select-none">
          <section className="mb-6">
            <h2 className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-400 dark:text-gray-500">Favorites</h2>
            <ul>
              {favorites.length > 0 ? (
                favorites.map((item) => {
                  const Icon = iconMap[item.iconName];
                  return (
                    <li
                      key={item.id}
                      onClick={() => handleSetActiveItem(item)}
                      className={`relative flex justify-between items-center cursor-pointer rounded-md px-3 py-1.5 text-sm font-medium hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors ${isActive(item) ? 'bg-gray-200 dark:bg-gray-800 font-semibold text-gray-900 dark:text-white' : ''
                        }`}
                      tabIndex={0}
                    >
                      <span className="flex items-center space-x-2">
                        {Icon && <Icon size={16} />}
                        <span>{item.title}</span>
                      </span>
                      {isActive(item) && <span className="absolute left-0 top-0 bottom-0 w-1 bg-blue-600 rounded-r" />}
                    </li>
                  );
                })
              ) : (
                <li className="px-3 py-1.5 text-sm text-gray-400 italic">No favorites yet.</li>
              )}
            </ul>
          </section>

          {sectionsWithSubItems.map((menu) => {
            const isExpanded = expandedMenus[menu.title];
            return (
              <section key={menu.title} className="mb-6">
                <h2 className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-400 dark:text-gray-500">{menu.title}</h2>
                <div>
                  <button
                    onClick={() => setExpandedMenus(prev => ({ ...prev, [menu.title]: !prev[menu.title] }))}
                    className="flex items-center justify-between w-full px-3 py-1.5 font-semibold rounded-md text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
                    aria-expanded={isExpanded}
                  >
                    <span className="flex items-center space-x-2">
                      <menu.icon size={18} />
                      <span>{menu.title}</span>
                    </span>
                    {isExpanded ? <FiChevronUp /> : <FiChevronDown />}
                  </button>

                  {isExpanded && (
                    <ul className="mt-1 ml-2 space-y-1">
                      {menu.subItems.map((subItem) => {
                        const isFavorited = favorites.some((fav) => fav.id === subItem.id);
                        return (
                          <li
                            key={subItem.id}
                            onClick={() => handleSetActiveItem(subItem)}
                            className={`relative group flex justify-between items-center cursor-pointer rounded-md pl-3 pr-2 py-1.5 text-sm font-medium hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors ${isActive(subItem) ? 'bg-gray-200 dark:bg-gray-800 font-semibold text-gray-900 dark:text-white' : 'text-gray-600 dark:text-gray-400'
                              }`}
                          >
                            <span className="flex items-center space-x-2">
                              {isActive(subItem) && <span className="absolute left-0 top-0 bottom-0 w-1 bg-blue-600 rounded-r" />}
                              <subItem.icon size={16} />
                              <span>{subItem.title}</span>
                            </span>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleToggleFavorite(subItem);
                              }}
                              className={`p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity ${isFavorited ? 'text-yellow-500 opacity-100' : 'text-gray-400 hover:text-yellow-400'}`}
                              aria-label={isFavorited ? 'Remove from favorites' : 'Add to favorites'}
                            >
                              <FiStar size={14} fill={isFavorited ? 'currentColor' : 'none'} />
                            </button>
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </div>
              </section>
            );
          })}

          <section>
            <h2 className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-400 dark:text-gray-500">Account</h2>
            <ul>
              {singleItems.map((item) => {
                const isFavorited = favorites.some((fav) => fav.id === item.id);
                return (
                  <li
                    key={item.id}
                    onClick={() => handleSetActiveItem(item)}
                    className={`relative group flex justify-between items-center space-x-2 rounded-md px-3 py-1.5 text-sm font-medium hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors ${isActive(item) ? 'bg-gray-200 dark:bg-gray-800 font-semibold text-gray-900 dark:text-white' : 'text-gray-600 dark:text-gray-400'
                      }`}
                  >
                    {isActive(item) && <span className="absolute left-0 top-0 bottom-0 w-1 bg-blue-600 rounded-r" />}
                    <span className="flex items-center space-x-2">
                      <item.icon size={16} />
                      <span>{item.title}</span>
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleToggleFavorite(item);
                      }}
                      className={`p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity ${isFavorited ? 'text-yellow-500 opacity-100' : 'text-gray-400 hover:text-yellow-400'}`}
                      aria-label={isFavorited ? 'Remove from favorites' : 'Add to favorites'}
                    >
                      <FiStar size={14} fill={isFavorited ? 'currentColor' : 'none'} />
                    </button>
                  </li>
                );
              })}
            </ul>
          </section>
        </nav>
      </aside>
    </>
  );
}
