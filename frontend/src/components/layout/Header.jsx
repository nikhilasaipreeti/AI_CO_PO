import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import {
  BellIcon,
  UserCircleIcon,
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
  SunIcon,
  MoonIcon
} from '@heroicons/react/24/outline';
import vignanLogo from '../../assets/images/vignan.jpeg';
import { useTheme } from '../../context/ThemeContext';

const Header = ({ sidebarOpen, setSidebarOpen }) => {
  const { user, logout } = useAuth();
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <header className={`h-16 flex items-center justify-between px-6 shadow-sm transition-colors duration-300 border-b-2 ${
      isDarkMode ? 'bg-gray-900 border-amber-900' : 'bg-white'
    }`} style={!isDarkMode ? { borderBottomColor: '#c8762a' } : {}}>

      {/* Left — toggle + logo */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 rounded-lg transition-colors"
          style={{ color: '#7c3a1e' }}
          onMouseEnter={e => e.currentTarget.style.background = '#fdf6ee'}
          onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
        >
          {sidebarOpen
            ? <ChevronDoubleLeftIcon className="h-5 w-5" />
            : <ChevronDoubleRightIcon className="h-5 w-5" />}
        </button>

        <Link to="/" className="flex items-center gap-2">
          <img src={vignanLogo} alt="Vignan" className="h-9 w-9 rounded-full object-cover border-2" style={{ borderColor: '#a0522d' }} />
          <div className="flex flex-col leading-tight">
            <span className="text-sm font-bold" style={{ color: '#7c3a1e' }}>VIGNAN'S</span>
            <span className="text-xs text-gray-400">OBE AI System</span>
          </div>
        </Link>

        <div className="hidden md:block h-6 w-px bg-gray-200 mx-1" />
        <h2 className="hidden md:block text-sm font-medium text-gray-600">
          Welcome, <span className="font-semibold" style={{ color: '#7c3a1e' }}>{user?.name || 'Faculty'}</span>
        </h2>
      </div>

      {/* Right — actions */}
      <div className="flex items-center gap-2">

        {/* Dark mode toggle */}
        <button
          onClick={toggleTheme}
          title={isDarkMode ? 'Light Mode' : 'Dark Mode'}
          className="p-2 rounded-full transition-colors"
          style={{ color: isDarkMode ? '#fcd34d' : '#7c3a1e' }}
          onMouseEnter={e => e.currentTarget.style.background = '#fdf6ee'}
          onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
        >
          {isDarkMode ? <SunIcon className="h-5 w-5" /> : <MoonIcon className="h-5 w-5" />}
        </button>

        {/* Notifications */}
        <button
          className="p-2 rounded-full relative transition-colors"
          style={{ color: '#7c3a1e' }}
          onMouseEnter={e => e.currentTarget.style.background = '#fdf6ee'}
          onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
        >
          <BellIcon className="h-5 w-5" />
          <span className="absolute top-1.5 right-1.5 h-2 w-2 bg-red-500 rounded-full border border-white"></span>
        </button>

        {/* User menu */}
        <div className="relative group">
          <button
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg transition-colors border"
            style={{ color: '#7c3a1e', borderColor: '#e8c9a0' }}
            onMouseEnter={e => e.currentTarget.style.background = '#fdf6ee'}
            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
          >
            <UserCircleIcon className="h-5 w-5" />
            <span className="text-sm font-medium hidden sm:block">{user?.name || 'Faculty'}</span>
          </button>

          {/* Dropdown */}
          <div className="absolute right-0 mt-2 w-48 rounded-xl shadow-lg border bg-white hidden group-hover:block z-50 overflow-hidden"
            style={{ borderColor: '#e8c9a0' }}>
            <Link to="/profile"
              className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-amber-50 transition-colors">
              👤 Profile
            </Link>
            <Link to="/settings"
              className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-amber-50 transition-colors">
              ⚙️ Settings
            </Link>
            <hr style={{ borderColor: '#e8c9a0' }} />
            <button
              onClick={logout}
              className="block w-full text-left px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition-colors"
            >
              🚪 Logout
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
