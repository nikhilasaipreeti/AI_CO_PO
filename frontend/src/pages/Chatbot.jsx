import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  PaperAirplaneIcon,
  ChatBubbleLeftRightIcon,
  AcademicCapIcon,
  BeakerIcon,
  DocumentTextIcon,
  ChartBarIcon,
  SparklesIcon,
  ArrowPathIcon,
  LightBulbIcon,
  BookOpenIcon,
  ClipboardDocumentListIcon,
  PresentationChartBarIcon
} from '@heroicons/react/24/outline';
import ReactMarkdown from 'react-markdown';
import { useChat } from '../context/ChatContext';
import toast from 'react-hot-toast';

const Chatbot = () => {
  const { messages, loading, sendMessage, clearChat, generateSampleCOs } = useChat();
  const [input, setInput] = useState('');
  const [showSampleCOModal, setShowSampleCOModal] = useState(false);
  const [sampleCOForm, setSampleCOForm] = useState({ subjectName: '', department: '', semester: '' });
  const [sampleCOLoading, setSampleCOLoading] = useState(false);
  const [sampleCOResult, setSampleCOResult] = useState(null);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const [welcomeShown] = useState(true);
  const welcomeMessage = {
    id: 'welcome',
    text: "Hello! I'm your **AI OBE Assistant** powered by **Gemini AI** 🤖\n\nI'm specialized in Outcome Based Education and can help you with:\n\n• 📚 **Course Outcome (CO) Generation** — from your syllabus\n• 🔗 **CO-PO-PSO Mapping** — with strength levels (1/2/3)\n• 🧠 **Bloom's Taxonomy** — classify questions automatically\n• 📊 **Attainment Calculation** — Level 1 (≥50%), Level 2 (≥60%), Level 3 (≥70%)\n• 🏆 **NBA Accreditation** — SAR preparation and reports\n• 📝 **Marks Analysis** — upload and track student performance\n\nAsk me anything!",
    sender: 'bot',
    timestamp: new Date().toLocaleTimeString()
  };

  const allMessages = welcomeShown ? [welcomeMessage, ...messages] : messages;

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const handleSend = async (e) => {
    e?.preventDefault();
    const trimmed = input.trim();
    if (!trimmed || loading) return;
    setInput('');
    await sendMessage(trimmed);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleSuggestionClick = async (suggestion) => {
    setInput('');
    await sendMessage(suggestion);
  };

  const handleClearChat = () => {
    clearChat();
    toast.success('Chat cleared');
  };

  const handleGenerateSampleCOs = async (e) => {
    e.preventDefault();
    if (!sampleCOForm.subjectName.trim()) {
      toast.error('Please enter a subject name');
      return;
    }
    setSampleCOLoading(true);
    try {
      const result = await generateSampleCOs(
        sampleCOForm.subjectName,
        sampleCOForm.department,
        sampleCOForm.semester
      );
      setSampleCOResult(result);
    } catch (err) {
      toast.error('Failed to generate sample COs');
    } finally {
      setSampleCOLoading(false);
    }
  };

  const quickActions = [
    {
      icon: AcademicCapIcon,
      label: 'Generate CO',
      color: 'blue',
      query: 'How do I generate Course Outcomes from my syllabus? Give me step-by-step instructions.'
    },
    {
      icon: BeakerIcon,
      label: "Bloom's Taxonomy",
      color: 'purple',
      query: "Explain all 6 levels of Bloom's Taxonomy with examples relevant to engineering courses."
    },
    {
      icon: ChartBarIcon,
      label: 'CO Attainment',
      color: 'green',
      query: 'How is CO attainment calculated? Show me the formula, thresholds, and a worked example.'
    },
    {
      icon: DocumentTextIcon,
      label: 'CO-PO Mapping',
      color: 'orange',
      query: 'Explain CO-PO mapping. How do I decide the mapping strength (1, 2, or 3)?'
    },
    {
      icon: PresentationChartBarIcon,
      label: 'PO Attainment',
      color: 'red',
      query: 'How is PO attainment calculated from CO attainments? Explain with an example matrix.'
    },
    {
      icon: ClipboardDocumentListIcon,
      label: 'NBA Reports',
      color: 'teal',
      query: 'What reports are needed for NBA accreditation? How does this system help generate them?'
    },
    {
      icon: BookOpenIcon,
      label: 'Marks Upload',
      color: 'indigo',
      query: 'How do I upload student marks? What is the Excel format required?'
    },
    {
      icon: LightBulbIcon,
      label: 'Sample COs',
      color: 'yellow',
      isModal: true
    }
  ];

  const suggestions = [
    "What is the difference between PO and PSO?",
    "How to write a good Course Outcome?",
    "What is direct attainment vs indirect attainment?",
    "How many COs should a course have?",
    "Explain the NBA 12 Program Outcomes",
    "What is the pass threshold for attainment calculation?"
  ];

  const colorMap = {
    blue: 'bg-blue-100 text-blue-600',
    purple: 'bg-purple-100 text-purple-600',
    green: 'bg-green-100 text-green-600',
    orange: 'bg-orange-100 text-orange-600',
    red: 'bg-red-100 text-red-600',
    teal: 'bg-teal-100 text-teal-600',
    indigo: 'bg-indigo-100 text-indigo-600',
    yellow: 'bg-yellow-100 text-yellow-600'
  };

  return (
    <div className="h-[calc(100vh-80px)] flex gap-4 p-4">

      {/* Left Panel — Quick Actions & Suggestions */}
      <div className="w-64 flex-shrink-0 flex flex-col gap-4">
        {/* Quick Actions */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
          <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center">
            <SparklesIcon className="h-4 w-4 mr-1 text-purple-500" />
            Quick Topics
          </h3>
          <div className="grid grid-cols-2 gap-2">
            {quickActions.map((action, index) => (
              <button
                key={index}
                onClick={() => action.isModal ? setShowSampleCOModal(true) : handleSuggestionClick(action.query)}
                disabled={loading}
                className="flex flex-col items-center p-2 hover:bg-gray-50 rounded-lg transition-all group border border-gray-100 disabled:opacity-50"
              >
                <div className={`p-2 rounded-lg mb-1 group-hover:scale-110 transition-transform ${colorMap[action.color]}`}>
                  <action.icon className="h-4 w-4" />
                </div>
                <span className="text-xs text-gray-600 text-center leading-tight">{action.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Suggested Questions */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 flex-1">
          <h3 className="text-sm font-semibold text-gray-700 mb-3">💡 Suggested Questions</h3>
          <div className="space-y-2">
            {suggestions.map((s, i) => (
              <button
                key={i}
                onClick={() => handleSuggestionClick(s)}
                disabled={loading}
                className="w-full text-left text-xs text-gray-600 hover:text-blue-600 hover:bg-blue-50 p-2 rounded-lg transition-all disabled:opacity-50 border border-transparent hover:border-blue-100"
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">

        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4 text-white flex-shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="p-2 bg-white bg-opacity-20 rounded-lg">
                <ChatBubbleLeftRightIcon className="h-5 w-5" />
              </div>
              <div className="ml-3">
                <h2 className="font-semibold flex items-center">
                  AI OBE Assistant
                  <SparklesIcon className="h-4 w-4 ml-2 text-yellow-300" />
                </h2>
                <p className="text-xs text-blue-100 flex items-center">
                  <span className="w-2 h-2 bg-green-400 rounded-full mr-1 inline-block animate-pulse"></span>
                  Powered by Gemini AI • OBE Expert
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs bg-white bg-opacity-20 px-2 py-1 rounded-full">
                {allMessages.length - 1} messages
              </span>
              <button
                onClick={handleClearChat}
                className="p-1.5 hover:bg-white hover:bg-opacity-20 rounded-lg transition-all"
                title="Clear chat"
              >
                <ArrowPathIcon className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto bg-gray-50 p-4 space-y-4">
          <AnimatePresence>
            {allMessages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-[80%] rounded-2xl p-4 ${
                  message.sender === 'user'
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-br-none'
                    : 'bg-white border border-gray-200 text-gray-800 rounded-bl-none shadow-sm'
                }`}>
                  {message.sender === 'bot' && (
                    <div className="flex items-center mb-2 space-x-1">
                      <SparklesIcon className="h-3.5 w-3.5 text-purple-500" />
                      <span className="text-xs font-medium text-purple-600">AI Assistant</span>
                      {message.powered_by && (
                        <span className="text-xs text-gray-400">• {message.powered_by}</span>
                      )}
                    </div>
                  )}

                  {message.sender === 'bot' ? (
                    <div className="text-sm prose prose-sm max-w-none text-gray-800">
                      <ReactMarkdown
                        components={{
                          strong: ({ children }) => <strong className="font-bold text-gray-900">{children}</strong>,
                          p: ({ children }) => <p className="mb-2 last:mb-0 leading-relaxed">{children}</p>,
                          ul: ({ children }) => <ul className="list-disc list-inside mb-2 space-y-1">{children}</ul>,
                          ol: ({ children }) => <ol className="list-decimal list-inside mb-2 space-y-1">{children}</ol>,
                          li: ({ children }) => <li className="text-sm">{children}</li>,
                          h1: ({ children }) => <h1 className="font-bold text-base mt-3 mb-1">{children}</h1>,
                          h2: ({ children }) => <h2 className="font-bold text-base mt-3 mb-1">{children}</h2>,
                          h3: ({ children }) => <h3 className="font-semibold text-sm mt-2 mb-1">{children}</h3>,
                          code: ({ children }) => <code className="bg-gray-100 px-1 py-0.5 rounded text-xs font-mono">{children}</code>,
                          blockquote: ({ children }) => <blockquote className="border-l-4 border-blue-300 pl-3 italic text-gray-600 my-2">{children}</blockquote>,
                        }}
                      >
                        {message.text}
                      </ReactMarkdown>
                    </div>
                  ) : (
                    <p className="text-sm">{message.text}</p>
                  )}

                  {message.isError && (
                    <p className="text-xs text-red-400 mt-1">⚠ Connection error</p>
                  )}

                  <p className={`text-xs mt-2 ${message.sender === 'user' ? 'text-blue-100' : 'text-gray-400'}`}>
                    {message.timestamp}
                  </p>
                </div>
              </motion.div>
            ))}

            {loading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex justify-start"
              >
                <div className="bg-white border border-gray-200 rounded-2xl rounded-bl-none p-4 shadow-sm">
                  <div className="flex items-center space-x-2">
                    <div className="flex space-x-1">
                      {[0, 0.2, 0.4].map((delay, i) => (
                        <motion.div
                          key={i}
                          animate={{ y: [0, -5, 0] }}
                          transition={{ duration: 0.8, repeat: Infinity, delay }}
                          className="w-2 h-2 bg-purple-400 rounded-full"
                        />
                      ))}
                    </div>
                    <span className="text-xs text-gray-400">Gemini AI is thinking...</span>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="bg-white p-4 border-t border-gray-200 flex-shrink-0">
          <form onSubmit={handleSend} className="flex gap-3 items-center">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask anything about OBE, CO generation, attainment, NBA..."
              disabled={loading}
              className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm disabled:bg-gray-50"
            />
            <button
              type="submit"
              disabled={!input.trim() || loading}
              className="px-5 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 disabled:opacity-40 transition-all flex items-center gap-2 font-medium text-sm"
            >
              <PaperAirplaneIcon className="h-4 w-4" />
              Send
            </button>
          </form>
          <p className="text-xs text-gray-400 mt-2 text-center">
            🤖 Powered by Google Gemini AI • Specialized in OBE & NBA Accreditation
          </p>
        </div>
      </div>

      {/* Sample CO Generator Modal */}
      <AnimatePresence>
        {showSampleCOModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            onClick={(e) => e.target === e.currentTarget && setShowSampleCOModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[80vh] overflow-y-auto"
            >
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-5 text-white rounded-t-2xl">
                <h3 className="text-lg font-semibold flex items-center">
                  <LightBulbIcon className="h-5 w-5 mr-2" />
                  Generate Sample Course Outcomes
                </h3>
                <p className="text-sm text-blue-100 mt-1">AI will generate 5 well-structured COs for your subject</p>
              </div>

              <div className="p-6">
                <form onSubmit={handleGenerateSampleCOs} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Subject Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={sampleCOForm.subjectName}
                      onChange={(e) => setSampleCOForm(p => ({ ...p, subjectName: e.target.value }))}
                      placeholder="e.g., Data Structures and Algorithms"
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
                      <input
                        type="text"
                        value={sampleCOForm.department}
                        onChange={(e) => setSampleCOForm(p => ({ ...p, department: e.target.value }))}
                        placeholder="e.g., Computer Science"
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Semester</label>
                      <select
                        value={sampleCOForm.semester}
                        onChange={(e) => setSampleCOForm(p => ({ ...p, semester: e.target.value }))}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                      >
                        <option value="">Select Semester</option>
                        {[1,2,3,4,5,6,7,8].map(s => (
                          <option key={s} value={s}>Semester {s}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <button
                    type="submit"
                    disabled={sampleCOLoading}
                    className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 transition-all flex items-center justify-center gap-2"
                  >
                    {sampleCOLoading ? (
                      <>
                        <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}>
                          <ArrowPathIcon className="h-4 w-4" />
                        </motion.div>
                        Generating with Gemini AI...
                      </>
                    ) : (
                      <>
                        <SparklesIcon className="h-4 w-4" />
                        Generate Sample COs
                      </>
                    )}
                  </button>
                </form>

                {/* Results */}
                {sampleCOResult && (
                  <div className="mt-6">
                    <h4 className="font-semibold text-gray-800 mb-3 flex items-center">
                      <AcademicCapIcon className="h-4 w-4 mr-2 text-blue-600" />
                      Generated COs for: {sampleCOResult.subjectName}
                    </h4>
                    <div className="space-y-3">
                      {sampleCOResult.cos?.map((co, i) => (
                        <div key={i} className="border border-gray-200 rounded-lg p-3 bg-gray-50">
                          <div className="flex items-start justify-between mb-1">
                            <span className="font-semibold text-blue-700 text-sm">{co.code}</span>
                            <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                              co.bloomLevel === 'Create' ? 'bg-red-100 text-red-700' :
                              co.bloomLevel === 'Evaluate' ? 'bg-orange-100 text-orange-700' :
                              co.bloomLevel === 'Analyze' ? 'bg-yellow-100 text-yellow-700' :
                              co.bloomLevel === 'Apply' ? 'bg-green-100 text-green-700' :
                              co.bloomLevel === 'Understand' ? 'bg-blue-100 text-blue-700' :
                              'bg-gray-100 text-gray-700'
                            }`}>
                              {co.bloomLevel}
                            </span>
                          </div>
                          <p className="text-sm text-gray-700 mb-2">{co.description}</p>
                          <div className="flex flex-wrap gap-1">
                            {co.suggestedPOs?.map(po => (
                              <span key={po} className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">{po}</span>
                            ))}
                            {co.suggestedPSOs?.map(pso => (
                              <span key={pso} className="text-xs bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full">{pso}</span>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                    <button
                      onClick={() => {
                        setShowSampleCOModal(false);
                        setSampleCOResult(null);
                        setSampleCOForm({ subjectName: '', department: '', semester: '' });
                      }}
                      className="mt-4 w-full py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 text-sm transition-all"
                    >
                      Close
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Chatbot;
