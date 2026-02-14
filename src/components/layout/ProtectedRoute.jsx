import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { CenterContainer } from '../../styles/MinimalStyles';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <CenterContainer>
        <div>Loading...</div>
      </CenterContainer>
    );
  }

  // Token validation now handled centrally by AuthContext
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
