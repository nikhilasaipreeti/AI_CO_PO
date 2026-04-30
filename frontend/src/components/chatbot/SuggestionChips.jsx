import React from 'react';
import { motion } from 'framer-motion';

const SuggestionChips = ({ suggestions, onSuggestionClick }) => {
  return (
    <div className="flex flex-wrap gap-2">
      {suggestions.map((suggestion, index) => (
        <motion.button
          key={index}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: index * 0.05 }}
          onClick={() => onSuggestionClick(suggestion)}
          className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full text-sm transition-all hover:scale-105"
        >
          {suggestion}
        </motion.button>
      ))}
    </div>
  );
};

export default SuggestionChips;