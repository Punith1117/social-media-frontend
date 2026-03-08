import styled from 'styled-components';

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
  color: #e8d5c7;
  font-weight: 700;
  font-size: 1.3rem;
  text-transform: uppercase;
  letter-spacing: 0.02em;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: -8px;
    left: 0;
    width: 60px;
    height: 3px;
    background: linear-gradient(90deg, #dc3545, #8b4513);
    border-radius: 2px;
  }
`;

export const CommentForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
  padding: 1.5rem;
  background: 
    radial-gradient(ellipse at top, rgba(220, 53, 69, 0.1) 0%, transparent 50%),
    linear-gradient(135deg, rgba(20, 15, 15, 0.9) 0%, rgba(15, 10, 10, 0.8) 100%);
  border-radius: 16px;
  border: 1px solid rgba(220, 53, 69, 0.3);
  backdrop-filter: blur(15px);
  transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: linear-gradient(90deg, 
      transparent, 
      rgba(220, 53, 69, 0.6), 
      rgba(139, 69, 19, 0.4),
      rgba(220, 53, 69, 0.6),
      transparent
    );
    opacity: 0.7;
  }

  &:hover {
    border-color: rgba(220, 53, 69, 0.5);
    box-shadow: 
      0 8px 25px rgba(0, 0, 0, 0.3),
      0 0 20px rgba(220, 53, 69, 0.2);
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
  border: 1px solid rgba(220, 53, 69, 0.3);
  border-radius: 12px;
  font-family: inherit;
  font-size: 0.95rem;
  background: rgba(20, 15, 15, 0.7);
  color: #d4c5a7;
  resize: vertical;
  transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  backdrop-filter: blur(10px);

  &::placeholder {
    color: #a8a29e;
    font-style: italic;
  }
  
  &:focus {
    outline: none;
    border-color: rgba(220, 53, 69, 0.6);
    background: rgba(20, 15, 15, 0.8);
    box-shadow: 
      0 0 20px rgba(220, 53, 69, 0.2),
      inset 0 1px 0 rgba(220, 53, 69, 0.3);
    transform: translateY(-2px);
  }

  &:hover:not(:focus) {
    border-color: rgba(220, 53, 69, 0.5);
    background: rgba(20, 15, 15, 0.75);
  }
`;

export const CharacterCounter = styled.div`
  font-size: 0.8rem;
  color: ${props => props.$overLimit ? '#e74c3c' : '#a8a29e'};
  text-align: right;
  font-weight: 500;
  transition: all 0.3s ease;
`;

export const SubmitButton = styled.button`
  background: ${props => props.disabled 
    ? 'rgba(220, 53, 69, 0.1)' 
    : 'linear-gradient(135deg, rgba(220, 53, 69, 0.8) 0%, rgba(139, 69, 19, 0.6) 100%)'};
  color: ${props => props.disabled ? '#a8a29e' : '#ffffff'};
  border: 1px solid ${props => props.disabled 
    ? 'rgba(220, 53, 69, 0.2)' 
    : 'rgba(220, 53, 69, 0.5)'};
  padding: 0.75rem 1.5rem;
  border-radius: 12px;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  font-size: 0.9rem;
  font-weight: 600;
  transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  position: relative;
  overflow: hidden;
  backdrop-filter: blur(10px);

  &:hover:not(:disabled) {
    background: linear-gradient(135deg, rgba(220, 53, 69, 0.9) 0%, rgba(139, 69, 19, 0.7) 100%);
    border-color: rgba(220, 53, 69, 0.7);
    transform: translateY(-2px);
    box-shadow: 
      0 8px 25px rgba(220, 53, 69, 0.4),
      0 0 20px rgba(220, 53, 69, 0.3);
  }
  
  &:active:not(:disabled) {
    transform: translateY(0) scale(0.98);
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export const ErrorMessage = styled.div`
  color: #e74c3c;
  font-size: 0.85rem;
  margin-top: 0.5rem;
  padding: 0.5rem 0.75rem;
  background: rgba(231, 76, 60, 0.1);
  border: 1px solid rgba(231, 76, 60, 0.3);
  border-radius: 8px;
  font-weight: 500;
  animation: errorShake 0.5s ease-in-out;

  @keyframes errorShake {
    0%, 100% { transform: translateX(0); }
    25% { transform: translateX(-5px); }
    75% { transform: translateX(5px); }
  }
`;

export const LoadingMessage = styled.div`
  text-align: center;
  color: #a8a29e;
  padding: 1.5rem;
  font-size: 1rem;
  font-weight: 500;
  background: rgba(220, 53, 69, 0.05);
  border: 1px solid rgba(220, 53, 69, 0.15);
  border-radius: 12px;
  backdrop-filter: blur(10px);
`;

export const NoComments = styled.div`
  text-align: center;
  color: #a8a29e;
  font-style: italic;
  padding: 1.5rem;
  font-size: 1rem;
  background: rgba(220, 53, 69, 0.05);
  border: 1px solid rgba(220, 53, 69, 0.15);
  border-radius: 12px;
  backdrop-filter: blur(10px);
`;
