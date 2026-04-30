import React from 'react';
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

const AttainmentChart = ({ courseId }) => {
  const coData = [
    { name: 'CO1', attainment: 68, target: 70 },
    { name: 'CO2', attainment: 74, target: 70 },
    { name: 'CO3', attainment: 55, target: 70 },
    { name: 'CO4', attainment: 82, target: 70 },
    { name: 'CO5', attainment: 61, target: 70 },
  ];

  const poData = [
    { name: 'PO1', value: 70 },
    { name: 'PO2', value: 65 },
    { name: 'PO3', value: 72 },
    { name: 'PO4', value: 58 },
    { name: 'PO5', value: 68 },
  ];

  const levelDistribution = [
    { name: 'Level 3 (70%+)', value: 2, color: '#10b981' },
    { name: 'Level 2 (60-69%)', value: 2, color: '#f59e0b' },
    { name: 'Level 1 (50-59%)', value: 1, color: '#f97316' },
    { name: 'Below Level 1 (<50%)', value: 0, color: '#ef4444' },
  ];

  const COLORS = ['#10b981', '#f59e0b', '#f97316', '#ef4444'];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 shadow-lg rounded-lg border border-gray-200">
          <p className="font-medium text-gray-800">{label}</p>
          <p className="text-sm text-gray-600">
            Attainment: <span className="font-medium text-blue-600">{payload[0].value}%</span>
          </p>
          {payload[1] && (
            <p className="text-sm text-gray-600">
              Target: <span className="font-medium text-orange-600">{payload[1].value}%</span>
            </p>
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6">
      {/* CO Attainment Chart */}
      <div className="bg-white rounded-lg p-4">
        <h4 className="text-md font-semibold text-gray-800 mb-4">CO Attainment vs Target</h4>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={coData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis domain={[0, 100]} />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Bar dataKey="attainment" fill="#3b82f6" name="Attainment %" />
            <Bar dataKey="target" fill="#f97316" name="Target %" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* PO Attainment and Level Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* PO Attainment */}
        <div className="bg-white rounded-lg p-4">
          <h4 className="text-md font-semibold text-gray-800 mb-4">PO Attainment</h4>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={poData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" domain={[0, 100]} />
              <YAxis type="category" dataKey="name" width={50} />
              <Tooltip />
              <Bar dataKey="value" fill="#8b5cf6" name="Attainment %" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Level Distribution Pie Chart */}
        <div className="bg-white rounded-lg p-4">
          <h4 className="text-md font-semibold text-gray-800 mb-4">Attainment Level Distribution</h4>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={levelDistribution}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                fill="#8884d8"
                paddingAngle={5}
                dataKey="value"
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              >
                {levelDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4">
          <p className="text-blue-600 text-sm">Average CO Attainment</p>
          <p className="text-2xl font-bold text-blue-800">68.5%</p>
          <p className="text-xs text-blue-600 mt-1">↑ 2.3% from last semester</p>
        </div>
        
        <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-4">
          <p className="text-purple-600 text-sm">Average PO Attainment</p>
          <p className="text-2xl font-bold text-purple-800">66.8%</p>
          <p className="text-xs text-purple-600 mt-1">↑ 1.5% from last semester</p>
        </div>
        
        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-4">
          <p className="text-green-600 text-sm">COs Above Target</p>
          <p className="text-2xl font-bold text-green-800">2/5</p>
          <p className="text-xs text-green-600 mt-1">40% achieved target</p>
        </div>
        
        <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg p-4">
          <p className="text-orange-600 text-sm">Needs Improvement</p>
          <p className="text-2xl font-bold text-orange-800">CO3</p>
          <p className="text-xs text-orange-600 mt-1">55% attainment</p>
        </div>
      </div>
    </div>
  );
};

export default AttainmentChart;