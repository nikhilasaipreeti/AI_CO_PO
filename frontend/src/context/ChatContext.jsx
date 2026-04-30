import React, { createContext, useState, useContext, useCallback } from 'react';
import api from '../services/api';
import toast from 'react-hot-toast';

const ChatContext = createContext();

export const useChat = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useChat must be used within ChatProvider');
  }
  return context;
};

export const ChatProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState([
    "How do I generate Course Outcomes?",
    "Explain Bloom's Taxonomy",
    "How is CO attainment calculated?",
    "What is CO-PO mapping?",
    "NBA accreditation requirements",
    "How to upload student marks?"
  ]);

  // Send message to real Gemini AI backend
  const sendMessage = useCallback(async (text, courseContext = null) => {
    const userMessage = {
      id: Date.now(),
      text,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString()
    };
    setMessages(prev => [...prev, userMessage]);
    setLoading(true);

    try {
      const response = await api.post('/chat/message', {
        message: text,
        courseContext: courseContext || null
      });

      const botResponse = {
        id: Date.now() + 1,
        text: response.data.data.response,
        sender: 'bot',
        timestamp: new Date().toLocaleTimeString(),
        powered_by: 'Gemini AI'
      };
      setMessages(prev => [...prev, botResponse]);

    } catch (error) {
      console.error('Chat error:', error);
      const errorMessage = {
        id: Date.now() + 1,
        text: "Sorry, I couldn't connect to the AI service. Please check your connection and try again.",
        sender: 'bot',
        timestamp: new Date().toLocaleTimeString(),
        isError: true
      };
      setMessages(prev => [...prev, errorMessage]);
      toast.error('Failed to get AI response');
    } finally {
      setLoading(false);
    }
  }, []);

  // Explain a concept
  const explainConcept = useCallback(async (concept) => {
    try {
      const response = await api.post('/chat/explain', { concept });
      return response.data.data.explanation;
    } catch (error) {
      console.error('Explain error:', error);
      return null;
    }
  }, []);

  // Suggest CO-PO mapping
  const suggestMapping = useCallback(async (coDescription, bloomLevel, coCode) => {
    try {
      const response = await api.post('/chat/suggest-mapping', {
        coDescription,
        bloomLevel,
        coCode
      });
      return response.data.data;
    } catch (error) {
      console.error('Suggest mapping error:', error);
      return null;
    }
  }, []);

  // Generate sample COs for a subject
  const generateSampleCOs = useCallback(async (subjectName, department, semester) => {
    try {
      const response = await api.post('/chat/generate-sample-cos', {
        subjectName,
        department,
        semester
      });
      return response.data.data;
    } catch (error) {
      console.error('Generate sample COs error:', error);
      return null;
    }
  }, []);

  const clearChat = useCallback(() => {
    setMessages([]);
  }, []);

  const value = {
    messages,
    loading,
    suggestions,
    sendMessage,
    explainConcept,
    suggestMapping,
    generateSampleCOs,
    clearChat
  };

  return (
    <ChatContext.Provider value={value}>
      {children}
    </ChatContext.Provider>
  );
};
