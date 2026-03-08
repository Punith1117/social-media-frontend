import styled from 'styled-components';

export const FormContainer = styled.div`
  background: 
    radial-gradient(ellipse at top, rgba(220, 53, 69, 0.15) 0%, transparent 50%),
    linear-gradient(135deg, rgba(20, 15, 15, 0.98) 0%, rgba(15, 10, 10, 0.95) 100%);
  backdrop-filter: blur(25px);
  border: 1px solid rgba(220, 53, 69, 0.3);
  border-radius: 24px;
  padding: 2rem;
  margin-bottom: 1.5rem;
  box-shadow: 
    0 25px 50px rgba(0, 0, 0, 0.5),
    0 0 0 1px rgba(220, 53, 69, 0.2),
    inset 0 2px 4px rgba(220, 53, 69, 0.3),
    inset 0 -2px 4px rgba(139, 69, 19, 0.2);
  transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  position: relative;
  overflow: hidden;
  animation: formEntrance 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;

  @keyframes formEntrance {
    0% {
      opacity: 0;
      transform: translateY(30px) scale(0.95);
      filter: blur(10px);
    }
    50% {
      opacity: 0.8;
      transform: translateY(-5px) scale(1.02);
      filter: blur(2px);
    }
    100% {
      opacity: 1;
      transform: translateY(0) scale(1);
      filter: blur(0);
    }
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: linear-gradient(90deg, 
      transparent, 
      rgba(220, 53, 69, 0.8), 
      rgba(139, 69, 19, 0.6),
      rgba(220, 53, 69, 0.8),
      transparent
    );
    opacity: 0.7;
    animation: bloodFlow 3s ease-in-out infinite;
  }

  @keyframes bloodFlow {
    0%, 100% { transform: translateX(-100%); }
    50% { transform: translateX(100%); }
  }

  &:hover {
    transform: translateY(-3px) scale(1.01);
    box-shadow: 
      0 35px 70px rgba(0, 0, 0, 0.6),
      0 0 0 2px rgba(220, 53, 69, 0.4),
      0 0 30px rgba(220, 53, 69, 0.3),
      inset 0 2px 8px rgba(220, 53, 69, 0.4),
      inset 0 -2px 8px rgba(139, 69, 19, 0.3);
    border-color: rgba(220, 53, 69, 0.5);
  }

  @media (max-width: 768px) {
    padding: 1.5rem;
    border-radius: 20px;
    margin-bottom: 1.25rem;
    
    &:hover {
      transform: translateY(-2px) scale(1.005);
    }
  }
`;

export const FormGroup = styled.div`
  margin-bottom: 1.5rem;
  animation: fieldFadeIn 0.6s ease-out both;
  animation-delay: ${props => props.$delay || '0s'};

  @keyframes fieldFadeIn {
    0% {
      opacity: 0;
      transform: translateY(15px);
      filter: blur(3px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
      filter: blur(0);
    }
  }

  @media (max-width: 768px) {
    margin-bottom: 1.25rem;
  }
`;

export const Label = styled.label`
  display: block;
  margin-bottom: 0.75rem;
  font-weight: 600;
  font-family: 'Inter', sans-serif;
  font-size: 0.875rem;
  color: #e8d5c7;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 0;
    width: 0;
    height: 1px;
    background: linear-gradient(90deg, #dc3545, #8b4513);
    transition: width 0.3s ease;
  }

  ${FormGroup}:hover & {
    color: #dc3545;
    
    &::after {
      width: 100%;
    }
  }
`;

