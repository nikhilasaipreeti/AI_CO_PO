import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  DocumentArrowUpIcon,
  AcademicCapIcon,
  ArrowPathIcon,
  CheckCircleIcon,
  XCircleIcon,
  BeakerIcon
} from '@heroicons/react/24/outline';
import { useDropzone } from 'react-dropzone';
import toast from 'react-hot-toast';

const GenerateCo = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [syllabus, setSyllabus] = useState('');
  const [courseInfo, setCourseInfo] = useState({
    code: '',
    name: '',
    department: 'Computer Science',
    semester: 1,
    credits: 4
  });
  const [generatedCOs, setGeneratedCOs] = useState([]);

  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    const reader = new FileReader();
    
    reader.onload = (e) => {
      setSyllabus(e.target.result);
      toast.success('Syllabus uploaded successfully!');
    };
    
    reader.readAsText(file);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'text/plain': ['.txt'],
      'application/pdf': ['.pdf'],
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx']
    }
  });

  const handleGenerate = async () => {
    if (!syllabus) {
      toast.error('Please upload syllabus first');
      return;
    }

    setLoading(true);
    
    // Simulate AI generation
    setTimeout(() => {
      setGeneratedCOs([
        {
          id: 1,
          code: 'CO1',
          description: 'Understand fundamental programming concepts including variables, data types, and control structures',
          bloomLevel: 'Understand',
          mappedPOs: ['PO1', 'PO2'],
          mappedPSOs: ['PSO1']
        },
        {
          id: 2,
          code: 'CO2',
          description: 'Apply programming constructs to solve simple computational problems',
          bloomLevel: 'Apply',
          mappedPOs: ['PO2', 'PO3'],
          mappedPSOs: ['PSO1', 'PSO2']
        },
        {
          id: 3,
          code: 'CO3',
          description: 'Analyze problems and design algorithmic solutions',
          bloomLevel: 'Analyze',
          mappedPOs: ['PO2', 'PO4'],
          mappedPSOs: ['PSO2']
        },
        {
          id: 4,
          code: 'CO4',
          description: 'Design and implement programs using appropriate programming paradigms',
          bloomLevel: 'Create',
          mappedPOs: ['PO3', 'PO5'],
          mappedPSOs: ['PSO1', 'PSO2']
        }
      ]);
      setLoading(false);
      setStep(2);
      toast.success('COs generated successfully!');
    }, 3000);
  };

  const handleSave = () => {
    toast.success('COs saved successfully!');
    navigate('/courses');
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

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center space-x-4">
        <div className="p-3 bg-blue-100 rounded-lg">
          <BeakerIcon className="h-8 w-8 text-blue-600" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Generate Course Outcomes</h1>
          <p className="text-gray-600 mt-1">AI-powered CO generation from your syllabus</p>
        </div>
      </div>

      {/* Progress Steps */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="flex items-center justify-between">
          <div className={`flex items-center ${step >= 1 ? 'text-blue-600' : 'text-gray-400'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold ${
              step >= 1 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
            }`}>1</div>
            <span className="ml-2 text-sm font-medium">Upload Syllabus</span>
          </div>
          <div className={`flex-1 h-1 mx-4 ${step >= 2 ? 'bg-blue-600' : 'bg-gray-200'}`}></div>
          <div className={`flex items-center ${step >= 2 ? 'text-blue-600' : 'text-gray-400'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold ${
              step >= 2 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
            }`}>2</div>
            <span className="ml-2 text-sm font-medium">Review & Save</span>
          </div>
        </div>
      </div>

      {step === 1 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {/* Course Information */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Course Information</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Course Code</label>
                <input
                  type="text"
                  value={courseInfo.code}
                  onChange={(e) => setCourseInfo({...courseInfo, code: e.target.value})}
                  placeholder="e.g., CS101"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Course Name</label>
                <input
                  type="text"
                  value={courseInfo.name}
                  onChange={(e) => setCourseInfo({...courseInfo, name: e.target.value})}
                  placeholder="e.g., Introduction to Programming"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Department</label>
                <select
                  value={courseInfo.department}
                  onChange={(e) => setCourseInfo({...courseInfo, department: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option>Computer Science</option>
                  <option>Information Technology</option>
                  <option>Electronics</option>
                  <option>Mechanical</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Semester</label>
                <input
                  type="number"
                  min="1"
                  max="8"
                  value={courseInfo.semester}
                  onChange={(e) => setCourseInfo({...courseInfo, semester: parseInt(e.target.value)})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Syllabus Upload */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Upload Syllabus</h2>
            <div
              {...getRootProps()}
              className={`border-2 border-dashed rounded-lg p-12 text-center cursor-pointer transition-colors
                ${isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-blue-400'}`}
            >
              <input {...getInputProps()} />
              <DocumentArrowUpIcon className="h-16 w-16 mx-auto text-gray-400 mb-4" />
              {isDragActive ? (
                <p className="text-blue-500 text-lg">Drop the file here...</p>
              ) : (
                <div>
                  <p className="text-gray-600 text-lg">Drag & drop your syllabus file here</p>
                  <p className="text-sm text-gray-500 mt-2">or click to browse</p>
                  <p className="text-xs text-gray-400 mt-4">Supports: .txt, .pdf, .doc, .docx</p>
                </div>
              )}
            </div>
            
            {syllabus && (
              <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center">
                <CheckCircleIcon className="h-5 w-5 text-green-500 mr-2" />
                <span className="text-green-700">Syllabus uploaded successfully</span>
              </div>
            )}
          </div>

          {/* Generate Button */}
          <button
            onClick={handleGenerate}
            disabled={loading || !syllabus}
            className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {loading ? (
              <>
                <ArrowPathIcon className="h-5 w-5 animate-spin mr-2" />
                Generating COs with AI...
              </>
            ) : (
              'Generate Course Outcomes'
            )}
          </button>
        </motion.div>
      )}

      {step === 2 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-md p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-800">Generated Course Outcomes</h2>
            <span className="px-3 py-1 bg-green-100 text-green-600 rounded-full text-sm">
              AI Generated
            </span>
          </div>
          
          <div className="space-y-4 mb-8">
            {generatedCOs.map((co) => (
              <div key={co.id} className="border rounded-lg p-4 hover:shadow-md transition-all">
                <div className="flex items-center justify-between mb-3">
                  <span className="font-bold text-blue-600 text-lg">{co.code}</span>
                  <span className={`px-3 py-1 bg-${getBloomColor(co.bloomLevel)}-100 text-${getBloomColor(co.bloomLevel)}-600 rounded-full text-sm`}>
                    {co.bloomLevel}
                  </span>
                </div>
                <p className="text-gray-700 mb-3">{co.description}</p>
                <div className="flex gap-4 text-sm">
                  <div>
                    <span className="font-medium text-gray-600">PO Mapping:</span>{' '}
                    {co.mappedPOs.join(', ')}
                  </div>
                  <div>
                    <span className="font-medium text-gray-600">PSO Mapping:</span>{' '}
                    {co.mappedPSOs.join(', ')}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex gap-4">
            <button
              onClick={() => setStep(1)}
              className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-all"
            >
              Back to Edit
            </button>
            <button
              onClick={handleSave}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all transform hover:scale-105"
            >
              Save COs
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default GenerateCo;