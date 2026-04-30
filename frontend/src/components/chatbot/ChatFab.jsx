import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChatBubbleLeftRightIcon, XMarkIcon } from '@heroicons/react/24/outline';

const ChatFab = ({ isOpen, onClick }) => {
  return (
    <AnimatePresence>
      {!isOpen && (
        <motion.button
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={onClick}
          className="fixed bottom-4 right-4 w-14 h-14 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full shadow-lg flex items-center justify-center hover:shadow-xl transition-all z-50"
        >
          <ChatBubbleLeftRightIcon className="h-6 w-6" />
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></span>
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default ChatFab;