export const Input = styled.input`
  width: 100%;
  padding: 1rem;
  border: 1px solid ${props => props.$hasError 
    ? 'rgba(231, 76, 60, 0.6)' 
    : 'rgba(220, 53, 69, 0.3)'};
  border-radius: 16px;
  background: 
    linear-gradient(135deg, rgba(20, 15, 15, 0.8) 0%, rgba(15, 10, 10, 0.9) 100%),
    ${props => props.$hasError 
      ? 'rgba(231, 76, 60, 0.05)' 
      : 'rgba(220, 53, 69, 0.02)'};
  color: #e8d5c7;
  font-family: 'Inter', sans-serif;
  font-size: 1rem;
  font-weight: 400;
  transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  box-shadow: 
    inset 0 2px 4px rgba(0, 0, 0, 0.2),
    0 1px 0 rgba(220, 53, 69, 0.1);
  backdrop-filter: blur(10px);
  
  &::placeholder {
    color: #a8a29e;
    opacity: 0.7;
    font-style: italic;
  }
  
  &:focus {
    outline: none;
    border-color: ${props => props.$hasError 
      ? 'rgba(231, 76, 60, 0.8)' 
      : 'rgba(220, 53, 69, 0.6)'};
    background: 
      linear-gradient(135deg, rgba(20, 15, 15, 0.9) 0%, rgba(15, 10, 10, 0.95) 100%),
      ${props => props.$hasError 
        ? 'rgba(231, 76, 60, 0.08)' 
        : 'rgba(220, 53, 69, 0.05)'};
    box-shadow: 
      inset 0 2px 6px rgba(0, 0, 0, 0.3),
      0 0 0 2px ${props => props.$hasError 
        ? 'rgba(231, 76, 60, 0.2)' 
        : 'rgba(220, 53, 69, 0.2)'},
      0 4px 12px ${props => props.$hasError 
        ? 'rgba(231, 76, 60, 0.15)' 
        : 'rgba(220, 53, 69, 0.15)'};
    transform: translateY(-1px);
  }

  &:hover:not(:focus) {
    border-color: ${props => props.$hasError 
      ? 'rgba(231, 76, 60, 0.5)' 
      : 'rgba(220, 53, 69, 0.4)'};
    background: 
      linear-gradient(135deg, rgba(20, 15, 15, 0.85) 0%, rgba(15, 10, 10, 0.92) 100%),
      ${props => props.$hasError 
        ? 'rgba(231, 76, 60, 0.03)' 
        : 'rgba(220, 53, 69, 0.03)'};
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
    : 'rgba(220, 53, 69, 0.3)'};
  border-radius: 16px;
  background: 
    linear-gradient(135deg, rgba(20, 15, 15, 0.8) 0%, rgba(15, 10, 10, 0.9) 100%),
    ${props => props.$hasError 
      ? 'rgba(231, 76, 60, 0.05)' 
      : 'rgba(220, 53, 69, 0.02)'};
  color: #e8d5c7;
  font-family: 'Inter', sans-serif;
  font-size: 1rem;
  font-weight: 400;
  resize: vertical;
  line-height: 1.6;
  letter-spacing: -0.01em;
  transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  box-shadow: 
    inset 0 2px 4px rgba(0, 0, 0, 0.2),
    0 1px 0 rgba(220, 53, 69, 0.1);
  backdrop-filter: blur(10px);
  
  &::placeholder {
    color: #a8a29e;
    opacity: 0.7;
    font-style: italic;
  }
  
  &:focus {
    outline: none;
    border-color: ${props => props.$hasError 
      ? 'rgba(231, 76, 60, 0.8)' 
      : 'rgba(220, 53, 69, 0.6)'};
    background: 
      linear-gradient(135deg, rgba(20, 15, 15, 0.9) 0%, rgba(15, 10, 10, 0.95) 100%),
      ${props => props.$hasError 
        ? 'rgba(231, 76, 60, 0.08)' 
        : 'rgba(220, 53, 69, 0.05)'};
    box-shadow: 
      inset 0 2px 6px rgba(0, 0, 0, 0.3),
      0 0 0 2px ${props => props.$hasError 
        ? 'rgba(231, 76, 60, 0.2)' 
        : 'rgba(220, 53, 69, 0.2)'},
      0 4px 12px ${props => props.$hasError 
        ? 'rgba(231, 76, 60, 0.15)' 
        : 'rgba(220, 53, 69, 0.15)'};
    transform: translateY(-1px);
  }

  &:hover:not(:focus) {
    border-color: ${props => props.$hasError 
      ? 'rgba(231, 76, 60, 0.5)' 
      : 'rgba(220, 53, 69, 0.4)'};
    background: 
      linear-gradient(135deg, rgba(20, 15, 15, 0.85) 0%, rgba(15, 10, 10, 0.92) 100%),
      ${props => props.$hasError 
        ? 'rgba(231, 76, 60, 0.03)' 
        : 'rgba(220, 53, 69, 0.03)'};
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
  border: ${props => props.$variant === 'cancel' 
    ? '1px solid rgba(108, 117, 125, 0.5)' 
    : props.$variant === 'delete'
    ? '1px solid rgba(220, 53, 69, 0.5)'
    : '1px solid rgba(220, 53, 69, 0.5)'};
  background: ${props => props.$variant === 'cancel' 
    ? 'linear-gradient(135deg, rgba(108, 117, 125, 0.8) 0%, rgba(73, 80, 87, 0.9) 100%)'
    : props.$variant === 'delete'
    ? 'linear-gradient(135deg, #dc3545 0%, #c82333 100%)'
    : 'linear-gradient(135deg, #e74c3c 0%, #c0392b 100%)'};
  color: #ffffff;
  border-radius: 12px;
  cursor: pointer;
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  font-size: ${props => props.$variant === 'delete' ? '0.8rem' : '0.875rem'};
  transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  box-shadow: 
    ${props => props.$variant === 'cancel'
      ? '0 4px 15px rgba(108, 117, 125, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
      : props.$variant === 'delete'
      ? '0 4px 15px rgba(220, 53, 69, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
      : '0 4px 15px rgba(231, 76, 60, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)'};
  position: relative;
  overflow: hidden;
  backdrop-filter: blur(10px);

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
  
  &:hover:not(:disabled) {
    background: ${props => props.$variant === 'cancel' 
      ? 'linear-gradient(135deg, rgba(73, 80, 87, 0.9) 0%, rgba(52, 58, 64, 0.95) 100%)'
      : props.$variant === 'delete'
      ? 'linear-gradient(135deg, #c82333 0%, #a02622 100%)'
      : 'linear-gradient(135deg, #c0392b 0%, #a93226 100%)'};
    transform: translateY(-2px) scale(1.02);
    box-shadow: ${props => props.$variant === 'cancel'
      ? '0 6px 20px rgba(108, 117, 125, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
      : props.$variant === 'delete'
      ? '0 6px 20px rgba(220, 53, 69, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
      : '0 6px 20px rgba(231, 76, 60, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2)'};
    
    &::before {
      left: 100%;
    }
  }

  &:active:not(:disabled) {
    transform: translateY(0) scale(0.98);
  }
  
  &:disabled {
    background: linear-gradient(135deg, #6c757d 0%, #495057 100%);
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
    opacity: 0.6;
    
    &::before {
      display: none;
    }
  }

  @media (max-width: 768px) {
    padding: ${props => props.$variant === 'delete' ? '0.5rem 1rem' : '0.625rem 1.25rem'};
    font-size: ${props => props.$variant === 'delete' ? '0.75rem' : '0.8rem'};
  }
`;

