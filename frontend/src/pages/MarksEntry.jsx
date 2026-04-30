import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  DocumentArrowUpIcon,
  TableCellsIcon,
  CheckCircleIcon,
  XCircleIcon,
  ArrowPathIcon
} from '@heroicons/react/24/outline';
import { useDropzone } from 'react-dropzone';
import * as XLSX from 'xlsx';
import toast from 'react-hot-toast';

const MarksEntry = () => {
  const [uploadMethod, setUploadMethod] = useState('excel');
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [previewData, setPreviewData] = useState([]);
  const [uploaded, setUploaded] = useState(false);

  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    setFile(file);
    
    // Preview Excel data
    const reader = new FileReader();
    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: 'array' });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
      setPreviewData(jsonData.slice(0, 6)); // Show first 6 rows
    };
    reader.readAsArrayBuffer(file);
    
    toast.success('File uploaded successfully!');
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/vnd.ms-excel': ['.xls'],
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
      'text/csv': ['.csv']
    }
  });

  const handleUpload = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setUploaded(true);
      toast.success('Marks uploaded and processed successfully!');
    }, 2000);
  };

  const manualMarks = [
    { rollNo: 'CS001', name: 'Alice Johnson', marks: [8, 7, 9], total: 24 },
    { rollNo: 'CS002', name: 'Bob Smith', marks: [6, 5, 7], total: 18 },
    { rollNo: 'CS003', name: 'Charlie Brown', marks: [9, 8, 8], total: 25 },
    { rollNo: 'CS004', name: 'Diana Prince', marks: [7, 6, 8], total: 21 },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex items-center space-x-4">
        <div className="p-3 bg-green-100 rounded-lg">
          <DocumentArrowUpIcon className="h-8 w-8 text-green-600" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Marks Entry</h1>
          <p className="text-gray-600 mt-1">Upload student marks for assessments</p>
        </div>
      </div>

      {/* Method Selection */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="flex space-x-4">
          <button
            onClick={() => setUploadMethod('excel')}
            className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all ${
              uploadMethod === 'excel'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            <DocumentArrowUpIcon className="h-5 w-5 inline-block mr-2" />
            Upload Excel/CSV
          </button>
          <button
            onClick={() => setUploadMethod('manual')}
            className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all ${
              uploadMethod === 'manual'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            <TableCellsIcon className="h-5 w-5 inline-block mr-2" />
            Manual Entry
          </button>
        </div>
      </div>

      {uploadMethod === 'excel' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {/* File Upload */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Upload Marks File</h2>
            <div
              {...getRootProps()}
              className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors
                ${isDragActive ? 'border-green-500 bg-green-50' : 'border-gray-300 hover:border-green-400'}`}
            >
              <input {...getInputProps()} />
              <DocumentArrowUpIcon className="h-16 w-16 mx-auto text-gray-400 mb-4" />
              {isDragActive ? (
                <p className="text-green-500 text-lg">Drop the file here...</p>
              ) : (
                <div>
                  <p className="text-gray-600 text-lg">Drag & drop your marks file here</p>
                  <p className="text-sm text-gray-500 mt-2">or click to browse</p>
                  <p className="text-xs text-gray-400 mt-4">Supports: .xlsx, .xls, .csv</p>
                </div>
              )}
            </div>

            {file && (
              <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-700">
                  Selected file: <span className="font-medium">{file.name}</span>
                </p>
              </div>
            )}
          </div>

          {/* Preview */}
          {previewData.length > 0 && (
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Preview (First 5 rows)</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead>
                    <tr className="bg-gray-50">
                      {previewData[0]?.map((header, i) => (
                        <th key={i} className="px-4 py-2 text-left text-sm font-medium text-gray-600">
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {previewData.slice(1).map((row, i) => (
                      <tr key={i} className="border-t">
                        {row?.map((cell, j) => (
                          <td key={j} className="px-4 py-2 text-sm text-gray-700">
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Upload Button */}
          {file && !uploaded && (
            <button
              onClick={handleUpload}
              disabled={loading}
              className="w-full py-3 bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-lg font-semibold hover:from-green-700 hover:to-blue-700 disabled:opacity-50 flex items-center justify-center"
            >
              {loading ? (
                <>
                  <ArrowPathIcon className="h-5 w-5 animate-spin mr-2" />
                  Processing...
                </>
              ) : (
                'Upload and Process Marks'
              )}
            </button>
          )}

          {uploaded && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center">
              <CheckCircleIcon className="h-5 w-5 text-green-500 mr-2" />
              <span className="text-green-700">Marks uploaded successfully! 65 student records processed.</span>
            </div>
          )}
        </motion.div>
      )}

      {uploadMethod === 'manual' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-md p-6"
        >
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Manual Marks Entry</h2>
          
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Roll No</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Student Name</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Q1 (10)</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Q2 (10)</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Q3 (10)</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Total</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody>
                {manualMarks.map((student, index) => (
                  <tr key={index} className="border-t">
                    <td className="px-4 py-3 text-sm text-gray-700">{student.rollNo}</td>
                    <td className="px-4 py-3 text-sm text-gray-700">{student.name}</td>
                    {student.marks.map((mark, i) => (
                      <td key={i} className="px-4 py-3">
                        <input
                          type="number"
                          value={mark}
                          min="0"
                          max="10"
                          className="w-16 px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </td>
                    ))}
                    <td className="px-4 py-3 text-sm font-medium text-gray-700">{student.total}</td>
                    <td className="px-4 py-3">
                      <button className="text-blue-600 hover:text-blue-800 text-sm">Save</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-6 flex justify-end space-x-4">
            <button className="px-6 py-2 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
              Cancel
            </button>
            <button className="px-6 py-2 bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-lg hover:from-green-700 hover:to-blue-700">
              Save All Marks
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default MarksEntry;