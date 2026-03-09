import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import styled from 'styled-components';

const LogoutButtonContainer = styled.button`
  padding: 0.5rem 1rem;
  background: 
    linear-gradient(135deg, rgba(108, 117, 125, 0.8) 0%, rgba(73, 80, 87, 0.9) 100%);
  color: white;
  border: 1px solid rgba(220, 53, 69, 0.3);
  border-radius: 10px;
  cursor: pointer;
  font-size: 0.8rem;
  font-weight: 600;
  font-family: 'Inter', sans-serif;
  transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  box-shadow: 
    0 2px 8px rgba(108, 117, 125, 0.2),
    0 0 0 1px rgba(220, 53, 69, 0.2),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  position: relative;
  overflow: hidden;
  white-space: nowrap;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, 
      transparent, 
      rgba(255, 255, 255, 0.15), 
      transparent
    );
    transition: left 0.8s ease;
  }
  
  &:hover {
    background: 
      linear-gradient(135deg, rgba(220, 53, 69, 0.8) 0%, rgba(192, 57, 43, 0.9) 100%);
    transform: translateY(-1px) scale(1.02);
    box-shadow: 
      0 4px 12px rgba(220, 53, 69, 0.3),
      0 0 0 2px rgba(220, 53, 69, 0.3),
      inset 0 1px 0 rgba(255, 255, 255, 0.2);
    border-color: rgba(220, 53, 69, 0.5);
    
    &::before {
      left: 100%;
    }
  }
  
  &:active {
    transform: translateY(0) scale(0.98);
  }

  @media (max-width: 1000px) and (min-width: 768px) {
    padding: 0.4rem 0.6rem;
    font-size: 0.75rem;
  }
  
  @media (max-width: 768px) {
    padding: 0.4rem 0.875rem;
    font-size: 0.75rem;
    
    &:hover {
      transform: translateY(-1px) scale(1.01);
    }
  }
  
  @media (max-width: 480px) {
    padding: 0.375rem 0.75rem;
    font-size: 0.7rem;
    
    &:hover {
      transform: translateY(-1px) scale(1.01);
    }
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