export const ErrorMessage = styled.div`
  color: #e74c3c;
  font-size: 0.875rem;
  font-weight: 600;
  font-family: 'Inter', sans-serif;
  margin-top: 0.75rem;
  padding: 0.75rem 1rem;
  background: 
    linear-gradient(135deg, rgba(231, 76, 60, 0.15) 0%, rgba(192, 57, 43, 0.1) 100%);
  border: 1px solid rgba(231, 76, 60, 0.3);
  border-radius: 12px;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  animation: errorShake 0.3s ease-in-out;
  backdrop-filter: blur(10px);
  position: relative;
  overflow: hidden;

  @keyframes errorShake {
    0%, 100% { transform: translateX(0); }
    25% { transform: translateX(-2px); }
    75% { transform: translateX(2px); }
  }

  &::before {
    content: '⚠';
    font-size: 1rem;
    opacity: 0.8;
    animation: warningPulse 1s ease-in-out infinite;
  }

  @keyframes warningPulse {
    0%, 100% { opacity: 0.8; }
    50% { opacity: 1; }
  }

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, 
      transparent, 
      rgba(231, 76, 60, 0.2), 
      transparent
    );
    animation: errorSlide 2s ease-in-out infinite;
  }

  @keyframes errorSlide {
    0% { left: -100%; }
    50% { left: 100%; }
    100% { left: 100%; }
  }
`;

