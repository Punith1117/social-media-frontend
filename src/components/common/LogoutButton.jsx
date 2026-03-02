import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import styled from 'styled-components';

const LogoutButtonContainer = styled.button`
  position: fixed;
  bottom: 20px;
  left: 20px;
  padding: 8px 16px;
  background: #ff4444;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  z-index: 1000;
  
  &:hover {
    background: #cc0000;
  }
`;

const LogoutButton = () => {
  const { logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <LogoutButtonContainer onClick={handleLogout}>
      Logout
    </LogoutButtonContainer>
  );
};

export default LogoutButton;
