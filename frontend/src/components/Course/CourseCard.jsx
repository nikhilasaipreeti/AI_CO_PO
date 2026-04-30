import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  AcademicCapIcon,
  UserGroupIcon,
  ClockIcon,
  ChartBarIcon,
  ArrowTopRightOnSquareIcon
} from '@heroicons/react/24/outline';

const CourseCard = ({ course }) => {
  const {
    id,
    code,
    name,
    department,
    semester,
    credits,
    status,
    progress,
    faculty,
    students,
    cos,
    attainment,
    color = 'blue'
  } = course;

  const getStatusColor = (status) => {
    switch(status) {
      case 'active': return 'green';
      case 'in-progress': return 'yellow';
      case 'completed': return 'blue';
      case 'pending': return 'red';
      default: return 'gray';
    }
  };

  const statusColor = getStatusColor(status);

  return (
    <motion.div
      whileHover={{ y: -5, scale: 1.02 }}
      className="bg-white rounded-xl shadow-md overflow-hidden group cursor-pointer"
    >
      {/* Color Bar */}
      <div className={`h-2 bg-${color}-500`}></div>
      
      <div className="p-6">
        {/* Header */}
        <div className="flex justify-between items-start mb-4">
          <div>
            <div className="flex items-center space-x-2 mb-1">
              <h3 className="text-lg font-semibold text-gray-800">{code}</h3>
              <span className={`px-2 py-1 text-xs rounded-full bg-${statusColor}-100 text-${statusColor}-600`}>
                {status}
              </span>
            </div>
            <p className="text-sm text-gray-600">{name}</p>
          </div>
          <Link
            to={`/courses/${id}`}
            className="p-2 hover:bg-gray-100 rounded-lg transition-all opacity-0 group-hover:opacity-100"
          >
            <ArrowTopRightOnSquareIcon className="h-5 w-5 text-gray-400" />
          </Link>
        </div>

        {/* Course Details */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="flex items-center text-sm text-gray-600">
            <AcademicCapIcon className="h-4 w-4 mr-1 text-gray-400" />
            <span>Sem {semester}</span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <UserGroupIcon className="h-4 w-4 mr-1 text-gray-400" />
            <span>{students} Students</span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <ClockIcon className="h-4 w-4 mr-1 text-gray-400" />
            <span>{credits} Credits</span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <ChartBarIcon className="h-4 w-4 mr-1 text-gray-400" />
            <span>{cos} COs</span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-4">
          <div className="flex justify-between text-xs mb-1">
            <span className="text-gray-600">Progress</span>
            <span className="font-medium text-gray-700">{progress}%</span>
          </div>
          <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className={`h-full bg-${color}-500 rounded-full transition-all duration-500`}
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-between items-center pt-3 border-t border-gray-100">
          <div>
            <p className="text-xs text-gray-500">Faculty</p>
            <p className="text-sm font-medium text-gray-700">{faculty}</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-gray-500">Attainment</p>
            <p className={`text-lg font-bold text-${attainment >= 70 ? 'green' : attainment >= 60 ? 'yellow' : 'orange'}-600`}>
              {attainment}%
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CourseCard;