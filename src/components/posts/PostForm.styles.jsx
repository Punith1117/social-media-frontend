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

export const TextArea = styled.textarea`
  width: 100%;
  min-height: 250px;
  min-width: 300px;
  padding: 1rem;
  border: 1px solid rgba(220, 53, 69, 0.3);
  border-radius: 16px;
  background: 
    linear-gradient(135deg, rgba(20, 15, 15, 0.8) 0%, rgba(15, 10, 10, 0.9) 100%),
    rgba(220, 53, 69, 0.02);
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
  animation: textareaFocus 0.5s ease-out;

  @keyframes textareaFocus {
    0% {
      opacity: 0;
      transform: translateY(10px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  &::placeholder {
    color: #a8a29e;
    opacity: 0.7;
    font-style: italic;
  }
  
  &:focus {
    outline: none;
    border-color: rgba(220, 53, 69, 0.6);
    background: 
      linear-gradient(135deg, rgba(20, 15, 15, 0.9) 0%, rgba(15, 10, 10, 0.95) 100%),
      rgba(220, 53, 69, 0.05);
    box-shadow: 
      inset 0 2px 6px rgba(0, 0, 0, 0.3),
      0 0 0 2px rgba(220, 53, 69, 0.2),
      0 4px 12px rgba(220, 53, 69, 0.15);
    transform: translateY(-1px);
  }

  &:hover:not(:focus) {
    border-color: rgba(220, 53, 69, 0.4);
    background: 
      linear-gradient(135deg, rgba(20, 15, 15, 0.85) 0%, rgba(15, 10, 10, 0.92) 100%),
      rgba(220, 53, 69, 0.03);
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
  background: rgba(220, 53, 69, 0.08);
  color: ${props => {
    if (props.characters > 280) return '#e74c3c'; // Red for 281-300
    if (props.characters > 200) return '#f39c12'; // Orange for 201-280
    return '#28a745'; // Green for 0-200
  }};
  transition: all 0.3s ease;
  animation: counterFadeIn 0.4s ease-out 0.2s both;

  @keyframes counterFadeIn {
    0% {
      opacity: 0;
      transform: translateX(-10px);
    }
    100% {
      opacity: 1;
      transform: translateX(0);
    }
  }

  ${props => props.characters > 280 && `
    background: rgba(231, 76, 60, 0.15);
    border: 1px solid rgba(231, 76, 60, 0.3);
    animation: warningPulse 1s ease-in-out infinite;
  `}

  ${props => props.characters > 200 && props.characters <= 280 && `
    background: rgba(243, 156, 18, 0.1);
    border: 1px solid rgba(243, 156, 18, 0.2);
  `}

  ${props => props.characters <= 200 && `
    background: rgba(40, 167, 69, 0.08);
    border: 1px solid rgba(40, 167, 69, 0.15);
  `}

  @keyframes warningPulse {
    0%, 100% { 
      transform: scale(1); 
      opacity: 1;
    }
    50% { 
      transform: scale(1.02); 
      opacity: 0.8;
    }
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  gap: 0.75rem;
  margin-top: 1.5rem;
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
    margin-top: 1.25rem;
  }
`;

export const Button = styled.button`
  padding: 0.75rem 1.5rem;
  border: ${props => props.$variant === 'cancel' 
    ? '1px solid rgba(108, 117, 125, 0.5)' 
    : '1px solid rgba(220, 53, 69, 0.5)'};
  background: ${props => props.$variant === 'cancel' 
    ? 'linear-gradient(135deg, rgba(108, 117, 125, 0.8) 0%, rgba(73, 80, 87, 0.9) 100%)'
    : 'linear-gradient(135deg, #e74c3c 0%, #c0392b 100%)'};
  color: #ffffff;
  border-radius: 12px;
  cursor: pointer;
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  font-size: 0.875rem;
  transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  box-shadow: 
    ${props => props.$variant === 'cancel'
      ? '0 4px 15px rgba(108, 117, 125, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
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
      : 'linear-gradient(135deg, #c0392b 0%, #a93226 100%)'};
    transform: translateY(-2px) scale(1.02);
    box-shadow: ${props => props.$variant === 'cancel'
      ? '0 6px 20px rgba(108, 117, 125, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
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
    padding: 0.625rem 1.25rem;
    font-size: 0.8rem;
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
