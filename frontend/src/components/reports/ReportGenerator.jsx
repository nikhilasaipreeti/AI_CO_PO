import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  DocumentTextIcon,
  DocumentArrowDownIcon,
  TableCellsIcon,
  PresentationChartBarIcon,
  AcademicCapIcon,
  BuildingOfficeIcon,
  UserGroupIcon,
  CalendarIcon,
  ChevronDownIcon,
  CheckCircleIcon,
  ArrowDownTrayIcon,
  EyeIcon
} from '@heroicons/react/24/outline';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';
import toast from 'react-hot-toast';

const ReportGenerator = ({ onGenerate }) => {
  const [reportType, setReportType] = useState('course');
  const [format, setFormat] = useState('pdf');
  const [selectedCourse, setSelectedCourse] = useState('');
  const [selectedProgram, setSelectedProgram] = useState('');
  const [dateRange, setDateRange] = useState('semester');
  const [includeCharts, setIncludeCharts] = useState(true);
  const [includeTables, setIncludeTables] = useState(true);
  const [includeSummary, setIncludeSummary] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);

  const courses = [
    { id: 'CS101', name: 'Introduction to Programming' },
    { id: 'CS201', name: 'Data Structures' },
    { id: 'CS301', name: 'Database Systems' },
    { id: 'CS401', name: 'Algorithm Design' },
    { id: 'CS501', name: 'Software Engineering' },
  ];

  const programs = [
    { id: 'CSE', name: 'Computer Science Engineering' },
    { id: 'IT', name: 'Information Technology' },
    { id: 'ECE', name: 'Electronics Engineering' },
    { id: 'MECH', name: 'Mechanical Engineering' },
  ];

  const reportTemplates = [
    {
      id: 'course',
      name: 'Course Report',
      description: 'Detailed report of course outcomes, assessments, and attainment',
      icon: AcademicCapIcon,
      color: 'blue',
      sections: ['Course Info', 'CO-PO Mapping', 'Assessment Details', 'Attainment Analysis']
    },
    {
      id: 'program',
      name: 'Program Report',
      description: 'Program-level attainment analysis with PO/PSO mapping',
      icon: BuildingOfficeIcon,
      color: 'purple',
      sections: ['Program Overview', 'Course-wise Attainment', 'PO Attainment', 'PSO Attainment']
    },
    {
      id: 'student',
      name: 'Student Performance Report',
      description: 'Individual student performance across all courses',
      icon: UserGroupIcon,
      color: 'green',
      sections: ['Student Info', 'Course-wise Marks', 'CO Attainment', 'Overall Performance']
    },
    {
      id: 'accreditation',
      name: 'Accreditation Report',
      description: 'NBA/NAAC ready format with all required data',
      icon: PresentationChartBarIcon,
      color: 'orange',
      sections: ['Program Details', 'CO-PO Matrix', 'Attainment Tables', 'Executive Summary']
    }
  ];

  const dateRanges = [
    { id: 'semester', name: 'Current Semester' },
    { id: 'academic', name: 'Academic Year' },
    { id: 'custom', name: 'Custom Range' }
  ];

  const handleGenerateReport = () => {
    if (!selectedCourse && reportType === 'course') {
      toast.error('Please select a course');
      return;
    }
    if (!selectedProgram && reportType === 'program') {
      toast.error('Please select a program');
      return;
    }

    setGenerating(true);
    
    setTimeout(() => {
      setGenerating(false);
      
      if (format === 'pdf') {
        generatePDF();
      } else if (format === 'excel') {
        generateExcel();
      } else if (format === 'csv') {
        generateCSV();
      }
      
      toast.success(`${reportType.charAt(0).toUpperCase() + reportType.slice(1)} report generated successfully!`);
      if (onGenerate) onGenerate();
    }, 2000);
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    const template = reportTemplates.find(t => t.id === reportType);
    
    // Add header
    doc.setFillColor(59, 130, 246);
    doc.rect(0, 0, 210, 40, 'F');
    
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(22);
    doc.text(`${template.name}`, 20, 20);
    
    doc.setFontSize(12);
    doc.text(`Generated: ${new Date().toLocaleDateString()}`, 20, 30);
    
    // Add content based on report type
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(16);
    doc.text('Report Details', 20, 50);
    
    if (reportType === 'course') {
      const course = courses.find(c => c.id === selectedCourse);
      doc.setFontSize(12);
      doc.text(`Course: ${course?.id} - ${course?.name}`, 20, 60);
      
      // Add CO-PO table
      doc.autoTable({
        startY: 70,
        head: [['CO', 'Description', 'Bloom\'s Level', 'Attainment %', 'Level']],
        body: [
          ['CO1', 'Understand programming concepts', 'Understand', '68%', 'Level 2'],
          ['CO2', 'Apply programming constructs', 'Apply', '74%', 'Level 3'],
          ['CO3', 'Analyze problems', 'Analyze', '55%', 'Level 1'],
          ['CO4', 'Design solutions', 'Create', '82%', 'Level 3'],
        ],
        theme: 'striped',
        headStyles: { fillColor: [59, 130, 246] }
      });
    }
    
    // Add footer
    const pageCount = doc.internal.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFontSize(10);
      doc.setTextColor(150, 150, 150);
      doc.text(`Page ${i} of ${pageCount}`, 180, 290);
      doc.text('OBE AI System - Generated Report', 20, 290);
    }
    
    doc.save(`${reportType}_report_${new Date().getTime()}.pdf`);
  };

  const generateExcel = () => {
    const template = reportTemplates.find(t => t.id === reportType);
    
    // Create workbook
    const wb = XLSX.utils.book_new();
    
    // Summary sheet
    const summaryData = [
      ['Report Type', template.name],
      ['Generated Date', new Date().toLocaleDateString()],
      ['Generated Time', new Date().toLocaleTimeString()],
      ['Generated By', 'Faculty'],
      [],
      ['CO-PO Attainment Summary'],
      ['CO', 'Attainment %', 'Level', 'Status'],
      ['CO1', '68%', 'Level 2', 'Achieved'],
      ['CO2', '74%', 'Level 3', 'Achieved'],
      ['CO3', '55%', 'Level 1', 'Below Target'],
      ['CO4', '82%', 'Level 3', 'Achieved'],
    ];
    
    const ws = XLSX.utils.aoa_to_sheet(summaryData);
    XLSX.utils.book_append_sheet(wb, ws, 'Summary');
    
    // CO-PO Mapping sheet
    const mappingData = [
      ['CO-PO Mapping Matrix'],
      [],
      ['CO\\PO', 'PO1', 'PO2', 'PO3', 'PO4', 'PO5'],
      ['CO1', '3', '2', '-', '-', '-'],
      ['CO2', '-', '3', '2', '-', '-'],
      ['CO3', '-', '2', '-', '3', '-'],
      ['CO4', '-', '-', '2', '-', '3'],
    ];
    
    const ws2 = XLSX.utils.aoa_to_sheet(mappingData);
    XLSX.utils.book_append_sheet(wb, ws2, 'CO-PO Mapping');
    
    // Student performance sheet
    const studentData = [
      ['Student Performance'],
      [],
      ['Roll No', 'Name', 'CO1', 'CO2', 'CO3', 'CO4', 'Total', 'Percentage'],
      ['CS001', 'Alice Johnson', '8', '7', '9', '8', '32', '80%'],
      ['CS002', 'Bob Smith', '6', '5', '7', '6', '24', '60%'],
      ['CS003', 'Charlie Brown', '9', '8', '8', '9', '34', '85%'],
    ];
    
    const ws3 = XLSX.utils.aoa_to_sheet(studentData);
    XLSX.utils.book_append_sheet(wb, ws3, 'Students');
    
    XLSX.writeFile(wb, `${reportType}_report_${new Date().getTime()}.xlsx`);
  };

  const generateCSV = () => {
    const data = [
      ['CO', 'Attainment %', 'Level', 'Status'],
      ['CO1', '68%', 'Level 2', 'Achieved'],
      ['CO2', '74%', 'Level 3', 'Achieved'],
      ['CO3', '55%', 'Level 1', 'Below Target'],
      ['CO4', '82%', 'Level 3', 'Achieved'],
    ];
    
    const ws = XLSX.utils.aoa_to_sheet(data);
    const csv = XLSX.utils.sheet_to_csv(ws);
    
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.href = url;
    link.setAttribute('download', `${reportType}_report_${new Date().getTime()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handlePreview = () => {
    setPreviewMode(true);
  };

  return (
    <div className="space-y-6">
      {/* Report Type Selection */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {reportTemplates.map((template) => (
          <motion.div
            key={template.id}
            whileHover={{ scale: 1.02 }}
            className={`bg-white rounded-xl shadow-md p-6 cursor-pointer border-2 transition-all ${
              reportType === template.id ? `border-${template.color}-500` : 'border-transparent'
            }`}
            onClick={() => setReportType(template.id)}
          >
            <div className={`p-3 bg-${template.color}-100 rounded-lg w-fit mb-4`}>
              <template.icon className={`h-6 w-6 text-${template.color}-600`} />
            </div>
            <h3 className="font-semibold text-gray-800 mb-2">{template.name}</h3>
            <p className="text-sm text-gray-600 mb-3">{template.description}</p>
            <div className="flex flex-wrap gap-1">
              {template.sections.map((section, idx) => (
                <span key={idx} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                  {section}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Report Configuration */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-6">Configure Report</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Course Selection */}
          {reportType === 'course' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Select Course</label>
              <select
                value={selectedCourse}
                onChange={(e) => setSelectedCourse(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Choose a course</option>
                {courses.map(course => (
                  <option key={course.id} value={course.id}>
                    {course.id} - {course.name}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Program Selection */}
          {reportType === 'program' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Select Program</label>
              <select
                value={selectedProgram}
                onChange={(e) => setSelectedProgram(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="">Choose a program</option>
                {programs.map(program => (
                  <option key={program.id} value={program.id}>
                    {program.id} - {program.name}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Date Range */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Date Range</label>
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {dateRanges.map(range => (
                <option key={range.id} value={range.id}>{range.name}</option>
              ))}
            </select>
          </div>

          {/* Export Format */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Export Format</label>
            <div className="flex space-x-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  value="pdf"
                  checked={format === 'pdf'}
                  onChange={(e) => setFormat(e.target.value)}
                  className="mr-2"
                />
                <DocumentArrowDownIcon className="h-5 w-5 text-red-500 mr-1" />
                PDF
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  value="excel"
                  checked={format === 'excel'}
                  onChange={(e) => setFormat(e.target.value)}
                  className="mr-2"
                />
                <TableCellsIcon className="h-5 w-5 text-green-500 mr-1" />
                Excel
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  value="csv"
                  checked={format === 'csv'}
                  onChange={(e) => setFormat(e.target.value)}
                  className="mr-2"
                />
                <DocumentTextIcon className="h-5 w-5 text-blue-500 mr-1" />
                CSV
              </label>
            </div>
          </div>
        </div>

        {/* Additional Options */}
        <div className="mt-6 pt-6 border-t border-gray-200">
          <h3 className="text-sm font-medium text-gray-700 mb-3">Include in Report</h3>
          <div className="flex flex-wrap gap-6">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={includeCharts}
                onChange={(e) => setIncludeCharts(e.target.checked)}
                className="mr-2 rounded text-blue-600"
              />
              <span className="text-sm text-gray-600">Charts & Visualizations</span>
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={includeTables}
                onChange={(e) => setIncludeTables(e.target.checked)}
                className="mr-2 rounded text-blue-600"
              />
              <span className="text-sm text-gray-600">Data Tables</span>
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={includeSummary}
                onChange={(e) => setIncludeSummary(e.target.checked)}
                className="mr-2 rounded text-blue-600"
              />
              <span className="text-sm text-gray-600">Executive Summary</span>
            </label>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex justify-end space-x-4">
          <button
            onClick={handlePreview}
            className="px-6 py-2 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all flex items-center"
          >
            <EyeIcon className="h-5 w-5 mr-2" />
            Preview
          </button>
          <button
            onClick={handleGenerateReport}
            disabled={generating}
            className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 transition-all flex items-center"
          >
            {generating ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Generating...
              </>
            ) : (
              <>
                <ArrowDownTrayIcon className="h-5 w-5 mr-2" />
                Generate Report
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReportGenerator;