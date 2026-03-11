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
  background: ${props => props.theme.colors.primary};
  color: white;
  border: 1px solid ${props => props.theme.colors.primaryBorder};
  border-radius: 50%;
  width: 64px;
  height: 64px;
  font-size: 28px;
  font-weight: 300;
  cursor: pointer;
  box-shadow: 0 8px 25px rgba(59, 130, 246, 0.4);
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(10px);

  &:hover {
    background: #2563eb;
    box-shadow: 0 12px 35px rgba(59, 130, 246, 0.5);
    border-color: rgba(59, 130, 246, 0.7);
  }

  &:active {
    transform: scale(0.95);
  }
  
  @media (max-width: 768px) {
    width: 56px;
    height: 56px;
    font-size: 24px;
  }
  
  @media (max-width: 480px) {
    width: 48px;
    height: 48px;
    font-size: 20px;
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
