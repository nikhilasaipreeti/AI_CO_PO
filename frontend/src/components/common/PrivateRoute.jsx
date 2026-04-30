import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const PrivateRoute = () => {
  const { user } = useAuth();
  const token = localStorage.getItem('token');

  return token || user ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;