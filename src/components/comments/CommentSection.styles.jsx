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
  color: ${props => props.theme.colors.text};
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
    background: ${props => props.theme.colors.primary};
    border-radius: 2px;
  }
`;

export const CommentForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
  padding: 1.5rem;
  background: ${props => props.theme.colors.background};
  border-radius: 16px;
  border: 1px solid ${props => props.theme.colors.primaryBorder};
  backdrop-filter: blur(15px);
  transition: all 0.3s ease;

  &:hover {
    border-color: ${props => props.theme.colors.primary};
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
  border: 1px solid ${props => props.theme.colors.primaryBorder};
  border-radius: 12px;
  font-family: inherit;
  font-size: 0.95rem;
  background: ${props => props.theme.colors.background};
  color: ${props => props.theme.colors.text};
  resize: vertical;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);

  &::placeholder {
    color: ${props => props.theme.colors.textLight};
    font-style: italic;
  }

  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
    box-shadow: 0 0 0 2px ${props => props.theme.colors.primaryLight};
  }

  &:hover:not(:focus) {
    border-color: ${props => props.theme.colors.primary};
  }
`;

export const CharacterCounter = styled.div`
  font-size: 0.8rem;
  color: ${props => props.$overLimit ? props.theme.colors.danger : props.theme.colors.textLight};
  text-align: right;
  font-weight: 500;
  transition: all 0.3s ease;
`;

export const SubmitButton = styled.button`
  background: ${props => props.disabled 
    ? 'rgba(59, 130, 246, 0.1)' 
    : props.theme.colors.primary};
  color: ${props => props.disabled ? props.theme.colors.textLight : '#ffffff'};
  border: 1px solid ${props => props.disabled 
    ? props.theme.colors.primaryBorder
    : props.theme.colors.primary};
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
  color: ${props => props.theme.colors.danger};
  font-size: 0.85rem;
  margin-top: 0.5rem;
  padding: 0.5rem 0.75rem;
  background: ${props => props.theme.colors.dangerLight};
  border: 1px solid ${props => props.theme.colors.dangerBorder};
  border-radius: 8px;
  font-weight: 500;
  animation: ${props => props.theme.animations.shake} 0.3s ease-in-out;
`;

export const LoadingMessage = styled.div`
  text-align: center;
  color: ${props => props.theme.colors.textLight};
  padding: 1.5rem;
  font-size: 1rem;
  font-weight: 500;
  background: ${props => props.theme.colors.primaryLight};
  border: 1px solid ${props => props.theme.colors.primaryBorder};
  border-radius: 12px;
`;

export const NoComments = styled.div`
  text-align: center;
  color: ${props => props.theme.colors.textLight};
  font-style: italic;
  padding: 1.5rem;
  font-size: 1rem;
  background: ${props => props.theme.colors.primaryLight};
  border: 1px solid ${props => props.theme.colors.primaryBorder};
  border-radius: 12px;
`;
