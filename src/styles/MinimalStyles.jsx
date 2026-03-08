import styled from 'styled-components';

// Layout
export const Container = styled.div`
  max-width: 400px;
  margin: 2rem auto;
  padding: 1rem;
`;

export const CenterContainer = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
`;

// Typography
export const Title = styled.h1`
  text-align: center;
  margin-bottom: 1.5rem;
  font-size: 1.5rem;
`;

export const Text = styled.p`
  margin: 1rem 0;
  text-align: center;
  
  a {
    color: #0066cc;
    text-decoration: none;
    
    &:hover {
      text-decoration: underline;
    }
  }
`;

// Form
export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  position: relative;
`;

export const Label = styled.label`
  font-weight: 600;
  font-family: 'Inter', sans-serif;
  color: #e8d5c7;
  font-size: 0.9rem;
  letter-spacing: 0.01em;
  margin-bottom: 0.25rem;
`;

export const Input = styled.input`
  padding: 0.75rem 1rem;
  border: 1px solid ${props => props.$hasError ? 'rgba(231, 76, 60, 0.5)' : 'rgba(220, 53, 69, 0.2)'};
  border-radius: 12px;
  background: 
    linear-gradient(135deg, rgba(20, 15, 15, 0.8) 0%, rgba(15, 10, 10, 0.9) 100%),
    rgba(220, 53, 69, 0.02);
  color: #e8d5c7;
  font-family: 'Inter', sans-serif;
  font-size: 0.95rem;
  transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  box-shadow: 
    inset 0 2px 4px rgba(0, 0, 0, 0.2),
    0 1px 0 rgba(220, 53, 69, 0.1);
  backdrop-filter: blur(10px);
  
  &::placeholder {
    color: #a8a29e;
    opacity: 0.7;
  }
  
  &:focus {
    outline: none;
    border-color: ${props => props.$hasError ? 'rgba(231, 76, 60, 0.7)' : 'rgba(220, 53, 69, 0.5)'};
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
    border-color: ${props => props.$hasError ? 'rgba(231, 76, 60, 0.6)' : 'rgba(220, 53, 69, 0.3)'};
    background: 
      linear-gradient(135deg, rgba(20, 15, 15, 0.85) 0%, rgba(15, 10, 10, 0.92) 100%),
      rgba(220, 53, 69, 0.03);
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    background: rgba(108, 117, 125, 0.1);
    border-color: rgba(108, 117, 125, 0.3);
  }
  
  &:invalid {
    border-color: rgba(231, 76, 60, 0.5);
  }
`;

export const Button = styled.button`
  padding: 0.75rem 1.5rem;
  background: linear-gradient(135deg, #e74c3c 0%, #c0392b 100%);
  color: #ffffff;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  font-size: 0.95rem;
  transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  box-shadow: 
    0 4px 15px rgba(231, 76, 60, 0.3),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
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
    background: linear-gradient(135deg, #c0392b 0%, #a93226 100%);
    transform: translateY(-2px) scale(1.02);
    box-shadow: 
      0 6px 20px rgba(231, 76, 60, 0.4),
      inset 0 1px 0 rgba(255, 255, 255, 0.2);
    
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
    
    &::before {
      display: none;
    }
  }
`;

export const ErrorMessage = styled.span`
  color: #e74c3c;
  font-size: 0.8rem;
  font-weight: 500;
  font-family: 'Inter', sans-serif;
  margin-top: 0.25rem;
  display: flex;
  align-items: center;
  gap: 0.25rem;
  animation: errorShake 0.3s ease-in-out;
  
  @keyframes errorShake {
    0%, 100% { transform: translateX(0); }
    25% { transform: translateX(-2px); }
    75% { transform: translateX(2px); }
  }
  
  &::before {
    content: '⚠';
    font-size: 0.7rem;
    opacity: 0.8;
  }
`;

export const SuccessMessage = styled.span`
  color: #28a745;
  font-size: 0.8rem;
  font-weight: 500;
  font-family: 'Inter', sans-serif;
  margin-top: 0.25rem;
  display: flex;
  align-items: center;
  gap: 0.25rem;
  animation: successPulse 0.4s ease-in-out;
  
  @keyframes successPulse {
    0% { opacity: 0; transform: scale(0.9); }
    50% { transform: scale(1.05); }
    100% { opacity: 1; transform: scale(1); }
  }
  
  &::before {
    content: '✓';
    font-size: 0.7rem;
    font-weight: 700;
  }
`;
