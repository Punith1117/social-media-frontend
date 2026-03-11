import styled from 'styled-components';

// Centralized colors for consistent theming
const COLORS = {
  primary: '#3b82f6',
  primaryLight: 'rgba(59, 130, 246, 0.2)',
  primaryBorder: 'rgba(59, 130, 246, 0.3)',
  background: 'rgba(20, 15, 15, 0.98)',
  text: '#e8d5c7',
  textLight: '#a8a29e',
  danger: '#dc3545'
};

export const CommentsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  @media (max-width: 768px) {
    gap: 0.75rem;
  }
`;

export const CommentsHeader = styled.h3`
  margin-bottom: 1rem;
  color: ${COLORS.text};
  font-weight: 700;
  font-size: 1.3rem;
  text-transform: uppercase;
  letter-spacing: 0.02em;

  &::after {
    content: '';
    position: absolute;
    bottom: -8px;
    left: 0;
    width: 60px;
    height: 3px;
    background: ${COLORS.primary};
    border-radius: 2px;
  }
`;

export const CommentForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
  padding: 1.5rem;
  background: ${COLORS.background};
  border-radius: 16px;
  border: 1px solid ${COLORS.primaryBorder};
  backdrop-filter: blur(15px);
  transition: all 0.3s ease;

  &:hover {
    border-color: ${COLORS.primary};
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
  }

  @media (max-width: 768px) {
    padding: 1rem;
    margin-bottom: 1rem;
  }
`;

export const CommentTextarea = styled.textarea`
  width: 100%;
  min-height: 100px;
  padding: 1rem;
  border: 1px solid ${COLORS.primaryBorder};
  border-radius: 12px;
  font-family: inherit;
  font-size: 0.95rem;
  background: ${COLORS.background};
  color: ${COLORS.text};
  resize: vertical;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);

  &::placeholder {
    color: ${COLORS.textLight};
    font-style: italic;
  }

  &:focus {
    outline: none;
    border-color: ${COLORS.primary};
    box-shadow: 0 0 0 2px ${COLORS.primaryLight};
  }

  &:hover:not(:focus) {
    border-color: ${COLORS.primary};
  }
`;

export const CharacterCounter = styled.div`
  font-size: 0.8rem;
  color: ${props => props.$overLimit ? COLORS.danger : COLORS.textLight};
  text-align: right;
  font-weight: 500;
  transition: all 0.3s ease;
`;

export const SubmitButton = styled.button`
  background: ${props => props.disabled 
    ? 'rgba(59, 130, 246, 0.1)' 
    : COLORS.primary};
  color: ${props => props.disabled ? COLORS.textLight : '#ffffff'};
  border: 1px solid ${props => props.disabled 
    ? COLORS.primaryBorder
    : COLORS.primary};
  padding: 0.75rem 1.5rem;
  border-radius: 12px;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  font-size: 0.9rem;
  font-weight: 600;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);

  &:hover:not(:disabled) {
    filter: brightness(1.2);
  }

  &:active:not(:disabled) {
    transform: translateY(1px);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export const ErrorMessage = styled.div`
  color: ${COLORS.danger};
  font-size: 0.85rem;
  margin-top: 0.5rem;
  padding: 0.5rem 0.75rem;
  background: rgba(220, 53, 69, 0.1);
  border: 1px solid rgba(220, 53, 69, 0.3);
  border-radius: 8px;
  font-weight: 500;
  animation: shake 0.3s ease-in-out;

  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    25% { transform: translateX(-5px); }
    75% { transform: translateX(5px); }
  }
`;

export const LoadingMessage = styled.div`
  text-align: center;
  color: ${COLORS.textLight};
  padding: 1.5rem;
  font-size: 1rem;
  font-weight: 500;
  background: ${COLORS.primaryLight};
  border: 1px solid ${COLORS.primaryBorder};
  border-radius: 12px;
`;

export const NoComments = styled.div`
  text-align: center;
  color: ${COLORS.textLight};
  font-style: italic;
  padding: 1.5rem;
  font-size: 1rem;
  background: ${COLORS.primaryLight};
  border: 1px solid ${COLORS.primaryBorder};
  border-radius: 12px;
`;
