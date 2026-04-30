import React from 'react';
import { motion } from 'framer-motion';

const TypingIndicator = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex justify-start"
    >
      <div className="bg-white border border-gray-200 rounded-2xl rounded-bl-none p-4 shadow-sm">
        <div className="flex space-x-1">
          <motion.div
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut", delay: 0 }}
            className="w-2 h-2 bg-gray-400 rounded-full"
          />
          <motion.div
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
            className="w-2 h-2 bg-gray-400 rounded-full"
          />
          <motion.div
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
            className="w-2 h-2 bg-gray-400 rounded-full"
          />
        </div>
      </div>
    </motion.div>
  );
};

export default TypingIndicator;