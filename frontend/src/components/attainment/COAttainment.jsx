import React from 'react';

const COAttainment = ({ courseId }) => {
  const assessmentData = [
    {
      assessment: 'T1 Exam',
      co1: 68,
      co2: 72,
      co3: 52,
      co4: 78,
      co5: 60
    },
    {
      assessment: 'T2 Exam',
      co1: 70,
      co2: 74,
      co3: 55,
      co4: 82,
      co5: 62
    },
    {
      assessment: 'Mid Term',
      co1: 72,
      co2: 76,
      co3: 58,
      co4: 84,
      co5: 64
    },
    {
      assessment: 'Final Exam',
      co1: 74,
      co2: 78,
      co3: 60,
      co4: 86,
      co5: 66
    }
  ];

  const getAttainmentColor = (value) => {
    if (value >= 70) return 'bg-green-100 text-green-800';
    if (value >= 60) return 'bg-yellow-100 text-yellow-800';
    if (value >= 50) return 'bg-orange-100 text-orange-800';
    return 'bg-red-100 text-red-800';
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Assessment</th>
            <th className="px-4 py-3 text-center text-sm font-medium text-gray-700">CO1</th>
            <th className="px-4 py-3 text-center text-sm font-medium text-gray-700">CO2</th>
            <th className="px-4 py-3 text-center text-sm font-medium text-gray-700">CO3</th>
            <th className="px-4 py-3 text-center text-sm font-medium text-gray-700">CO4</th>
            <th className="px-4 py-3 text-center text-sm font-medium text-gray-700">CO5</th>
            <th className="px-4 py-3 text-center text-sm font-medium text-gray-700">Average</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {assessmentData.map((row, index) => {
            const avg = (row.co1 + row.co2 + row.co3 + row.co4 + row.co5) / 5;
            
            return (
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-4 py-3 text-sm font-medium text-gray-800">{row.assessment}</td>
                <td className={`px-4 py-3 text-center text-sm rounded-lg m-1 ${getAttainmentColor(row.co1)}`}>
                  {row.co1}%
                </td>
                <td className={`px-4 py-3 text-center text-sm rounded-lg m-1 ${getAttainmentColor(row.co2)}`}>
                  {row.co2}%
                </td>
                <td className={`px-4 py-3 text-center text-sm rounded-lg m-1 ${getAttainmentColor(row.co3)}`}>
                  {row.co3}%
                </td>
                <td className={`px-4 py-3 text-center text-sm rounded-lg m-1 ${getAttainmentColor(row.co4)}`}>
                  {row.co4}%
                </td>
                <td className={`px-4 py-3 text-center text-sm rounded-lg m-1 ${getAttainmentColor(row.co5)}`}>
                  {row.co5}%
                </td>
                <td className="px-4 py-3 text-center text-sm font-medium text-gray-800">
                  {avg.toFixed(1)}%
                </td>
              </tr>
            );
          })}
        </tbody>
        <tfoot className="bg-gray-50">
          <tr>
            <td className="px-4 py-3 text-sm font-medium text-gray-800">Overall</td>
            <td className="px-4 py-3 text-center text-sm font-medium text-gray-800">71%</td>
            <td className="px-4 py-3 text-center text-sm font-medium text-gray-800">75%</td>
            <td className="px-4 py-3 text-center text-sm font-medium text-gray-800">56%</td>
            <td className="px-4 py-3 text-center text-sm font-medium text-gray-800">83%</td>
            <td className="px-4 py-3 text-center text-sm font-medium text-gray-800">63%</td>
            <td className="px-4 py-3 text-center text-sm font-medium text-gray-800">69.6%</td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default COAttainment;