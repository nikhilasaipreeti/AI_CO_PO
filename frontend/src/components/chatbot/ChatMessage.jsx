import React from 'react';
import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import { SparklesIcon, UserIcon } from '@heroicons/react/24/outline';

const ChatMessage = ({ message, onActionClick }) => {
  if (!message) return null;

  const { text, sender, timestamp, type, actions } = message;

  const getIcon = () => {
    if (type === 'greeting') return <SparklesIcon className="h-4 w-4 text-yellow-500" />;
    if (sender === 'user') return <UserIcon className="h-4 w-4 text-blue-500" />;
    return <SparklesIcon className="h-4 w-4 text-purple-500" />;
  };

  const getMessageStyle = () => {
    if (sender === 'user') {
      return 'bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-br-none';
    }
    return 'bg-white border border-gray-200 text-gray-800 rounded-bl-none shadow-sm';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex ${sender === 'user' ? 'justify-end' : 'justify-start'}`}
    >
      <div className={`max-w-[90%] rounded-2xl p-3 ${getMessageStyle()}`}>
        {sender === 'bot' && (
          <div className="flex items-center mb-2 space-x-1">
            {getIcon()}
            <span className="text-xs font-medium text-purple-600">AI Assistant</span>
          </div>
        )}
        
        <div className={`text-sm prose prose-sm max-w-none ${sender === 'user' ? 'text-white' : 'text-gray-800'}`}>
          <ReactMarkdown
            components={{
              strong: ({ children }) => <span className="font-bold">{children}</span>,
              p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
              ul: ({ children }) => <ul className="list-disc list-inside mb-2 space-y-1">{children}</ul>,
              li: ({ children }) => <li className="text-sm">{children}</li>,
              h3: ({ children }) => <h3 className="font-bold text-base mt-2 mb-1">{children}</h3>,
            }}
          >
            {text}
          </ReactMarkdown>
        </div>

        {/* Action Buttons */}
        {sender === 'bot' && actions && actions.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-3">
            {actions.map((action, index) => (
              <button
                key={index}
                onClick={() => onActionClick(action)}
                className="px-3 py-1 text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full transition-all hover:scale-105"
              >
                {action}
              </button>
            ))}
          </div>
        )}

        <p className={`text-xs mt-2 ${sender === 'user' ? 'text-blue-100' : 'text-gray-400'}`}>
          {timestamp}
        </p>
      </div>
    </motion.div>
  );
};

export default ChatMessage;