import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  PaperAirplaneIcon,
  ChatBubbleLeftRightIcon,
  XMarkIcon,
  SparklesIcon,
  AcademicCapIcon,
  BeakerIcon,
  DocumentTextIcon,
  ChartBarIcon,
  ArrowPathIcon
} from '@heroicons/react/24/outline';
import ChatMessage from './ChatMessage';
import TypingIndicator from './TypingIndicator';
import { useChat } from '../../context/ChatContext';

const ChatWindow = ({ isOpen, onClose }) => {
  const { messages, loading, sendMessage, clearChat } = useChat();
  const [input, setInput] = useState('');
  const [localMessages, setLocalMessages] = useState([
    {
      id: 'welcome',
      text: "👋 Hello! I'm your **AI Assistant** powered by Gemini AI.\n\nI can help you with:\n\n• **Generating Course Outcomes (COs)** from your syllabus\n• **CO-PO-PSO Mapping** with strength levels\n• **Bloom's Taxonomy** classification\n• **Attainment Calculation** (Level 1/2/3)\n• **NBA Accreditation** requirements & reports\n\nWhat would you like to know?",
      sender: 'bot',
      timestamp: new Date().toLocaleTimeString(),
      type: 'greeting'
    }
  ]);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const suggestions = [
    "How to generate Course Outcomes?",
    "What is Bloom's Taxonomy?",
    "How to calculate CO attainment?",
    "Explain CO-PO mapping",
    "NBA accreditation requirements",
    "Generate sample COs for my course"
  ];

  const quickActions = [
    { icon: AcademicCapIcon, label: 'Generate CO', query: 'How do I generate Course Outcomes from my syllabus?', color: 'blue' },
    { icon: BeakerIcon, label: "Bloom's", query: "Explain Bloom's Taxonomy levels with examples for OBE", color: 'purple' },
    { icon: ChartBarIcon, label: 'Attainment', query: 'How is CO attainment calculated? Show me the formula and an example.', color: 'green' },
    { icon: DocumentTextIcon, label: 'NBA', query: 'What are the NBA accreditation requirements for CO-PO mapping?', color: 'orange' }
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Sync context messages into local display
  useEffect(() => {
    if (messages.length > 0) {
      const contextMessages = messages.map(m => ({
        ...m,
        type: m.sender === 'bot' ? 'response' : 'user'
      }));
      setLocalMessages(prev => {
        // Keep welcome message + add new messages
        const welcome = prev.filter(m => m.id === 'welcome');
        return [...welcome, ...contextMessages];
      });
    }
  }, [messages]);

  useEffect(() => {
    scrollToBottom();
  }, [localMessages, loading]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  const handleSend = async (e) => {
    e?.preventDefault();
    const trimmed = input.trim();
    if (!trimmed || loading) return;

    setInput('');
    setShowSuggestions(false);
    await sendMessage(trimmed);
  };

  const handleSuggestionClick = (suggestion) => {
    setInput(suggestion);
    setShowSuggestions(false);
    inputRef.current?.focus();
  };

  const handleQuickAction = async (query) => {
    setShowSuggestions(false);
    await sendMessage(query);
  };

  const handleClear = () => {
    clearChat();
    setLocalMessages([
      {
        id: 'welcome',
        text: "👋 Hello! I'm your **AI Assistant** powered by Gemini AI.\n\nI can help you with:\n\n• **Generating Course Outcomes (COs)** from your syllabus\n• **CO-PO-PSO Mapping** with strength levels\n• **Bloom's Taxonomy** classification\n• **Attainment Calculation** (Level 1/2/3)\n• **NBA Accreditation** requirements & reports\n\nWhat would you like to know?",
        sender: 'bot',
        timestamp: new Date().toLocaleTimeString(),
        type: 'greeting'
      }
    ]);
    setShowSuggestions(true);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleActionClick = (action) => {
    const routes = {
      'Go to Generate CO': '/generate-co',
      'View Attainment': '/attainment',
      'Generate SAR': '/reports',
      'View Reports': '/reports',
      'Go to Courses': '/courses'
    };
    if (routes[action]) {
      window.location.href = routes[action];
    } else {
      handleSuggestionClick(action);
    }
  };

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.95 }}
      className="fixed bottom-4 right-4 w-96 h-[620px] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-gray-200 z-50"
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4 text-white flex-shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="p-2 bg-white bg-opacity-20 rounded-lg">
              <ChatBubbleLeftRightIcon className="h-5 w-5" />
            </div>
            <div className="ml-3">
              <h3 className="font-semibold flex items-center text-sm">
                AI OBE Assistant
                <SparklesIcon className="h-4 w-4 ml-1 text-yellow-300" />
              </h3>
              <p className="text-xs text-blue-100 flex items-center">
                <span className="w-2 h-2 bg-green-400 rounded-full mr-1 inline-block"></span>
                Powered by Gemini AI
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={handleClear}
              title="Clear chat"
              className="p-1.5 hover:bg-white hover:bg-opacity-20 rounded-lg transition-all"
            >
              <ArrowPathIcon className="h-4 w-4" />
            </button>
            <button
              onClick={onClose}
              className="p-1.5 hover:bg-white hover:bg-opacity-20 rounded-lg transition-all"
            >
              <XMarkIcon className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-gray-50 px-2 py-2 border-b border-gray-200 grid grid-cols-4 gap-1 flex-shrink-0">
        {quickActions.map((action, index) => (
          <button
            key={index}
            onClick={() => handleQuickAction(action.query)}
            disabled={loading}
            className="flex flex-col items-center p-1.5 hover:bg-white rounded-lg transition-all group disabled:opacity-50"
          >
            <div className={`p-1.5 bg-${action.color}-100 rounded-lg mb-1 group-hover:scale-110 transition-transform`}>
              <action.icon className={`h-3.5 w-3.5 text-${action.color}-600`} />
            </div>
            <span className="text-xs text-gray-600 leading-tight text-center">{action.label}</span>
          </button>
        ))}
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-3 space-y-3 bg-gray-50">
        <AnimatePresence>
          {localMessages.map((message) => (
            <ChatMessage
              key={message.id}
              message={message}
              onActionClick={handleActionClick}
            />
          ))}
          {loading && <TypingIndicator />}
        </AnimatePresence>
        <div ref={messagesEndRef} />
      </div>

      {/* Suggestions */}
      {showSuggestions && localMessages.length <= 1 && (
        <div className="bg-white px-3 py-2 border-t border-gray-100 flex-shrink-0">
          <p className="text-xs text-gray-400 mb-1.5">Try asking:</p>
          <div className="flex flex-wrap gap-1.5">
            {suggestions.slice(0, 3).map((s, i) => (
              <button
                key={i}
                onClick={() => handleSuggestionClick(s)}
                className="px-2.5 py-1 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-full text-xs transition-all"
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input */}
      <div className="bg-white p-3 border-t border-gray-200 flex-shrink-0">
        <div className="flex gap-2 items-center">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask about OBE, COs, attainment..."
            disabled={loading}
            className="flex-1 px-3 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm disabled:bg-gray-50"
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || loading}
            className="p-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full hover:from-blue-700 hover:to-purple-700 disabled:opacity-40 transition-all flex-shrink-0"
          >
            <PaperAirplaneIcon className="h-4 w-4" />
          </button>
        </div>
        <p className="text-center text-xs text-gray-400 mt-1.5">Gemini AI • OBE Expert</p>
      </div>
    </motion.div>
  );
};

export default ChatWindow;
