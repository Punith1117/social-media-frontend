import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { LogOut } from 'lucide-react';
import styled from 'styled-components';

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
  background: rgba(220, 53, 69, 0.9);
  color: white;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  backdrop-filter: blur(10px);
  width: 56px;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  position: relative;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(220, 53, 69, 0.3);

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, 
      transparent, 
      rgba(255, 255, 255, 0.2), 
      transparent
    );
    transition: left 0.8s ease;
  }

  &:hover {
    background: rgba(220, 53, 69, 1);
    transform: translateY(-3px) scale(1.05);
    box-shadow: 0 8px 25px rgba(220, 53, 69, 0.4);
    
    &::before {
      left: 100%;
    }
  }

  &:active {
    transform: translateY(-1px) scale(0.98);
  }

  @media (max-width: 768px) {
    width: 48px;
    height: 48px;
    
    &:hover {
      transform: translateY(-2px) scale(1.03);
    }
  }
  
  @media (max-width: 480px) {
    width: 44px;
    height: 44px;
    
    &:hover {
      transform: translateY(-1px) scale(1.02);
    }
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
