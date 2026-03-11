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

export const FormGroup = styled.div`
  margin-bottom: 1.5rem;
  animation: fadeIn 0.6s ease-out both;
  animation-delay: ${props => props.$delay || '0s'};

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
    margin-bottom: 1.25rem;
  }
`;

export const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 600;
  font-family: 'Inter', sans-serif;
  font-size: 0.875rem;
  color: ${props => props.theme.colors.text};
  text-transform: uppercase;
  letter-spacing: 0.05em;
  transition: color 0.3s ease;

  ${FormGroup}:hover & {
    color: ${props => props.theme.colors.primary};
  }
`;

export const Input = styled.input`
  width: 100%;
  padding: 1rem;
  border: 1px solid ${props => props.$hasError 
    ? 'rgba(231, 76, 60, 0.6)' 
    : props.theme.colors.primaryBorder};
  border-radius: 12px;
  background: ${props => props.theme.colors.background};
  color: ${props => props.theme.colors.text};
  font-family: 'Inter', sans-serif;
  font-size: 1rem;
  font-weight: 400;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  
  &::placeholder {
    color: ${props => props.theme.colors.textLight};
    opacity: 0.7;
    font-style: italic;
  }
  
  &:focus {
    outline: none;
    border-color: ${props => props.$hasError 
      ? 'rgba(231, 76, 60, 0.8)' 
      : props.theme.colors.primary};
    box-shadow: 0 0 0 2px ${props => props.$hasError 
      ? 'rgba(231, 76, 60, 0.2)' 
      : props.theme.colors.primaryLight};
  }

  &:hover:not(:focus) {
    border-color: ${props => props.$hasError 
      ? 'rgba(231, 76, 60, 0.5)' 
      : props.theme.colors.primary};
  }
  
  &:disabled {
    background: rgba(108, 117, 125, 0.1);
    border-color: rgba(108, 117, 125, 0.3);
    cursor: not-allowed;
    opacity: 0.6;
  }

  @media (max-width: 768px) {
    padding: 0.875rem;
  }
`;

export const TextArea = styled.textarea`
  width: 100%;
  min-height: 120px;
  padding: 1rem;
  border: 1px solid ${props => props.$hasError 
    ? 'rgba(231, 76, 60, 0.6)' 
    : props.theme.colors.primaryBorder};
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
  
  &::placeholder {
    color: ${props => props.theme.colors.textLight};
    opacity: 0.7;
    font-style: italic;
  }
  
  &:focus {
    outline: none;
    border-color: ${props => props.$hasError 
      ? 'rgba(231, 76, 60, 0.8)' 
      : props.theme.colors.primary};
    box-shadow: 0 0 0 2px ${props => props.$hasError 
      ? 'rgba(231, 76, 60, 0.2)' 
      : props.theme.colors.primaryLight};
  }

  &:hover:not(:focus) {
    border-color: ${props => props.$hasError 
      ? 'rgba(231, 76, 60, 0.5)' 
      : props.theme.colors.primary};
  }
  
  &:disabled {
    background: rgba(108, 117, 125, 0.1);
    border-color: rgba(108, 117, 125, 0.3);
    cursor: not-allowed;
    opacity: 0.6;
  }

  @media (max-width: 768px) {
    min-height: 100px;
    padding: 0.875rem;
  }
`;

export const Button = styled.button`
  padding: 0.75rem 1.5rem;
  border: 1px solid ${props => props.$variant === 'cancel' 
    ? 'rgba(108, 117, 125, 0.5)' 
    : props.$variant === 'delete'
    ? 'rgba(220, 53, 69, 0.5)'
    : props.theme.colors.primaryBorder};
  background: ${props => props.$variant === 'cancel' 
    ? 'rgba(108, 117, 125, 0.8)'
    : props.$variant === 'delete'
    ? props.theme.colors.danger
    : props.theme.colors.primary};
  color: #ffffff;
  border-radius: 8px;
  cursor: pointer;
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  font-size: ${props => props.$variant === 'delete' ? '0.8rem' : '0.875rem'};
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);

  &:hover:not(:disabled) {
    background: ${props => props.$variant === 'cancel' 
      ? 'rgba(73, 80, 87, 0.9)'
      : props.$variant === 'delete'
      ? '#c82333'
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
    padding: ${props => props.$variant === 'delete' ? '0.5rem 1rem' : '0.625rem 1.25rem'};
    font-size: ${props => props.$variant === 'delete' ? '0.75rem' : '0.8rem'};
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

export const PhotoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
  margin-bottom: 1rem;
  animation: ${props => props.theme.animations.fadeIn} 0.6s ease-out 0.2s both;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }
`;

export const PhotoPreview = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid ${props => props.theme.colors.primaryBorder};
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);

  &:hover {
    border-color: ${props => props.theme.colors.primary};
    box-shadow: 0 6px 20px rgba(59, 130, 246, 0.3);
  }

  @media (max-width: 768px) {
    width: 80px;
    height: 80px;
  }
`;

export const PhotoUploadContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

export const FileInput = styled.input`
  display: none;
`;

export const FileInputButton = styled.button`
  padding: 0.5rem 1rem;
  background: ${props => props.theme.colors.primary};
  border: 1px solid ${props => props.theme.colors.primaryBorder};
  border-radius: 8px;
  color: #ffffff;
  cursor: pointer;
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  font-size: 0.875rem;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.2);

  &:hover:not(:disabled) {
    background: #2563eb;
    box-shadow: 0 6px 16px rgba(59, 130, 246, 0.3);
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

export const ReadOnlyInput = styled.div`
  padding: 1rem;
  background: rgba(20, 15, 15, 0.6);
  border: 1px solid ${props => props.theme.colors.primaryBorder};
  border-radius: 12px;
  color: ${props => props.theme.colors.textLight};
  font-weight: 500;
  font-family: 'Inter', sans-serif;
  font-size: 1rem;
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;

  &:hover {
    border-color: ${props => props.theme.colors.primary};
    background: rgba(20, 15, 15, 0.65);
  }

  @media (max-width: 768px) {
    padding: 0.875rem;
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  gap: 0.75rem;
  margin-top: 2rem;
  justify-content: flex-end;
  animation: ${props => props.theme.animations.fadeIn} 0.5s ease-out 0.4s both;

  @media (max-width: 768px) {
    gap: 0.5rem;
    margin-top: 1.5rem;
  }
`;

export const FileInfo = styled.div`
  margin-top: 0.5rem;
  font-size: 0.875rem;
  color: ${props => props.theme.colors.textLight};
  font-weight: 500;
  font-family: 'Inter', sans-serif;
  padding: 0.5rem 0.75rem;
  background: ${props => props.theme.colors.primaryLight};
  border-radius: 8px;
  border: 1px solid ${props => props.theme.colors.primaryBorder};
  backdrop-filter: blur(5px);
  animation: ${props => props.theme.animations.fadeIn} 0.3s ease-out;
`;
