import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeftIcon, AcademicCapIcon, ClockIcon, UserGroupIcon } from '@heroicons/react/24/outline';

const CourseDetails = () => {
  const { id } = useParams();
  const course = {
    id: 1,
    code: 'CS101',
    name: 'Introduction to Programming',
    description: 'This course introduces fundamental programming concepts.',
    department: 'Computer Science',
    semester: 1,
    credits: 4,
    faculty: 'Dr. John Smith',
    students: 65
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <Link to="/courses" className="p-2 bg-white rounded-lg shadow-sm">
          <ArrowLeftIcon className="h-5 w-5 text-gray-600" />
        </Link>
        <h1 className="text-2xl font-bold text-gray-800">{course.code}: {course.name}</h1>
      </div>
      <div className="bg-white rounded-xl shadow-md p-6">
        <p>{course.description}</p>
      </div>
    </div>
  );
};

export default CourseDetails;