export const PhotoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
  margin-bottom: 1rem;
  animation: photoFadeIn 0.6s ease-out 0.2s both;

  @keyframes photoFadeIn {
    0% {
      opacity: 0;
      transform: translateY(15px) scale(0.95);
      filter: blur(3px);
    }
    100% {
      opacity: 1;
      transform: translateY(0) scale(1);
      filter: blur(0);
    }
  }

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
  border: 3px solid rgba(220, 53, 69, 0.3);
  transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  position: relative;
  animation: avatarPulse 2s ease-in-out infinite;
  box-shadow: 
    0 4px 15px rgba(0, 0, 0, 0.3),
    inset 0 0 0 1px rgba(220, 53, 69, 0.2);

  @keyframes avatarPulse {
    0%, 100% {
      box-shadow: 
        0 4px 15px rgba(0, 0, 0, 0.3),
        0 0 0 0 rgba(220, 53, 69, 0.4),
        inset 0 0 0 1px rgba(220, 53, 69, 0.2);
    }
    50% {
      box-shadow: 
        0 4px 15px rgba(0, 0, 0, 0.3),
        0 0 0 8px rgba(220, 53, 69, 0.1),
        inset 0 0 0 1px rgba(220, 53, 69, 0.2);
    }
  }

  &:hover {
    transform: scale(1.05) rotate(3deg);
    border-color: rgba(220, 53, 69, 0.6);
    box-shadow: 
      0 8px 25px rgba(220, 53, 69, 0.3),
      0 0 20px rgba(220, 53, 69, 0.2),
      inset 0 0 15px rgba(220, 53, 69, 0.2);
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
  background: 
    linear-gradient(135deg, rgba(220, 53, 69, 0.8) 0%, rgba(192, 57, 43, 0.9) 100%);
  border: 1px solid rgba(220, 53, 69, 0.5);
  border-radius: 10px;
  color: #ffffff;
  cursor: pointer;
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  font-size: 0.875rem;
  transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  box-shadow: 
    0 4px 12px rgba(220, 53, 69, 0.2),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
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

  &:hover:not(:disabled) {
    background: 
      linear-gradient(135deg, rgba(192, 57, 43, 0.9) 0%, rgba(168, 50, 38, 0.95) 100%);
    transform: translateY(-1px) scale(1.02);
    box-shadow: 
      0 6px 16px rgba(220, 53, 69, 0.3),
      inset 0 1px 0 rgba(255, 255, 255, 0.2);
    
    &::before {
      left: 100%;
    }
  }

  &:disabled {
    background: linear-gradient(135deg, #6c757d 0%, #495057 100%);
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
    opacity: 0.6;
    
    &::before {
      display: none;
    }
  }

  @media (max-width: 768px) {
    padding: 0.625rem 1.25rem;
    font-size: 0.8rem;
  }
`;

export const ReadOnlyInput = styled.div`
  padding: 1rem;
  background: 
    linear-gradient(135deg, rgba(20, 15, 15, 0.6) 0%, rgba(15, 10, 10, 0.7) 100%);
  border: 1px solid rgba(220, 53, 69, 0.2);
  border-radius: 16px;
  color: #a8a29e;
  font-weight: 500;
  font-family: 'Inter', sans-serif;
  font-size: 1rem;
  backdrop-filter: blur(10px);
  box-shadow: 
    inset 0 2px 4px rgba(0, 0, 0, 0.1),
    0 1px 0 rgba(220, 53, 69, 0.05);
  transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);

  &:hover {
    border-color: rgba(220, 53, 69, 0.3);
    background: 
      linear-gradient(135deg, rgba(20, 15, 15, 0.65) 0%, rgba(15, 10, 10, 0.75) 100%);
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
  animation: buttonsFadeIn 0.5s ease-out 0.4s both;

  @keyframes buttonsFadeIn {
    0% {
      opacity: 0;
      transform: translateY(15px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @media (max-width: 768px) {
    gap: 0.5rem;
    margin-top: 1.5rem;
  }
`;

export const FileInfo = styled.div`
  margin-top: 0.5rem;
  font-size: 0.875rem;
  color: #a8a29e;
  font-weight: 500;
  font-family: 'Inter', sans-serif;
  padding: 0.5rem 0.75rem;
  background: rgba(220, 53, 69, 0.05);
  border-radius: 8px;
  border: 1px solid rgba(220, 53, 69, 0.1);
  backdrop-filter: blur(5px);
  animation: fileFadeIn 0.3s ease-out;

  @keyframes fileFadeIn {
    0% {
      opacity: 0;
      transform: translateY(-5px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;
