// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import { ChatProvider } from './context/ChatContext';
import { ThemeProvider } from './context/ThemeContext';
import { NotificationProvider } from './context/NotificationContext';

// Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import Dashboard from './pages/Dashboard';
import Courses from './pages/Courses';
import CourseDetails from './pages/CourseDetails';
import GenerateCO from './pages/GenerateCo';
import Assessments from './pages/Assessments';
import QuestionMapping from './pages/QuestionMapping';
import MarksEntry from './pages/MarksEntry';
import Attainment from './pages/Attainment';
import Reports from './pages/Reports';
import Chatbot from './pages/Chatbot';
import Settings from './pages/Settings';
import Profile from './pages/Profile';

// Layouts
import MainLayout from './components/layout/MainLayout';

// Protected Route
import PrivateRoute from './components/common/PrivateRoute';

// Chat Components
import ChatFab from './components/chatbot/ChatFab';
import ChatWindow from './components/chatbot/ChatWindow';

function App() {
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <Router>
      <ThemeProvider>
        <AuthProvider>
          <NotificationProvider>
            <ChatProvider>
              <div className="min-h-screen" style={{ background: '#fdf6ee' }}>
                <Toaster 
                  position="top-right"
                  toastOptions={{
                    duration: 4000,
                    style: {
                      background: '#363636',
                      color: '#fff',
                    },
                  }}
                />
                
                <Routes>
                  {/* Public Routes */}
                  <Route path="/" element={<Home />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/forgot-password" element={<ForgotPassword />} />
                  
                  {/* Protected Routes with MainLayout */}
                  <Route element={<PrivateRoute />}>
                    <Route element={<MainLayout />}>
                      <Route path="/dashboard" element={<Dashboard />} />
                      <Route path="/courses" element={<Courses />} />
                      <Route path="/courses/:id" element={<CourseDetails />} />
                      <Route path="/generate-co" element={<GenerateCO />} />
                      <Route path="/assessments" element={<Assessments />} />
                      <Route path="/question-mapping" element={<QuestionMapping />} />
                      <Route path="/marks-entry" element={<MarksEntry />} />
                      <Route path="/attainment" element={<Attainment />} />
                      <Route path="/reports" element={<Reports />} />
                      <Route path="/chatbot" element={<Chatbot />} />
                      <Route path="/settings" element={<Settings />} />
                      <Route path="/profile" element={<Profile />} />
                    </Route>
                  </Route>
                  
                  {/* Fallback */}
                  <Route path="*" element={<Navigate to="/" />} />
                </Routes>

                {/* Global Chat Components - These will appear on all pages */}
                <ChatFab isOpen={isChatOpen} onClick={() => setIsChatOpen(true)} />
                <ChatWindow isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
              </div>
            </ChatProvider>
          </NotificationProvider>
        </AuthProvider>
      </ThemeProvider>
    </Router>
  );
}

export default App;