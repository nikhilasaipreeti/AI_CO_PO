import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  ChartBarIcon,
  AcademicCapIcon,
  BeakerIcon,
  DocumentTextIcon,
  ArrowDownTrayIcon,
  CalendarIcon,
  FunnelIcon
} from '@heroicons/react/24/outline';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import AttainmentChart from '../components/attainment/AttainmentChart';
import COAttainment from '../components/attainment/COAttainment';
import POAttainment from '../components/attainment/POAttainment';

const Attainment = () => {
  const [activeTab, setActiveTab] = useState('co');
  const [selectedCourse, setSelectedCourse] = useState('CS101');
  const [dateRange, setDateRange] = useState('semester');

  const courses = ['CS101', 'CS201', 'CS301', 'CS401', 'CS501'];

  const coAttainmentData = [
    { name: 'CO1', attainment: 68, target: 70, level: 2 },
    { name: 'CO2', attainment: 74, target: 70, level: 3 },
    { name: 'CO3', attainment: 55, target: 70, level: 1 },
    { name: 'CO4', attainment: 82, target: 70, level: 3 },
    { name: 'CO5', attainment: 61, target: 70, level: 2 },
  ];

  const poAttainmentData = [
    { name: 'PO1', attainment: 70, target: 70, level: 3 },
    { name: 'PO2', attainment: 65, target: 70, level: 2 },
    { name: 'PO3', attainment: 72, target: 70, level: 3 },
    { name: 'PO4', attainment: 58, target: 70, level: 1 },
    { name: 'PO5', attainment: 68, target: 70, level: 2 },
    { name: 'PO6', attainment: 75, target: 70, level: 3 },
    { name: 'PO7', attainment: 62, target: 70, level: 2 },
    { name: 'PO8', attainment: 80, target: 70, level: 3 },
  ];

  const psoAttainmentData = [
    { name: 'PSO1', attainment: 72, target: 70, level: 3 },
    { name: 'PSO2', attainment: 68, target: 70, level: 2 },
    { name: 'PSO3', attainment: 65, target: 70, level: 2 },
  ];

  const trendData = [
    { month: 'Jan', CO1: 65, CO2: 70, CO3: 52, CO4: 78 },
    { month: 'Feb', CO1: 68, CO2: 72, CO3: 54, CO4: 80 },
    { month: 'Mar', CO1: 70, CO2: 74, CO3: 55, CO4: 82 },
    { month: 'Apr', CO1: 72, CO2: 76, CO3: 58, CO4: 84 },
    { month: 'May', CO1: 68, CO2: 74, CO3: 55, CO4: 82 },
  ];

  const getLevelColor = (level) => {
    switch(level) {
      case 3: return 'text-green-600 bg-green-100';
      case 2: return 'text-yellow-600 bg-yellow-100';
      case 1: return 'text-orange-600 bg-orange-100';
      default: return 'text-red-600 bg-red-100';
    }
  };

  const COLORS = ['#3b82f6', '#8b5cf6', '#ec4899', '#f97316', '#10b981', '#6366f1'];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-purple-100 rounded-lg">
            <ChartBarIcon className="h-8 w-8 text-purple-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Attainment Analysis</h1>
            <p className="text-gray-600 mt-1">Track CO, PO, and PSO attainment levels</p>
          </div>
        </div>
        
        <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all">
          <ArrowDownTrayIcon className="h-5 w-5 mr-2" />
          Export Report
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-md p-4">
        <div className="flex flex-wrap gap-4">
          <div className="flex-1 min-w-[200px]">
            <label className="block text-sm font-medium text-gray-700 mb-1">Course</label>
            <select
              value={selectedCourse}
              onChange={(e) => setSelectedCourse(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              {courses.map(course => (
                <option key={course} value={course}>{course}</option>
              ))}
            </select>
          </div>
          
          <div className="flex-1 min-w-[200px]">
            <label className="block text-sm font-medium text-gray-700 mb-1">Time Period</label>
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="semester">This Semester</option>
              <option value="academic">Academic Year</option>
              <option value="all">All Time</option>
            </select>
          </div>
          
          <div className="flex items-end">
            <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 flex items-center">
              <FunnelIcon className="h-5 w-5 mr-2" />
              Apply Filters
            </button>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg p-6 text-white">
          <p className="text-blue-100 text-sm">Average CO Attainment</p>
          <p className="text-3xl font-bold mt-2">68.5%</p>
          <p className="text-blue-100 text-sm mt-1">↑ 2.3% from last semester</p>
        </div>
        
        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl shadow-lg p-6 text-white">
          <p className="text-purple-100 text-sm">Average PO Attainment</p>
          <p className="text-3xl font-bold mt-2">71.2%</p>
          <p className="text-purple-100 text-sm mt-1">↑ 1.8% from last semester</p>
        </div>
        
        <div className="bg-gradient-to-br from-pink-500 to-pink-600 rounded-xl shadow-lg p-6 text-white">
          <p className="text-pink-100 text-sm">Average PSO Attainment</p>
          <p className="text-3xl font-bold mt-2">69.8%</p>
          <p className="text-pink-100 text-sm mt-1">↑ 3.1% from last semester</p>
        </div>
        
        <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl shadow-lg p-6 text-white">
          <p className="text-orange-100 text-sm">Overall Program Attainment</p>
          <p className="text-3xl font-bold mt-2">70.2%</p>
          <p className="text-orange-100 text-sm mt-1">Level 2 Achievement</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl shadow-md">
        <div className="border-b border-gray-200">
          <nav className="flex -mb-px">
            {[
              { id: 'co', label: 'CO Attainment', icon: AcademicCapIcon },
              { id: 'po', label: 'PO Attainment', icon: BeakerIcon },
              { id: 'pso', label: 'PSO Attainment', icon: DocumentTextIcon },
              { id: 'trends', label: 'Trends', icon: ChartBarIcon },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? 'border-purple-500 text-purple-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <tab.icon className="h-5 w-5 mr-2" />
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'co' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* CO Attainment Chart */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">CO Attainment Distribution</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={coAttainmentData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis domain={[0, 100]} />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="attainment" fill="#3b82f6" name="Attainment %" />
                      <Bar dataKey="target" fill="#f97316" name="Target" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                {/* CO Attainment Table */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">CO Attainment Details</h3>
                  <div className="overflow-x-auto">
                    <table className="min-w-full">
                      <thead>
                        <tr className="bg-gray-200">
                          <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">CO</th>
                          <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Attainment</th>
                          <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Target</th>
                          <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Level</th>
                          <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {coAttainmentData.map((co, index) => (
                          <tr key={index} className="border-t">
                            <td className="px-4 py-2 text-sm font-medium text-gray-800">{co.name}</td>
                            <td className="px-4 py-2 text-sm text-gray-600">{co.attainment}%</td>
                            <td className="px-4 py-2 text-sm text-gray-600">{co.target}%</td>
                            <td className="px-4 py-2">
                              <span className={`px-2 py-1 rounded-full text-xs ${getLevelColor(co.level)}`}>
                                Level {co.level}
                              </span>
                            </td>
                            <td className="px-4 py-2">
                              {co.attainment >= co.target ? (
                                <span className="text-green-600 text-sm">Achieved</span>
                              ) : (
                                <span className="text-orange-600 text-sm">Below Target</span>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              {/* CO-wise Breakdown */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Assessment-wise CO Attainment</h3>
                <COAttainment courseId={selectedCourse} />
              </div>
            </div>
          )}

          {activeTab === 'po' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* PO Attainment Chart */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">PO Attainment Distribution</h3>
                  <ResponsiveContainer width="100%" height={400}>
                    <BarChart data={poAttainmentData} layout="vertical">
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis type="number" domain={[0, 100]} />
                      <YAxis type="category" dataKey="name" width={50} />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="attainment" fill="#8b5cf6" name="Attainment %" />
                      <Bar dataKey="target" fill="#f97316" name="Target" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                {/* PO Attainment Table */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">PO Attainment Details</h3>
                  <div className="overflow-y-auto max-h-96">
                    <table className="min-w-full">
                      <thead>
                        <tr className="bg-gray-200">
                          <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">PO</th>
                          <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Attainment</th>
                          <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Target</th>
                          <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Level</th>
                          <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {poAttainmentData.map((po, index) => (
                          <tr key={index} className="border-t">
                            <td className="px-4 py-2 text-sm font-medium text-gray-800">{po.name}</td>
                            <td className="px-4 py-2 text-sm text-gray-600">{po.attainment}%</td>
                            <td className="px-4 py-2 text-sm text-gray-600">{po.target}%</td>
                            <td className="px-4 py-2">
                              <span className={`px-2 py-1 rounded-full text-xs ${getLevelColor(po.level)}`}>
                                Level {po.level}
                              </span>
                            </td>
                            <td className="px-4 py-2">
                              {po.attainment >= po.target ? (
                                <span className="text-green-600 text-sm">Achieved</span>
                              ) : (
                                <span className="text-orange-600 text-sm">Below Target</span>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">PO Attainment from COs</h3>
                <POAttainment courseId={selectedCourse} />
              </div>
            </div>
          )}

          {activeTab === 'pso' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* PSO Attainment Chart */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">PSO Attainment</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={psoAttainmentData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="attainment"
                      >
                        {psoAttainmentData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>

                {/* PSO Attainment Table */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">PSO Attainment Details</h3>
                  <table className="min-w-full">
                    <thead>
                      <tr className="bg-gray-200">
                        <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">PSO</th>
                        <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Attainment</th>
                        <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Target</th>
                        <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Level</th>
                      </tr>
                    </thead>
                    <tbody>
                      {psoAttainmentData.map((pso, index) => (
                        <tr key={index} className="border-t">
                          <td className="px-4 py-2 text-sm font-medium text-gray-800">{pso.name}</td>
                          <td className="px-4 py-2 text-sm text-gray-600">{pso.attainment}%</td>
                          <td className="px-4 py-2 text-sm text-gray-600">{pso.target}%</td>
                          <td className="px-4 py-2">
                            <span className={`px-2 py-1 rounded-full text-xs ${getLevelColor(pso.level)}`}>
                              Level {pso.level}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'trends' && (
            <div className="space-y-6">
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Attainment Trends Over Time</h3>
                <ResponsiveContainer width="100%" height={400}>
                  <LineChart data={trendData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis domain={[0, 100]} />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="CO1" stroke="#3b82f6" strokeWidth={2} />
                    <Line type="monotone" dataKey="CO2" stroke="#8b5cf6" strokeWidth={2} />
                    <Line type="monotone" dataKey="CO3" stroke="#ec4899" strokeWidth={2} />
                    <Line type="monotone" dataKey="CO4" stroke="#f97316" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4">
                  <p className="text-blue-600 text-sm">Best Performing CO</p>
                  <p className="text-xl font-bold text-blue-800 mt-2">CO4</p>
                  <p className="text-blue-600">82% attainment</p>
                </div>
                <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-lg p-4">
                  <p className="text-yellow-600 text-sm">Needs Improvement</p>
                  <p className="text-xl font-bold text-yellow-800 mt-2">CO3</p>
                  <p className="text-yellow-600">55% attainment</p>
                </div>
                <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-4">
                  <p className="text-green-600 text-sm">Growth Rate</p>
                  <p className="text-xl font-bold text-green-800 mt-2">+5.2%</p>
                  <p className="text-green-600">from last semester</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Attainment;