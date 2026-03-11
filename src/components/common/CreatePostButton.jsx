import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useAuth } from '../../context/AuthContext';

const ButtonContainer = styled.div`
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  z-index: 999;
  
  @media (max-width: 768px) {
    bottom: 1.75rem;
    right: 1.75rem;
    z-index: 998;
  }
  
  @media (max-width: 480px) {
    bottom: 1.5rem;
    right: 1.5rem;
    z-index: 997;
  }
`;

const CreatePostButton = styled.button`
  background: 
    linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
  color: white;
  border: 1px solid rgba(59, 130, 246, 0.5);
  border-radius: 50%;
  width: 64px;
  height: 64px;
  font-size: 28px;
  font-weight: 300;
  cursor: pointer;
  box-shadow: 
    0 8px 25px rgba(59, 130, 246, 0.4),
    0 0 20px rgba(59, 130, 246, 0.2),
    inset 0 1px 0 rgba(255, 255, 255, 0.2);
  transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(10px);
  position: relative;
  overflow: hidden;
  
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
    background: 
      linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);
    transform: translateY(-3px) scale(1.05);
    box-shadow: 
      0 12px 35px rgba(59, 130, 246, 0.5),
      0 0 30px rgba(59, 130, 246, 0.3),
      inset 0 1px 0 rgba(255, 255, 255, 0.3);
    border-color: rgba(59, 130, 246, 0.7);
    
    &::before {
      left: 100%;
    }
  }
  
  &:active {
    transform: translateY(-1px) scale(0.98);
  }
  
  @media (max-width: 768px) {
    width: 56px;
    height: 56px;
    font-size: 24px;
    
    &:hover {
      transform: translateY(-2px) scale(1.03);
    }
  }
  
  @media (max-width: 480px) {
    width: 48px;
    height: 48px;
    font-size: 20px;
    
    &:hover {
      transform: translateY(-1px) scale(1.02);
    }
  }
`;

const CreatePostButtonComponent = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const handleClick = () => {
    navigate('/create-post');
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <ButtonContainer>
      <CreatePostButton
        onClick={handleClick}
        aria-label="Create new post"
        title="Create Post"
      >
        +
      </CreatePostButton>
    </ButtonContainer>
  );
};

export default CreatePostButtonComponent;
