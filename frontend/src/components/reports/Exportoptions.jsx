import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  DocumentArrowDownIcon,
  TableCellsIcon,
  DocumentTextIcon,
  PhotoIcon,
  ChevronDownIcon,
  CheckCircleIcon,
  ArrowDownTrayIcon,
  EnvelopeIcon,
  PrinterIcon
} from '@heroicons/react/24/outline';

const ExportOptions = ({ onExport, onEmail, onPrint }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedFormat, setSelectedFormat] = useState('pdf');

  const formats = [
    { id: 'pdf', name: 'PDF Document', icon: DocumentArrowDownIcon, color: 'red', description: 'Best for printing and sharing' },
    { id: 'excel', name: 'Excel Spreadsheet', icon: TableCellsIcon, color: 'green', description: 'Editable data tables' },
    { id: 'csv', name: 'CSV File', icon: DocumentTextIcon, color: 'blue', description: 'Raw data format' },
    { id: 'image', name: 'Image (PNG)', icon: PhotoIcon, color: 'purple', description: 'Screenshot of charts' },
  ];

  const quickActions = [
    { id: 'download', label: 'Download', icon: ArrowDownTrayIcon, action: onExport },
    { id: 'email', label: 'Email', icon: EnvelopeIcon, action: onEmail },
    { id: 'print', label: 'Print', icon: PrinterIcon, action: onPrint },
  ];

  const handleFormatSelect = (formatId) => {
    setSelectedFormat(formatId);
  };

  const handleExport = () => {
    if (onExport) {
      onExport(selectedFormat);
    }
    setIsOpen(false);
  };

  return (
    <div className="relative">
      {/* Export Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all"
      >
        <DocumentArrowDownIcon className="h-5 w-5 mr-2" />
        Export Report
        <ChevronDownIcon className={`h-4 w-4 ml-2 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-gray-200 z-50 overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gray-50 px-4 py-3 border-b">
              <h3 className="font-semibold text-gray-800">Export Options</h3>
              <p className="text-xs text-gray-500 mt-1">Choose format and action</p>
            </div>

            {/* Format Selection */}
            <div className="p-4">
              <p className="text-xs font-medium text-gray-500 mb-3">SELECT FORMAT</p>
              <div className="space-y-2">
                {formats.map((format) => (
                  <button
                    key={format.id}
                    onClick={() => handleFormatSelect(format.id)}
                    className={`w-full flex items-center p-3 rounded-lg border-2 transition-all ${
                      selectedFormat === format.id
                        ? `border-${format.color}-500 bg-${format.color}-50`
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className={`p-2 bg-${format.color}-100 rounded-lg mr-3`}>
                      <format.icon className={`h-5 w-5 text-${format.color}-600`} />
                    </div>
                    <div className="flex-1 text-left">
                      <p className="text-sm font-medium text-gray-800">{format.name}</p>
                      <p className="text-xs text-gray-500">{format.description}</p>
                    </div>
                    {selectedFormat === format.id && (
                      <CheckCircleIcon className={`h-5 w-5 text-${format.color}-600`} />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="border-t border-gray-200 p-4">
              <p className="text-xs font-medium text-gray-500 mb-3">QUICK ACTIONS</p>
              <div className="grid grid-cols-3 gap-2">
                {quickActions.map((action) => (
                  <button
                    key={action.id}
                    onClick={() => {
                      action.action(selectedFormat);
                      setIsOpen(false);
                    }}
                    className="flex flex-col items-center p-2 hover:bg-gray-50 rounded-lg transition-all"
                  >
                    <action.icon className="h-5 w-5 text-gray-600 mb-1" />
                    <span className="text-xs text-gray-600">{action.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="bg-gray-50 px-4 py-3 text-center">
              <p className="text-xs text-gray-500">
                Reports include all charts and tables
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ExportOptions;