import React, { useState } from 'react';
import { PaperAirplaneIcon, PaperClipIcon } from '@heroicons/react/24/outline';

const ChatInput = ({ value, onChange, onSend, loading }) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onSend();
    }
  };

  return (
    <div className="bg-white p-4 border-t border-gray-200">
      <div className="flex items-end gap-2">
        <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-all">
          <PaperClipIcon className="h-5 w-5" />
        </button>
        
        <div className="flex-1 relative">
          <textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onKeyPress={handleKeyPress}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder="Type your message..."
            rows="1"
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 resize-none transition-all ${
              isFocused ? 'border-blue-500 ring-2 ring-blue-200' : 'border-gray-300'
            }`}
            style={{ minHeight: '40px', maxHeight: '120px' }}
          />
        </div>

        <button
          onClick={onSend}
          disabled={!value.trim() || loading}
          className={`p-2 rounded-lg transition-all ${
            value.trim() && !loading
              ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700'
              : 'bg-gray-100 text-gray-400 cursor-not-allowed'
          }`}
        >
          <PaperAirplaneIcon className="h-5 w-5" />
        </button>
      </div>

      {/* Character count */}
      {value.length > 0 && (
        <div className="text-right mt-1">
          <span className={`text-xs ${value.length > 500 ? 'text-orange-500' : 'text-gray-400'}`}>
            {value.length}/500
          </span>
        </div>
      )}
    </div>
  );
};

export default ChatInput;