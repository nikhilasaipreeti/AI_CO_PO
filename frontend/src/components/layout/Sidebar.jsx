import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  HomeIcon,
  AcademicCapIcon,
  ClipboardDocumentListIcon,
  ChartBarIcon,
  DocumentTextIcon,
  ChatBubbleLeftRightIcon,
  Cog6ToothIcon,
  UserGroupIcon,
  BeakerIcon
} from '@heroicons/react/24/outline';
import vignanLogo from '../../assets/images/vignan.jpeg';

const Sidebar = ({ sidebarOpen }) => {
  const menuItems = [
    { path: '/dashboard',    name: 'Dashboard',    icon: HomeIcon },
    { path: '/courses',      name: 'Courses',      icon: AcademicCapIcon },
    { path: '/generate-co',  name: 'Generate CO',  icon: BeakerIcon },
    { path: '/assessments',  name: 'Assessments',  icon: ClipboardDocumentListIcon },
    { path: '/marks-entry',  name: 'Marks Entry',  icon: DocumentTextIcon },
    { path: '/attainment',   name: 'Attainment',   icon: ChartBarIcon },
    { path: '/reports',      name: 'Reports',      icon: DocumentTextIcon },
    { path: '/chatbot',      name: 'AI Chat',      icon: ChatBubbleLeftRightIcon },
    { path: '/profile',      name: 'Profile',      icon: UserGroupIcon },
    { path: '/settings',     name: 'Settings',     icon: Cog6ToothIcon },
  ];

  return (
    <div
      className={`fixed left-0 top-0 h-full shadow-lg transition-all duration-300 z-10 flex flex-col ${sidebarOpen ? 'w-64' : 'w-20'}`}
      style={{ background: 'linear-gradient(180deg, #3d1a0a 0%, #5c2a0e 60%, #7c3a1e 100%)' }}
    >
      {/* Logo */}
      <div className="flex items-center justify-center h-16 border-b" style={{ borderBottomColor: '#5c2a0e' }}>
        {sidebarOpen ? (
          <div className="flex items-center gap-2 px-3">
            <img src={vignanLogo} alt="Vignan" className="h-10 w-10 rounded-full object-cover border-2 border-yellow-400" />
            <div className="flex flex-col leading-tight">
              <span className="text-sm font-bold text-yellow-300">VIGNAN'S</span>
              <span className="text-xs" style={{ color: '#c9a07a' }}>UNIVERSITY</span>
            </div>
          </div>
        ) : (
          <img src={vignanLogo} alt="V" className="h-10 w-10 rounded-full object-cover border-2 border-yellow-400" />
        )}
      </div>

      {/* Nav Items */}
      <nav className="flex-1 p-3 overflow-y-auto">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center p-3 mb-1 rounded-lg transition-all ${
                isActive
                  ? 'text-white shadow-md'
                  : 'hover:bg-white hover:bg-opacity-10'
              }`
            }
            style={({ isActive }) => isActive
              ? { background: 'linear-gradient(90deg, #c8762a, #a0522d)', color: 'white' }
              : { color: '#e8c9a0' }
            }
          >
            <item.icon className="h-5 w-5 min-w-[20px]" />
            {sidebarOpen && <span className="ml-3 text-sm font-medium">{item.name}</span>}
          </NavLink>
        ))}
      </nav>

      {/* Bottom label */}
      {sidebarOpen && (
        <div className="p-4 border-t text-center" style={{ borderTopColor: '#5c2a0e' }}>
          <p className="text-xs" style={{ color: '#c9a07a' }}>OBE AI System v1.0</p>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
