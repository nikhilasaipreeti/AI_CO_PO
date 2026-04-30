import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import { useTheme } from '../../context/ThemeContext';

const MainLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { isDarkMode } = useTheme();

  return (
    <div className={`flex h-screen transition-colors duration-300 ${isDarkMode ? 'bg-gray-900' : ''}`} style={!isDarkMode ? { background: '#fdf6ee' } : {}}>
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className={`flex-1 flex flex-col transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-20'}`}>
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <main className={`flex-1 overflow-y-auto p-6 transition-colors duration-300 ${isDarkMode ? 'bg-gray-900 text-gray-100' : 'text-gray-900'}`} style={!isDarkMode ? { background: '#fdf6ee' } : {}}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
