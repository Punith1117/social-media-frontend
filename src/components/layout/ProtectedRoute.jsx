import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { isTokenValid } from '../../utils/tokenUtils';
import { CenterContainer } from '../../styles/MinimalStyles';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading, logout } = useAuth();

  useEffect(() => {
    if (!loading && (!isAuthenticated || !isTokenValid())) {
      logout();
    }
  }, [isAuthenticated, loading, logout]);

  if (loading) {
    return (
      <CenterContainer>
        <div>Loading...</div>
      </CenterContainer>
    );
  }

  if (!isAuthenticated || !isTokenValid()) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
