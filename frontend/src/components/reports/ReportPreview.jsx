import React from 'react';
import { motion } from 'framer-motion';
import {
  XMarkIcon,
  DocumentTextIcon,
  AcademicCapIcon,
  ChartBarIcon,
  TableCellsIcon,
  ArrowDownTrayIcon
} from '@heroicons/react/24/outline';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';

const ReportPreview = ({ reportType, onClose, onDownload }) => {
  const coData = [
    { name: 'CO1', attainment: 68 },
    { name: 'CO2', attainment: 74 },
    { name: 'CO3', attainment: 55 },
    { name: 'CO4', attainment: 82 },
  ];

  const poData = [
    { name: 'PO1', value: 70 },
    { name: 'PO2', value: 65 },
    { name: 'PO3', value: 72 },
    { name: 'PO4', value: 58 },
    { name: 'PO5', value: 68 },
  ];

  const COLORS = ['#3b82f6', '#8b5cf6', '#ec4899', '#f97316', '#10b981'];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4 text-white flex justify-between items-center">
          <div className="flex items-center">
            <DocumentTextIcon className="h-6 w-6 mr-2" />
            <h2 className="text-lg font-semibold">Report Preview</h2>
          </div>
          <button onClick={onClose} className="p-1 hover:bg-white hover:bg-opacity-20 rounded-lg">
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>

        {/* Preview Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="space-y-6">
            {/* Report Header */}
            <div className="border-b pb-4">
              <h1 className="text-2xl font-bold text-gray-800">CO-PO Attainment Report</h1>
              <p className="text-gray-600">Generated: {new Date().toLocaleString()}</p>
              <p className="text-gray-600">Course: CS101 - Introduction to Programming</p>
            </div>

            {/* Executive Summary */}
            <div className="bg-blue-50 rounded-lg p-4">
              <h3 className="font-semibold text-gray-800 mb-2 flex items-center">
                <AcademicCapIcon className="h-5 w-5 mr-2 text-blue-600" />
                Executive Summary
              </h3>
              <p className="text-sm text-gray-600">
                This report presents the attainment analysis for Course CS101. 
                Overall CO attainment average is 69.8% with 2 COs achieving Level 3, 
                1 CO at Level 2, and 1 CO at Level 1. PO attainment shows strong 
                performance in PO1 and PO3 with room for improvement in PO4.
              </p>
            </div>

            {/* CO Attainment Chart */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-semibold text-gray-800 mb-4">CO Attainment</h3>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={coData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis domain={[0, 100]} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="attainment" fill="#3b82f6" name="Attainment %" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* PO Attainment */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-800 mb-4">PO Attainment</h3>
                <ResponsiveContainer width="100%" height={200}>
                  <PieChart>
                    <Pie
                      data={poData}
                      cx="50%"
                      cy="50%"
                      innerRadius={40}
                      outerRadius={70}
                      fill="#8884d8"
                      paddingAngle={5}
                      dataKey="value"
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                      {poData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              {/* Summary Stats */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-800 mb-4">Quick Stats</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total COs:</span>
                    <span className="font-medium">4</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Average CO:</span>
                    <span className="font-medium text-blue-600">69.8%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Average PO:</span>
                    <span className="font-medium text-purple-600">66.6%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Level 3 COs:</span>
                    <span className="font-medium text-green-600">2</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Below Target:</span>
                    <span className="font-medium text-orange-600">1</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Data Table */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-semibold text-gray-800 mb-4 flex items-center">
                <TableCellsIcon className="h-5 w-5 mr-2 text-purple-600" />
                CO Attainment Details
              </h3>
              <table className="min-w-full">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">CO</th>
                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Description</th>
                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Bloom's Level</th>
                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Attainment</th>
                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Level</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t">
                    <td className="px-4 py-2 text-sm font-medium">CO1</td>
                    <td className="px-4 py-2 text-sm">Understand programming concepts</td>
                    <td className="px-4 py-2 text-sm">Understand</td>
                    <td className="px-4 py-2 text-sm">68%</td>
                    <td className="px-4 py-2"><span className="px-2 py-1 bg-yellow-100 text-yellow-600 rounded-full text-xs">Level 2</span></td>
                  </tr>
                  <tr className="border-t">
                    <td className="px-4 py-2 text-sm font-medium">CO2</td>
                    <td className="px-4 py-2 text-sm">Apply programming constructs</td>
                    <td className="px-4 py-2 text-sm">Apply</td>
                    <td className="px-4 py-2 text-sm">74%</td>
                    <td className="px-4 py-2"><span className="px-2 py-1 bg-green-100 text-green-600 rounded-full text-xs">Level 3</span></td>
                  </tr>
                  <tr className="border-t">
                    <td className="px-4 py-2 text-sm font-medium">CO3</td>
                    <td className="px-4 py-2 text-sm">Analyze problems</td>
                    <td className="px-4 py-2 text-sm">Analyze</td>
                    <td className="px-4 py-2 text-sm">55%</td>
                    <td className="px-4 py-2"><span className="px-2 py-1 bg-orange-100 text-orange-600 rounded-full text-xs">Level 1</span></td>
                  </tr>
                  <tr className="border-t">
                    <td className="px-4 py-2 text-sm font-medium">CO4</td>
                    <td className="px-4 py-2 text-sm">Design solutions</td>
                    <td className="px-4 py-2 text-sm">Create</td>
                    <td className="px-4 py-2 text-sm">82%</td>
                    <td className="px-4 py-2"><span className="px-2 py-1 bg-green-100 text-green-600 rounded-full text-xs">Level 3</span></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t p-4 flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            Close Preview
          </button>
          <button
            onClick={onDownload}
            className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 flex items-center"
          >
            <ArrowDownTrayIcon className="h-5 w-5 mr-2" />
            Download Report
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ReportPreview;