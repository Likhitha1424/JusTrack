import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { fetchDashboardData } from './features/dashboardSlice';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import Projects from './pages/Projects';
import UnderDevelopment from './pages/UnderDevelopment';
import NotificationBar from './components/NotificationBar';

const pageComponents = {
  projects: <Projects />,
  default: <UnderDevelopment title="Default" />,
  ecommerce: <UnderDevelopment title="eCommerce" />,
  userProfile: <UnderDevelopment title="User Profile" />,
  overview: <UnderDevelopment title="Overview" />,
  projects_pages: <Projects />,
  campaigns: <UnderDevelopment title="Campaigns" />,
  documents: <UnderDevelopment title="Documents" />,
  followers: <UnderDevelopment title="Followers" />,
  account: <UnderDevelopment title="Account" />,
  corporate: <UnderDevelopment title="Corporate" />,
  blog: <UnderDevelopment title="Blog" />,
  social: <UnderDevelopment title="Social" />,
};

function App() {
  const dispatch = useDispatch();

  const [darkMode, setDarkMode] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchDashboardData());
  }, [dispatch]);

  useEffect(() => {
    if (darkMode) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  }, [darkMode]);

  return (
    <Router>
      <div className="flex h-screen text-gray-300 bg-gray-900 dark:bg-black dark:text-gray-300">
        <Sidebar
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          darkMode={darkMode}
        />

        <div className="flex flex-col flex-1 overflow-hidden">
          <Navbar
            sidebarOpen={sidebarOpen}
            setSidebarOpen={setSidebarOpen}
            darkMode={darkMode}
            setDarkMode={setDarkMode}
            notificationsOpen={notificationsOpen}
            setNotificationsOpen={setNotificationsOpen}
          />

          <main className="flex overflow-auto p-6 space-x-6 bg-white dark:bg-black">
            <div className="flex-1">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/ecommerce" element={<UnderDevelopment title="eCommerce" />} />
                <Route path="/user-profile" element={<UnderDevelopment title="User Profile" />} />
                <Route path="/overview" element={<Dashboard />} />
                <Route path="/campaigns" element={<UnderDevelopment title="Campaigns" />} />
                <Route path="/documents" element={<UnderDevelopment title="Documents" />} />
                <Route path="/followers" element={<UnderDevelopment title="Followers" />} />
                <Route path="/account" element={<UnderDevelopment title="Account" />} />
                <Route path="/corporate" element={<UnderDevelopment title="Corporate" />} />
                <Route path="/blog" element={<UnderDevelopment title="Blog" />} />
                <Route path="/social" element={<UnderDevelopment title="Social" />} />
                <Route path="*" element={<UnderDevelopment title="Page Not Found" />} />
              </Routes>
            </div>

            {notificationsOpen && (
              <NotificationBar setNotificationsOpen={setNotificationsOpen} />
            )}
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;
