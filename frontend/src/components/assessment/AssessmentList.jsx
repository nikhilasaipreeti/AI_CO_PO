import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  DocumentTextIcon,
  CalendarIcon,
  ClockIcon,
  CheckCircleIcon,
  ArrowTopRightOnSquareIcon,
  PencilSquareIcon,
  ChartBarIcon
} from '@heroicons/react/24/outline';

const AssessmentList = ({ courseId }) => {
  const [assessments, setAssessments] = useState([
    {
      id: 1,
      name: 'T1 Examination',
      type: 'Formative',
      date: '2024-03-15',
      duration: 60,
      totalMarks: 30,
      questions: 3,
      status: 'completed',
      submissions: 65,
      averageScore: 78
    },
    {
      id: 2,
      name: 'T2 Examination',
      type: 'Formative',
      date: '2024-04-15',
      duration: 60,
      totalMarks: 30,
      questions: 3,
      status: 'pending',
      submissions: 0,
      averageScore: 0
    },
    {
      id: 3,
      name: 'Mid Term Examination',
      type: 'Summative',
      date: '2024-03-20',
      duration: 120,
      totalMarks: 50,
      questions: 5,
      status: 'in-progress',
      submissions: 42,
      averageScore: 65
    }
  ]);

  const getStatusColor = (status) => {
    switch(status) {
      case 'completed': return 'green';
      case 'in-progress': return 'yellow';
      case 'pending': return 'red';
      default: return 'gray';
    }
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case 'completed': return CheckCircleIcon;
      case 'in-progress': return ClockIcon;
      default: return DocumentTextIcon;
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-800">Assessments</h3>
        <Link
          to="/assessments/new"
          className="flex items-center px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all text-sm"
        >
          <PencilSquareIcon className="h-4 w-4 mr-1" />
          New Assessment
        </Link>
      </div>

      <div className="space-y-3">
        {assessments.map((assessment, index) => {
          const StatusIcon = getStatusIcon(assessment.status);
          const statusColor = getStatusColor(assessment.status);

          return (
            <motion.div
              key={assessment.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h4 className="font-semibold text-gray-800">{assessment.name}</h4>
                    <span className={`px-2 py-1 text-xs rounded-full bg-${statusColor}-100 text-${statusColor}-600`}>
                      {assessment.status}
                    </span>
                    <span className="px-2 py-1 bg-blue-100 text-blue-600 rounded-full text-xs">
                      {assessment.type}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-3">
                    <div>
                      <p className="text-xs text-gray-500">Date</p>
                      <div className="flex items-center mt-1">
                        <CalendarIcon className="h-4 w-4 text-gray-400 mr-1" />
                        <p className="text-sm text-gray-700">{assessment.date}</p>
                      </div>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Duration</p>
                      <div className="flex items-center mt-1">
                        <ClockIcon className="h-4 w-4 text-gray-400 mr-1" />
                        <p className="text-sm text-gray-700">{assessment.duration} mins</p>
                      </div>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Total Marks</p>
                      <p className="text-sm font-medium text-gray-700 mt-1">{assessment.totalMarks}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Questions</p>
                      <p className="text-sm font-medium text-gray-700 mt-1">{assessment.questions}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Submissions</p>
                      <p className="text-sm font-medium text-gray-700 mt-1">{assessment.submissions}</p>
                    </div>
                  </div>

                  {assessment.status === 'completed' && (
                    <div className="mt-3 flex items-center">
                      <ChartBarIcon className="h-4 w-4 text-green-500 mr-1" />
                      <span className="text-sm text-gray-600">
                        Average Score: <span className="font-medium text-green-600">{assessment.averageScore}%</span>
                      </span>
                    </div>
                  )}
                </div>

                <Link
                  to={`/assessments/${assessment.id}`}
                  className="ml-4 p-2 hover:bg-gray-100 rounded-lg transition-all"
                >
                  <ArrowTopRightOnSquareIcon className="h-5 w-5 text-gray-400" />
                </Link>
              </div>
            </motion.div>
          );
        })}
      </div>

      {assessments.length === 0 && (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <DocumentTextIcon className="h-12 w-12 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500">No assessments found for this course</p>
          <Link
            to="/assessments/new"
            className="inline-block mt-3 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm"
          >
            Create First Assessment
          </Link>
        </div>
      )}
    </div>
  );
};

export default AssessmentList;