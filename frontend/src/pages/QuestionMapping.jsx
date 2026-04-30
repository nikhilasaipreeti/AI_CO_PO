import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  DocumentTextIcon,
  BeakerIcon,
  ArrowPathIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline';

const QuestionMapping = () => {
  const [questions, setQuestions] = useState([
    { id: 1, text: 'Explain the concept of variables in programming', co: 'CO1', bloomLevel: 'Understand' },
    { id: 2, text: 'Write a program to find the sum of two numbers', co: 'CO2', bloomLevel: 'Apply' },
    { id: 3, text: 'Analyze the time complexity of bubble sort', co: 'CO3', bloomLevel: 'Analyze' },
  ]);

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <div className="p-3 bg-purple-100 rounded-lg">
          <BeakerIcon className="h-8 w-8 text-purple-600" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Question-CO Mapping</h1>
          <p className="text-gray-600 mt-1">Map exam questions to Course Outcomes</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Question</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Mapped CO</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Bloom's Level</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {questions.map((q) => (
                <tr key={q.id}>
                  <td className="px-6 py-4 text-sm text-gray-800">{q.text}</td>
                  <td className="px-6 py-4">
                    <select className="px-3 py-1 border border-gray-300 rounded-lg">
                      <option>CO1</option>
                      <option>CO2</option>
                      <option>CO3</option>
                      <option>CO4</option>
                    </select>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-xs">
                      {q.bloomLevel}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button className="text-blue-600 hover:text-blue-800">Save</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default QuestionMapping;