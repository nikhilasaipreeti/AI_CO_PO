import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowLeftIcon,
  AcademicCapIcon,
  DocumentTextIcon,
  ChartBarIcon,
  PencilSquareIcon,
  UserGroupIcon,
  ClockIcon,
  CalendarIcon,
  CheckCircleIcon,
  ExclamationCircleIcon,
  Cog6ToothIcon
} from '@heroicons/react/24/outline';
import Tabs from '../components/ui/Tabs';
import COList from '../components/course/COList';
import AssessmentList from '../components/assessment/AssessmentList';
import AttainmentChart from '../components/attainment/AttainmentChart';

const CourseDetails = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState('overview');

  // Mock course data
  const course = {
    id: 1,
    code: 'CS101',
    name: 'Introduction to Programming',
    department: 'Computer Science',
    semester: 1,
    credits: 4,
    faculty: 'Dr. John Smith',
    syllabus: 'This course introduces fundamental programming concepts including variables, control structures, functions, arrays, and basic object-oriented programming.',
    status: 'active',
    students: 65,
    createdAt: '2024-01-15',
    updatedAt: '2024-03-10',
    progress: 75,
    attainment: 72
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: DocumentTextIcon },
    { id: 'cos', label: 'Course Outcomes', icon: AcademicCapIcon },
    { id: 'assessments', label: 'Assessments', icon: PencilSquareIcon },
    { id: 'attainment', label: 'Attainment', icon: ChartBarIcon },
    { id: 'students', label: 'Students', icon: UserGroupIcon }
  ];

  const stats = [
    { label: 'Total COs', value: '4', icon: AcademicCapIcon, color: 'blue' },
    { label: 'Assessments', value: '3', icon: PencilSquareIcon, color: 'green' },
    { label: 'Students Enrolled', value: '65', icon: UserGroupIcon, color: 'purple' },
    { label: 'Attainment', value: '72%', icon: ChartBarIcon, color: 'orange' }
  ];

  return (
    <div className="space-y-6">
      {/* Header with Back Button */}
      <div className="flex items-center space-x-4">
        <Link
          to="/courses"
          className="p-2 bg-white rounded-lg shadow-sm hover:shadow-md transition-all"
        >
          <ArrowLeftIcon className="h-5 w-5 text-gray-600" />
        </Link>
        <div>
          <div className="flex items-center space-x-3">
            <h1 className="text-2xl font-bold text-gray-800">{course.code}: {course.name}</h1>
            <span className={`px-3 py-1 text-xs rounded-full bg-${course.status === 'active' ? 'green' : 'yellow'}-100 text-${course.status === 'active' ? 'green' : 'yellow'}-600`}>
              {course.status}
            </span>
          </div>
          <p className="text-gray-600 mt-1">Department of {course.department} • Semester {course.semester}</p>
        </div>
        
        <div className="ml-auto flex space-x-2">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all flex items-center">
            <PencilSquareIcon className="h-5 w-5 mr-2" />
            Edit Course
          </button>
          <button className="p-2 bg-white rounded-lg shadow-sm hover:shadow-md transition-all">
            <Cog6ToothIcon className="h-5 w-5 text-gray-600" />
          </button>
        </div>
      </div>

      {/* Course Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            className="bg-white rounded-xl shadow-md p-4"
          >
            <div className="flex items-center">
              <div className={`p-3 bg-${stat.color}-100 rounded-lg`}>
                <stat.icon className={`h-6 w-6 text-${stat.color}-600`} />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl shadow-md">
        <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />
        
        <div className="p-6">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Course Description</h3>
                <p className="text-gray-600">{course.syllabus}</p>
              </div>
              
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-medium text-gray-700 mb-3">Course Information</h4>
                  <dl className="space-y-2">
                    <div className="flex justify-between">
                      <dt className="text-gray-600">Course Code:</dt>
                      <dd className="font-medium text-gray-800">{course.code}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-gray-600">Credits:</dt>
                      <dd className="font-medium text-gray-800">{course.credits}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-gray-600">Faculty:</dt>
                      <dd className="font-medium text-gray-800">{course.faculty}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-gray-600">Department:</dt>
                      <dd className="font-medium text-gray-800">{course.department}</dd>
                    </div>
                  </dl>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-medium text-gray-700 mb-3">Timeline</h4>
                  <dl className="space-y-2">
                    <div className="flex justify-between">
                      <dt className="text-gray-600">Created:</dt>
                      <dd className="font-medium text-gray-800">{course.createdAt}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-gray-600">Last Updated:</dt>
                      <dd className="font-medium text-gray-800">{course.updatedAt}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-gray-600">Progress:</dt>
                      <dd className="font-medium text-gray-800">{course.progress}%</dd>
                    </div>
                  </dl>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-start">
                  <AcademicCapIcon className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div className="ml-3">
                    <h4 className="text-sm font-medium text-blue-800">Next Action Required</h4>
                    <p className="text-sm text-blue-700 mt-1">
                      Assessment T2 needs to be configured. Complete the exam setup to track student progress.
                    </p>
                    <button className="mt-2 text-sm text-blue-600 hover:text-blue-800 font-medium">
                      Configure Now →
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'cos' && (
            <COList courseId={id} />
          )}

          {activeTab === 'assessments' && (
            <AssessmentList courseId={id} />
          )}

          {activeTab === 'attainment' && (
            <div className="space-y-6">
              <AttainmentChart courseId={id} />
            </div>
          )}

          {activeTab === 'students' && (
            <div className="text-center py-12">
              <UserGroupIcon className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-700">Student List Coming Soon</h3>
              <p className="text-gray-500 mt-2">This feature will display enrolled students and their performance</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;