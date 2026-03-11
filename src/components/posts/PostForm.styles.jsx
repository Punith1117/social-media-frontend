import styled from 'styled-components';

// Centralized colors for consistent theming
const COLORS = {
  primary: '#3b82f6',
  primaryLight: 'rgba(59, 130, 246, 0.2)',
  primaryBorder: 'rgba(59, 130, 246, 0.3)',
  background: 'rgba(20, 15, 15, 0.98)',
  text: '#e8d5c7',
  textLight: '#a8a29e',
  danger: '#dc3545',
  warning: '#f39c12',
  success: '#28a745',
  neutral: '#6c757d'
};

export const FormContainer = styled.div`
  background: ${COLORS.background};
  backdrop-filter: blur(20px);
  border: 1px solid ${COLORS.primaryBorder};
  border-radius: 20px;
  padding: 2rem;
  margin-bottom: 1.5rem;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.4);
  transition: all 0.3s ease;
  animation: fadeIn 0.6s ease-out;

  @keyframes fadeIn {
    from { 
      opacity: 0; 
      transform: translateY(20px); 
    }
    to { 
      opacity: 1; 
      transform: translateY(0); 
    }
  }

  &:hover {
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5);
    border-color: ${COLORS.primary};
  }

  @media (max-width: 768px) {
    padding: 1.5rem;
    border-radius: 16px;
    margin-bottom: 1.25rem;
  }
`;

export const TextArea = styled.textarea`
  width: 100%;
  min-height: 250px;
  padding: 1rem;
  border: 1px solid ${COLORS.primaryBorder};
  border-radius: 12px;
  background: ${COLORS.background};
  color: ${COLORS.text};
  font-family: 'Inter', sans-serif;
  font-size: 1rem;
  font-weight: 400;
  resize: vertical;
  line-height: 1.6;
  letter-spacing: -0.01em;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  animation: fadeIn 0.5s ease-out;

  @keyframes fadeIn {
    from { 
      opacity: 0; 
      transform: translateY(10px); 
    }
    to { 
      opacity: 1; 
      transform: translateY(0); 
    }
  }

  &::placeholder {
    color: ${COLORS.textLight};
    opacity: 0.7;
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

  &:disabled {
    background: rgba(108, 117, 125, 0.1);
    border-color: rgba(108, 117, 125, 0.3);
    cursor: not-allowed;
    opacity: 0.6;
  }

  @media (max-width: 768px) {
    min-height: 200px;
    padding: 0.875rem;
  }
`;

export const CharacterCounter = styled.div`
  text-align: right;
  font-size: 0.875rem;
  font-weight: 600;
  font-family: 'Inter', sans-serif;
  margin-top: 0.75rem;
  padding: 0.5rem 0.75rem;
  border-radius: 8px;
  background: ${props => {
    if (props.characters > 280) return 'rgba(220, 53, 69, 0.1)'; // Red background for 281-300
    if (props.characters > 200) return 'rgba(243, 156, 18, 0.1)'; // Orange background for 201-280
    return 'rgba(40, 167, 69, 0.1)'; // Green background for 0-200
  }};
  border: 1px solid ${props => {
    if (props.characters > 280) return 'rgba(220, 53, 69, 0.3)'; // Red border for 281-300
    if (props.characters > 200) return 'rgba(243, 156, 18, 0.3)'; // Orange border for 201-280
    return 'rgba(40, 167, 69, 0.3)'; // Green border for 0-200
  }};
  color: ${props => {
    if (props.characters > 280) return COLORS.danger; // Red for 281-300
    if (props.characters > 200) return COLORS.warning; // Orange for 201-280
    return COLORS.success; // Green for 0-200
  }};
  transition: all 0.3s ease;
  animation: fadeIn 0.4s ease-out 0.2s both;

  @keyframes fadeIn {
    from { 
      opacity: 0; 
      transform: translateX(-10px); 
    }
    to { 
      opacity: 1; 
      transform: translateX(0); 
    }
  }

  ${props => props.characters > 280 && `
    animation: pulse 1s ease-in-out infinite;
  `}

  @keyframes pulse {
    0%, 100% { 
      opacity: 0.8;
    }
    50% { 
      opacity: 1;
    }
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  gap: 0.75rem;
  margin-top: 1.5rem;
  justify-content: flex-end;
  animation: fadeIn 0.5s ease-out 0.4s both;

  @keyframes fadeIn {
    from { 
      opacity: 0; 
      transform: translateY(15px); 
    }
    to { 
      opacity: 1; 
      transform: translateY(0); 
    }
  }

  @media (max-width: 768px) {
    gap: 0.5rem;
    margin-top: 1.25rem;
  }
`;

export const Button = styled.button`
  padding: 0.75rem 1.5rem;
  border: 1px solid ${props => props.$variant === 'cancel' 
    ? 'rgba(108, 117, 125, 0.5)' 
    : COLORS.primaryBorder};
  background: ${props => props.$variant === 'cancel' 
    ? COLORS.neutral
    : COLORS.primary};
  color: #ffffff;
  border-radius: 8px;
  cursor: pointer;
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  font-size: 0.875rem;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);

  &:hover:not(:disabled) {
    background: ${props => props.$variant === 'cancel' 
      ? '#495057'
      : '#2563eb'};
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.3);
  }

  &:active:not(:disabled) {
    transform: translateY(1px);
  }
  
  &:disabled {
    background: ${COLORS.neutral};
    cursor: not-allowed;
    opacity: 0.6;
  }

  @media (max-width: 768px) {
    padding: 0.625rem 1.25rem;
    font-size: 0.8rem;
  }
`;

export const ErrorMessage = styled.div`
  color: ${COLORS.danger};
  font-size: 0.875rem;
  font-weight: 600;
  font-family: 'Inter', sans-serif;
  margin-top: 0.75rem;
  padding: 0.75rem 1rem;
  background: rgba(231, 76, 60, 0.1);
  border: 1px solid rgba(231, 76, 60, 0.3);
  border-radius: 8px;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  animation: shake 0.3s ease-in-out;

  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    25% { transform: translateX(-2px); }
    75% { transform: translateX(2px); }
  }
`;
