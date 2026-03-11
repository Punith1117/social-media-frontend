import styled from 'styled-components';

export const FormContainer = styled.div`
  background: ${props => props.theme.colors.background};
  backdrop-filter: blur(20px);
  border: 1px solid ${props => props.theme.colors.primaryBorder};
  border-radius: 20px;
  padding: 2rem;
  margin-bottom: 1.5rem;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.4);
  transition: all 0.3s ease;
  animation: ${props => props.theme.animations.fadeIn} 0.6s ease-out;

  &:hover {
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5);
    border-color: ${props => props.theme.colors.primary};
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
  border: 1px solid ${props => props.theme.colors.primaryBorder};
  border-radius: 12px;
  background: ${props => props.theme.colors.background};
  color: ${props => props.theme.colors.text};
  font-family: 'Inter', sans-serif;
  font-size: 1rem;
  font-weight: 400;
  resize: vertical;
  line-height: 1.6;
  letter-spacing: -0.01em;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  animation: ${props => props.theme.animations.fadeIn} 0.5s ease-out;

  &::placeholder {
    color: ${props => props.theme.colors.textLight};
    opacity: 0.7;
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
    if (props.characters > 280) return props.theme.colors.dangerLight; // Red background for 281-300
    if (props.characters > 200) return props.theme.colors.warningLight; // Orange background for 201-280
    return props.theme.colors.successLight; // Green background for 0-200
  }};
  border: 1px solid ${props => {
    if (props.characters > 280) return props.theme.colors.dangerBorder; // Red border for 281-300
    if (props.characters > 200) return props.theme.colors.warningBorder; // Orange border for 201-280
    return props.theme.colors.successBorder; // Green border for 0-200
  }};
  color: ${props => {
    if (props.characters > 280) return props.theme.colors.danger; // Red for 281-300
    if (props.characters > 200) return props.theme.colors.warning; // Orange for 201-280
    return props.theme.colors.success; // Green for 0-200
  }};
  transition: all 0.3s ease;
  animation: ${props => props.theme.animations.fadeIn} 0.4s ease-out 0.2s both;

  ${props => props.characters > 280 && `
    animation: pulse 1s ease-in-out infinite;
  `}

  @keyframes pulse {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.05); }
  }

  @media (max-width: 768px) {
    font-size: 0.8rem;
    padding: 0.4rem 0.6rem;
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  gap: 0.75rem;
  margin-top: 1.5rem;
  justify-content: flex-end;
  animation: ${props => props.theme.animations.fadeIn} 0.5s ease-out 0.4s both;

  @media (max-width: 768px) {
    gap: 0.5rem;
    margin-top: 1.25rem;
  }
`;

export const Button = styled.button`
  padding: 0.75rem 1.5rem;
  border: 1px solid ${props => props.$variant === 'cancel' 
    ? 'rgba(108, 117, 125, 0.5)' 
    : props.theme.colors.primaryBorder};
  background: ${props => props.$variant === 'cancel' 
    ? '#6c757d'
    : props.theme.colors.primary};
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
    background: #6c757d;
    cursor: not-allowed;
    opacity: 0.6;
  }

  @media (max-width: 768px) {
    padding: 0.625rem 1.25rem;
    font-size: 0.8rem;
  }
`;

export const ErrorMessage = styled.div`
  color: ${props => props.theme.colors.danger};
  font-size: 0.875rem;
  font-weight: 600;
  font-family: 'Inter', sans-serif;
  margin-top: 0.75rem;
  padding: 0.75rem 1rem;
  background: ${props => props.theme.colors.dangerLight};
  border: 1px solid ${props => props.theme.colors.dangerBorder};
  border-radius: 8px;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  animation: ${props => props.theme.animations.shake} 0.3s ease-in-out;
`;
