import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useAuth } from '../../context/AuthContext';

const ButtonContainer = styled.div`
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  z-index: 1000;
`;

const CreatePostButton = styled.button`
  background: #007bff;
  color: white;
  border: none;
  border-radius: 50%;
  width: 56px;
  height: 56px;
  font-size: 24px;
  font-weight: 300;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(0, 123, 255, 0.3);
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    background: #0056b3;
    box-shadow: 0 4px 12px rgba(0, 123, 255, 0.4);
  }
  
  &:active {
    transform: scale(0.95);
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
