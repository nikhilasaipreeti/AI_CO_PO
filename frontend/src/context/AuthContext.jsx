// src/context/AuthContext.jsx
import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api'; // You're importing api but not using it
import toast from 'react-hot-toast';

export const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Check for existing session on app load
  useEffect(() => {
    const token = localStorage.getItem('token');
    const savedUser = localStorage.getItem('user');
    
    if (token && savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = async (email, password) => {
    setLoading(true);
    try {
      console.log('Attempting login with:', { email, password });
      
      // FIXED: Use api instead of axios
      const response = await api.post('/auth/login', {
        email,
        password
      });

      console.log('Login response:', response.data);

      if (response.data.success) {
        const userData = response.data.user;
        const token = response.data.token;
        
        setUser(userData);
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(userData));
        
        toast.success('Login successful!');
        navigate('/dashboard');
        return { success: true, user: userData };
      } else {
        toast.error(response.data.message || 'Login failed');
        return { success: false, message: response.data.message };
      }
    } catch (error) {
      console.error('Login error details:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
      });
      
      if (error.response) {
        // Server responded with error
        const errorMessage = error.response.data.message || 'Invalid credentials';
        toast.error(errorMessage);
        return { success: false, message: errorMessage };
      } else if (error.request) {
        // Request made but no response
        toast.error('Cannot connect to server. Please check if backend is running on port 5000');
        return { success: false, message: 'Network error - backend not reachable' };
      } else {
        // Something else happened
        toast.error('An error occurred. Please try again.');
        return { success: false, message: error.message };
      }
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData) => {
    setLoading(true);
    try {
      console.log('Registering user:', userData);
      
      // FIXED: Use api instead of axios
      const response = await api.post('/auth/register', userData);
      
      console.log('Register response:', response.data);

      if (response.data.success) {
        toast.success('Registration successful! Please login.');
        navigate('/login');
        return { success: true };
      } else {
        toast.error(response.data.message || 'Registration failed');
        return { success: false, message: response.data.message };
      }
    } catch (error) {
      console.error('Registration error:', error.response?.data || error.message);
      
      if (error.response) {
        toast.error(error.response.data.message || 'Registration failed');
        return { success: false, message: error.response.data.message };
      } else if (error.request) {
        toast.error('Cannot connect to server');
        return { success: false, message: 'Network error' };
      } else {
        toast.error('An error occurred');
        return { success: false, message: error.message };
      }
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    toast.success('Logged out successfully');
    navigate('/login');
  };

  const value = {
    user,
    loading,
    login,
    register,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};