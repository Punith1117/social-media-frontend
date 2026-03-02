import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { isTokenValid } from '../../utils/tokenUtils';
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

  // Immediate token validation check
  if (!isAuthenticated || !isTokenValid()) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
