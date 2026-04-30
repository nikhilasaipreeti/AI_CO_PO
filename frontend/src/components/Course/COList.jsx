import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  PencilIcon,
  TrashIcon,
  PlusIcon,
  CheckCircleIcon,
  XCircleIcon
} from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';

const COList = ({ courseId }) => {
  const [cos, setCos] = useState([
    {
      id: 1,
      code: 'CO1',
      description: 'Understand fundamental programming concepts including variables, data types, and control structures',
      bloomLevel: 'Understand',
      mappedPOs: ['PO1', 'PO2'],
      mappedPSOs: ['PSO1'],
      attainment: 68
    },
    {
      id: 2,
      code: 'CO2',
      description: 'Apply programming constructs to solve simple computational problems',
      bloomLevel: 'Apply',
      mappedPOs: ['PO2', 'PO3'],
      mappedPSOs: ['PSO1', 'PSO2'],
      attainment: 74
    },
    {
      id: 3,
      code: 'CO3',
      description: 'Analyze problems and design algorithmic solutions',
      bloomLevel: 'Analyze',
      mappedPOs: ['PO2', 'PO4'],
      mappedPSOs: ['PSO2'],
      attainment: 55
    },
    {
      id: 4,
      code: 'CO4',
      description: 'Design and implement programs using appropriate programming paradigms',
      bloomLevel: 'Create',
      mappedPOs: ['PO3', 'PO5'],
      mappedPSOs: ['PSO1', 'PSO2'],
      attainment: 82
    }
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [newCO, setNewCO] = useState({
    code: '',
    description: '',
    bloomLevel: 'Understand',
    mappedPOs: [],
    mappedPSOs: []
  });

  const bloomLevels = ['Remember', 'Understand', 'Apply', 'Analyze', 'Evaluate', 'Create'];
  const availablePOs = ['PO1', 'PO2', 'PO3', 'PO4', 'PO5', 'PO6', 'PO7', 'PO8', 'PO9', 'PO10', 'PO11', 'PO12'];
  const availablePSOs = ['PSO1', 'PSO2', 'PSO3'];

  const getAttainmentColor = (value) => {
    if (value >= 70) return 'text-green-600';
    if (value >= 60) return 'text-yellow-600';
    if (value >= 50) return 'text-orange-600';
    return 'text-red-600';
  };

  const getBloomColor = (level) => {
    const colors = {
      'Remember': 'blue',
      'Understand': 'green',
      'Apply': 'purple',
      'Analyze': 'orange',
      'Evaluate': 'red',
      'Create': 'pink'
    };
    return colors[level] || 'gray';
  };

  const handleAddCO = () => {
    if (!newCO.code || !newCO.description) {
      toast.error('Please fill all required fields');
      return;
    }

    const co = {
      id: cos.length + 1,
      ...newCO,
      attainment: 0
    };

    setCos([...cos, co]);
    setNewCO({
      code: '',
      description: '',
      bloomLevel: 'Understand',
      mappedPOs: [],
      mappedPSOs: []
    });
    setShowAddForm(false);
    toast.success('CO added successfully');
  };

  const handleEdit = (co) => {
    setEditingId(co.id);
    setNewCO(co);
    setShowAddForm(true);
  };

  const handleUpdate = () => {
    setCos(cos.map(c => c.id === editingId ? { ...newCO, id: editingId } : c));
    setEditingId(null);
    setNewCO({
      code: '',
      description: '',
      bloomLevel: 'Understand',
      mappedPOs: [],
      mappedPSOs: []
    });
    setShowAddForm(false);
    toast.success('CO updated successfully');
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this CO?')) {
      setCos(cos.filter(c => c.id !== id));
      toast.success('CO deleted successfully');
    }
  };

  const handlePOChange = (po, checked) => {
    if (checked) {
      setNewCO({
        ...newCO,
        mappedPOs: [...newCO.mappedPOs, po]
      });
    } else {
      setNewCO({
        ...newCO,
        mappedPOs: newCO.mappedPOs.filter(p => p !== po)
      });
    }
  };

  const handlePSOChange = (pso, checked) => {
    if (checked) {
      setNewCO({
        ...newCO,
        mappedPSOs: [...newCO.mappedPSOs, pso]
      });
    } else {
      setNewCO({
        ...newCO,
        mappedPSOs: newCO.mappedPSOs.filter(p => p !== pso)
      });
    }
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-800">Course Outcomes</h3>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="flex items-center px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all text-sm"
        >
          <PlusIcon className="h-4 w-4 mr-1" />
          Add CO
        </button>
      </div>

      {/* Add/Edit Form */}
      {showAddForm && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gray-50 rounded-lg p-4 border border-gray-200"
        >
          <h4 className="font-medium text-gray-800 mb-4">
            {editingId ? 'Edit CO' : 'Add New CO'}
          </h4>
          
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">CO Code</label>
                <input
                  type="text"
                  value={newCO.code}
                  onChange={(e) => setNewCO({...newCO, code: e.target.value})}
                  placeholder="e.g., CO5"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Bloom's Level</label>
                <select
                  value={newCO.bloomLevel}
                  onChange={(e) => setNewCO({...newCO, bloomLevel: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {bloomLevels.map(level => (
                    <option key={level} value={level}>{level}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea
                value={newCO.description}
                onChange={(e) => setNewCO({...newCO, description: e.target.value})}
                rows="3"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter CO description..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">PO Mapping</label>
              <div className="grid grid-cols-3 gap-2">
                {availablePOs.map(po => (
                  <label key={po} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={newCO.mappedPOs.includes(po)}
                      onChange={(e) => handlePOChange(po, e.target.checked)}
                      className="rounded text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700">{po}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">PSO Mapping</label>
              <div className="grid grid-cols-3 gap-2">
                {availablePSOs.map(pso => (
                  <label key={pso} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={newCO.mappedPSOs.includes(pso)}
                      onChange={(e) => handlePSOChange(pso, e.target.checked)}
                      className="rounded text-purple-600 focus:ring-purple-500"
                    />
                    <span className="text-sm text-gray-700">{pso}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="flex justify-end space-x-2">
              <button
                onClick={() => {
                  setShowAddForm(false);
                  setEditingId(null);
                  setNewCO({
                    code: '',
                    description: '',
                    bloomLevel: 'Understand',
                    mappedPOs: [],
                    mappedPSOs: []
                  });
                }}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={editingId ? handleUpdate : handleAddCO}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                {editingId ? 'Update' : 'Add'} CO
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* CO List */}
      <div className="space-y-3">
        {cos.map((co, index) => (
          <motion.div
            key={co.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <span className="font-bold text-blue-600 text-lg">{co.code}</span>
                  <span className={`px-2 py-1 text-xs rounded-full bg-${getBloomColor(co.bloomLevel)}-100 text-${getBloomColor(co.bloomLevel)}-600`}>
                    {co.bloomLevel}
                  </span>
                  <span className={`text-sm font-medium ${getAttainmentColor(co.attainment)}`}>
                    Attainment: {co.attainment}%
                  </span>
                </div>
                
                <p className="text-gray-700 mb-3">{co.description}</p>
                
                <div className="flex flex-wrap gap-4 text-sm">
                  <div>
                    <span className="text-gray-500">PO Mapping:</span>{' '}
                    <span className="font-medium text-gray-700">
                      {co.mappedPOs.join(', ')}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-500">PSO Mapping:</span>{' '}
                    <span className="font-medium text-gray-700">
                      {co.mappedPSOs.join(', ')}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="flex space-x-2 ml-4">
                <button
                  onClick={() => handleEdit(co)}
                  className="p-1 hover:bg-gray-100 rounded-lg text-gray-600 hover:text-blue-600"
                >
                  <PencilIcon className="h-5 w-5" />
                </button>
                <button
                  onClick={() => handleDelete(co.id)}
                  className="p-1 hover:bg-gray-100 rounded-lg text-gray-600 hover:text-red-600"
                >
                  <TrashIcon className="h-5 w-5" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default COList;