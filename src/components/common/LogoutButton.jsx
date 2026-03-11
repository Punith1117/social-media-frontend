import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { LogOut } from 'lucide-react';
import styled from 'styled-components';

// Centralized colors for consistent theming
const COLORS = {
  danger: '#dc3545',
  dangerLight: 'rgba(220, 53, 69, 0.2)',
  dangerBorder: 'rgba(220, 53, 69, 0.3)'
};

const ButtonContainer = styled.div`
  position: fixed;
  bottom: 2rem;
  left: 2rem;
  z-index: 1000;
  
  @media (max-width: 768px) {
    bottom: 1.75rem;
    left: 1.75rem;
    z-index: 999;
  }
  
  @media (max-width: 480px) {
    bottom: 1.5rem;
    left: 1.5rem;
    z-index: 998;
  }
`;

const LogoutButton = styled.button`
  background: ${COLORS.danger};
  color: white;
  border: 1px solid ${COLORS.dangerBorder};
  border-radius: 50%;
  cursor: pointer;
  backdrop-filter: blur(10px);
  width: 56px;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(220, 53, 69, 0.3);

  &:hover {
    background: #c82333;
    box-shadow: 0 6px 20px rgba(220, 53, 69, 0.4);
    border-color: rgba(220, 53, 69, 0.5);
  }

  &:active {
    transform: scale(0.95);
  }

  @media (max-width: 768px) {
    width: 48px;
    height: 48px;
  }
  
  @media (max-width: 480px) {
    width: 44px;
    height: 44px;
  }
`;

const Logout = () => {
  const { logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (!isAuthenticated) return null;

  return (
    <ButtonContainer>
      <LogoutButton onClick={handleLogout} title="Logout">
        <LogOut size={24} />
      </LogoutButton>
    </ButtonContainer>
  );
};

export default Logout;
