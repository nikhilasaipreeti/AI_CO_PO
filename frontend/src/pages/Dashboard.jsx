import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  AcademicCapIcon, 
  DocumentTextIcon, 
  ChartBarIcon, 
  ChatBubbleLeftRightIcon,
  ArrowPathIcon,
  BellIcon,
  CalendarIcon,
  ClockIcon,
  UserGroupIcon,
  CheckCircleIcon,
  BookOpenIcon,
  PencilSquareIcon
} from '@heroicons/react/24/outline';
import { useCourses } from '../hooks/useCourses';

const Dashboard = () => {
  const { courses, loading } = useCourses();
  const [stats, setStats] = useState({
    totalCourses: 0,
    activeCourses: 0,
    completedAttainments: 0,
    pendingMappings: 0,
    totalStudents: 1250,
    averageAttainment: 72.5
  });

  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: 'CO Generation Complete',
      message: 'CS101 Course Outcomes generated successfully',
      time: '5 min ago',
      read: false,
      icon: CheckCircleIcon,
      color: 'green'
    },
    {
      id: 2,
      title: 'Marks Upload Required',
      message: 'T1 examination marks pending for CS201',
      time: '2 hours ago',
      read: false,
      icon: DocumentTextIcon,
      color: 'yellow'
    },
    {
      id: 3,
      title: 'Attainment Calculated',
      message: 'CO attainment for CS301 is ready',
      time: '1 day ago',
      read: true,
      icon: ChartBarIcon,
      color: 'blue'
    }
  ]);

  const recentCourses = [
    {
      id: 1,
      code: 'CS101',
      name: 'Intro to Programming',
      progress: 75,
      status: 'active',
      color: 'blue'
    },
    {
      id: 2,
      code: 'CS201',
      name: 'Data Structures',
      progress: 45,
      status: 'in-progress',
      color: 'purple'
    },
    {
      id: 3,
      code: 'CS301',
      name: 'Database Systems',
      progress: 90,
      status: 'completed',
      color: 'green'
    },
    {
      id: 4,
      code: 'CS401',
      name: 'Algorithm Design',
      progress: 30,
      status: 'pending',
      color: 'yellow'
    }
  ];

  useEffect(() => {
    if (courses && courses.length > 0) {
      const active = courses.filter(c => c.status === 'active').length;
      const completed = courses.filter(c => c.attainmentCalculated).length;
      const pending = courses.filter(c => !c.mappingCompleted).length;
      
      setStats(prev => ({
        ...prev,
        totalCourses: courses.length,
        activeCourses: active,
        completedAttainments: completed,
        pendingMappings: pending
      }));
    }
  }, [courses]);

  const markAsRead = (id) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    ));
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'active': return 'bg-green-100 text-green-600';
      case 'in-progress': return 'bg-yellow-100 text-yellow-600';
      case 'completed': return 'bg-blue-100 text-blue-600';
      case 'pending': return 'bg-red-100 text-red-600';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  const getProgressColor = (color) => {
    switch(color) {
      case 'blue': return 'bg-blue-500';
      case 'purple': return 'bg-purple-500';
      case 'green': return 'bg-green-500';
      case 'yellow': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  const getIconColor = (color) => {
    switch(color) {
      case 'blue': return 'text-blue-600 bg-blue-100';
      case 'green': return 'text-green-600 bg-green-100';
      case 'purple': return 'text-purple-600 bg-purple-100';
      case 'yellow': return 'text-yellow-600 bg-yellow-100';
      case 'red': return 'text-red-600 bg-red-100';
      case 'indigo': return 'text-indigo-600 bg-indigo-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getBarColor = (color) => {
    switch(color) {
      case 'blue': return 'bg-blue-500';
      case 'purple': return 'bg-purple-500';
      case 'green': return 'bg-green-500';
      case 'yellow': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  const StatCard = ({ title, value, icon: Icon, color, trend }) => {
    const iconColorClass = getIconColor(color);
    const trendColor = trend?.startsWith('+') ? 'text-green-600' : 'text-red-600';
    
    return (
      <motion.div
        whileHover={{ y: -5, scale: 1.02 }}
        className="bg-white rounded-xl shadow-md p-6"
      >
        <div className="flex items-center justify-between mb-4">
          <div className={`p-3 rounded-lg ${iconColorClass}`}>
            <Icon className="h-6 w-6" />
          </div>
          {trend && (
            <span className={`text-sm font-medium ${trendColor}`}>
              {trend}
            </span>
          )}
        </div>
        <h3 className="text-2xl font-bold text-gray-800">{value}</h3>
        <p className="text-sm text-gray-600">{title}</p>
      </motion.div>
    );
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
          <p className="text-gray-600 mt-1">Welcome back, Dr. John Smith!</p>
        </div>
        
        <div className="flex items-center space-x-4">
          <button className="relative p-2 bg-white rounded-lg shadow-sm hover:shadow-md transition-all">
            <BellIcon className="h-6 w-6 text-gray-600" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 h-5 w-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </button>
          
          <button className="flex items-center px-4 py-2 bg-white rounded-lg shadow-sm hover:shadow-md transition-all">
            <ArrowPathIcon className="h-5 w-5 text-gray-600 mr-2" />
            <span className="text-gray-700">Refresh</span>
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <StatCard title="Total Courses" value={stats.totalCourses} icon={AcademicCapIcon} color="blue" trend="+12%" />
        <StatCard title="Active Courses" value={stats.activeCourses} icon={BookOpenIcon} color="green" trend="+5%" />
        <StatCard title="Completed Attainments" value={stats.completedAttainments} icon={ChartBarIcon} color="purple" trend="+8%" />
        <StatCard title="Pending Mappings" value={stats.pendingMappings} icon={PencilSquareIcon} color="yellow" trend="-3%" />
        <StatCard title="Total Students" value={stats.totalStudents} icon={UserGroupIcon} color="red" trend="+15%" />
        <StatCard title="Avg. Attainment" value={`${stats.averageAttainment}%`} icon={CheckCircleIcon} color="indigo" trend="+2%" />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Recent Courses */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold text-gray-800">Recent Courses</h2>
              <Link to="/courses" className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                View All →
              </Link>
            </div>
            
            <div className="space-y-4">
              {recentCourses.map((course) => (
                <motion.div
                  key={course.id}
                  whileHover={{ scale: 1.02 }}
                  className="flex items-center p-4 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-all"
                >
                  <div className={`w-1 h-12 rounded-full mr-4 ${getBarColor(course.color)}`}></div>
                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-2">
                      <div>
                        <h3 className="font-semibold text-gray-800">{course.code}</h3>
                        <p className="text-sm text-gray-600">{course.name}</p>
                      </div>
                      <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(course.status)}`}>
                        {course.status}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <div className="flex-1 h-2 bg-gray-200 rounded-full mr-4">
                        <div 
                          className={`h-2 rounded-full ${getProgressColor(course.color)}`} 
                          style={{ width: `${course.progress}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium text-gray-700">{course.progress}%</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Link 
                to="/generate-co" 
                className="p-4 bg-blue-50 rounded-lg text-center hover:bg-blue-100 transition-all group"
              >
                <AcademicCapIcon className="h-6 w-6 text-blue-600 mx-auto mb-2 group-hover:scale-110 transition-transform" />
                <span className="text-sm text-gray-700">Generate COs</span>
              </Link>
              <Link 
                to="/assessments" 
                className="p-4 bg-purple-50 rounded-lg text-center hover:bg-purple-100 transition-all group"
              >
                <DocumentTextIcon className="h-6 w-6 text-purple-600 mx-auto mb-2 group-hover:scale-110 transition-transform" />
                <span className="text-sm text-gray-700">Configure Exam</span>
              </Link>
              <Link 
                to="/marks-entry" 
                className="p-4 bg-green-50 rounded-lg text-center hover:bg-green-100 transition-all group"
              >
                <PencilSquareIcon className="h-6 w-6 text-green-600 mx-auto mb-2 group-hover:scale-110 transition-transform" />
                <span className="text-sm text-gray-700">Upload Marks</span>
              </Link>
              <Link 
                to="/chatbot" 
                className="p-4 bg-orange-50 rounded-lg text-center hover:bg-orange-100 transition-all group"
              >
                <ChatBubbleLeftRightIcon className="h-6 w-6 text-orange-600 mx-auto mb-2 group-hover:scale-110 transition-transform" />
                <span className="text-sm text-gray-700">AI Assistant</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Right Column - Notifications & Calendar */}
        <div className="space-y-6">
          {/* Notifications */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <BellIcon className="h-5 w-5 mr-2 text-blue-600" />
              Recent Notifications
            </h2>
            <div className="space-y-3">
              {notifications.length > 0 ? (
                notifications.map((notification) => {
                  const bgColor = notification.read ? 'bg-gray-50' : 'bg-blue-50 border-l-4 border-blue-500';
                  const iconColor = getIconColor(notification.color);
                  
                  return (
                    <motion.div
                      key={notification.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className={`p-3 rounded-lg cursor-pointer transition-all ${bgColor}`}
                      onClick={() => markAsRead(notification.id)}
                    >
                      <div className="flex items-start">
                        <div className={`flex-shrink-0 p-1 rounded-full ${iconColor}`}>
                          <notification.icon className="h-5 w-5" />
                        </div>
                        <div className="ml-3 flex-1">
                          <p className={`text-sm font-medium ${notification.read ? 'text-gray-700' : 'text-gray-900'}`}>
                            {notification.title}
                          </p>
                          <p className="text-xs text-gray-500 mt-1">{notification.message}</p>
                          <div className="flex items-center mt-2">
                            <ClockIcon className="h-3 w-3 text-gray-400 mr-1" />
                            <p className="text-xs text-gray-400">{notification.time}</p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })
              ) : (
                <p className="text-center text-gray-500 py-4">No new notifications</p>
              )}
            </div>
          </div>

          {/* Upcoming Events */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <CalendarIcon className="h-5 w-5 mr-2 text-purple-600" />
              Upcoming Events
            </h2>
            <div className="space-y-3">
              <div className="flex items-center p-2 hover:bg-gray-50 rounded-lg transition-all">
                <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <span className="text-sm font-bold text-blue-600">T1</span>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">CS101 - T1 Exam</p>
                  <p className="text-xs text-gray-500">Tomorrow, 10:00 AM</p>
                </div>
              </div>
              <div className="flex items-center p-2 hover:bg-gray-50 rounded-lg transition-all">
                <div className="flex-shrink-0 w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <span className="text-sm font-bold text-green-600">T2</span>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">CS201 - T2 Exam</p>
                  <p className="text-xs text-gray-500">Mar 20, 2026</p>
                </div>
              </div>
              <div className="flex items-center p-2 hover:bg-gray-50 rounded-lg transition-all">
                <div className="flex-shrink-0 w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <span className="text-sm font-bold text-purple-600">FIN</span>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">Final Exam Week</p>
                  <p className="text-xs text-gray-500">Apr 10-20, 2026</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;