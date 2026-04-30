import React from 'react';

const POAttainment = ({ courseId }) => {
  const poData = [
    {
      po: 'PO1',
      description: 'Engineering knowledge',
      contributingCOs: ['CO1', 'CO2'],
      attainment: 70,
      level: 3,
      target: 70
    },
    {
      po: 'PO2',
      description: 'Problem analysis',
      contributingCOs: ['CO1', 'CO2', 'CO3'],
      attainment: 65,
      level: 2,
      target: 70
    },
    {
      po: 'PO3',
      description: 'Design/development',
      contributingCOs: ['CO2', 'CO4'],
      attainment: 72,
      level: 3,
      target: 70
    },
    {
      po: 'PO4',
      description: 'Investigations',
      contributingCOs: ['CO3'],
      attainment: 58,
      level: 1,
      target: 70
    },
    {
      po: 'PO5',
      description: 'Modern tool usage',
      contributingCOs: ['CO4'],
      attainment: 68,
      level: 2,
      target: 70
    }
  ];

  const coAttainments = {
    CO1: 68,
    CO2: 74,
    CO3: 55,
    CO4: 82,
    CO5: 61
  };

  const getLevelColor = (level) => {
    switch(level) {
      case 3: return 'text-green-600 bg-green-100';
      case 2: return 'text-yellow-600 bg-yellow-100';
      case 1: return 'text-orange-600 bg-orange-100';
      default: return 'text-red-600 bg-red-100';
    }
  };

  return (
    <div className="space-y-6">
      {/* PO Attainment Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">PO</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Description</th>
              <th className="px-4 py-3 text-center text-sm font-medium text-gray-700">Contributing COs</th>
              <th className="px-4 py-3 text-center text-sm font-medium text-gray-700">Attainment</th>
              <th className="px-4 py-3 text-center text-sm font-medium text-gray-700">Level</th>
              <th className="px-4 py-3 text-center text-sm font-medium text-gray-700">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {poData.map((po, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-4 py-3 text-sm font-medium text-gray-800">{po.po}</td>
                <td className="px-4 py-3 text-sm text-gray-600">{po.description}</td>
                <td className="px-4 py-3 text-center text-sm text-gray-600">
                  {po.contributingCOs.join(', ')}
                </td>
                <td className="px-4 py-3 text-center text-sm font-medium text-gray-800">
                  {po.attainment}%
                </td>
                <td className="px-4 py-3 text-center">
                  <span className={`px-2 py-1 rounded-full text-xs ${getLevelColor(po.level)}`}>
                    Level {po.level}
                  </span>
                </td>
                <td className="px-4 py-3 text-center">
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

      {/* CO-PO Mapping Matrix */}
      <div className="bg-gray-50 rounded-lg p-4">
        <h4 className="text-md font-semibold text-gray-800 mb-4">CO-PO Mapping Matrix</h4>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="bg-gray-200">
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">CO/PO</th>
                <th className="px-4 py-2 text-center text-sm font-medium text-gray-700">PO1</th>
                <th className="px-4 py-2 text-center text-sm font-medium text-gray-700">PO2</th>
                <th className="px-4 py-2 text-center text-sm font-medium text-gray-700">PO3</th>
                <th className="px-4 py-2 text-center text-sm font-medium text-gray-700">PO4</th>
                <th className="px-4 py-2 text-center text-sm font-medium text-gray-700">PO5</th>
                <th className="px-4 py-2 text-center text-sm font-medium text-gray-700">CO Attainment</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(coAttainments).map(([co, attainment]) => (
                <tr key={co} className="border-t">
                  <td className="px-4 py-2 text-sm font-medium text-gray-800">{co}</td>
                  <td className="px-4 py-2 text-center text-sm text-gray-600">
                    {poData.some(p => p.po === 'PO1' && p.contributingCOs.includes(co)) ? '✓' : '-'}
                  </td>
                  <td className="px-4 py-2 text-center text-sm text-gray-600">
                    {poData.some(p => p.po === 'PO2' && p.contributingCOs.includes(co)) ? '✓' : '-'}
                  </td>
                  <td className="px-4 py-2 text-center text-sm text-gray-600">
                    {poData.some(p => p.po === 'PO3' && p.contributingCOs.includes(co)) ? '✓' : '-'}
                  </td>
                  <td className="px-4 py-2 text-center text-sm text-gray-600">
                    {poData.some(p => p.po === 'PO4' && p.contributingCOs.includes(co)) ? '✓' : '-'}
                  </td>
                  <td className="px-4 py-2 text-center text-sm text-gray-600">
                    {poData.some(p => p.po === 'PO5' && p.contributingCOs.includes(co)) ? '✓' : '-'}
                  </td>
                  <td className="px-4 py-2 text-center text-sm font-medium text-gray-800">
                    {attainment}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* PO Attainment Calculation */}
      <div className="bg-blue-50 rounded-lg p-4">
        <h4 className="text-md font-semibold text-gray-800 mb-2">How PO Attainment is Calculated</h4>
        <p className="text-sm text-gray-600">
          PO Attainment is calculated as the weighted average of the CO attainments mapped to each PO.
          For example, PO2 is mapped to CO1, CO2, and CO3 with equal weights:
        </p>
        <p className="text-sm text-gray-700 mt-2 font-medium">
          PO2 Attainment = (CO1 + CO2 + CO3) / 3 = (68 + 74 + 55) / 3 = 65.67%
        </p>
      </div>
    </div>
  );
};

export default POAttainment;