import styled from 'styled-components';

export const AuthContainer = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  background: 
    radial-gradient(ellipse at top, rgba(59, 130, 246, 0.08) 0%, transparent 50%),
    linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 30%, #0d0d0d 70%, #000000 100%);
  backdrop-filter: blur(10px);
  position: relative;
`;

export const FormContainer = styled.div`
  background: 
    radial-gradient(ellipse at top, rgba(59, 130, 246, 0.08) 0%, transparent 50%),
    linear-gradient(135deg, rgba(20, 15, 15, 0.98) 0%, rgba(15, 10, 10, 0.95) 100%);
  backdrop-filter: blur(25px);
  border: 1px solid rgba(0, 0, 0, 0.3);
  border-radius: 24px;
  padding: 2rem;
  max-width: 400px;
  width: 100%;
  box-shadow: 
    0 25px 50px rgba(0, 0, 0, 0.5),
    0 0 0 1px rgba(0, 0, 0, 0.2),
    inset 0 2px 4px rgba(0, 0, 0, 0.3),
    inset 0 -2px 4px rgba(0, 0, 0, 0.2);
  transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  position: relative;
  overflow: hidden;
  animation: cardEntrance 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;

  @keyframes cardEntrance {
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
      rgba(59, 130, 246, 0.8), 
      rgba(59, 130, 246, 0.6),
      rgba(59, 130, 246, 0.8),
      transparent
    );
    opacity: 0;
    transition: opacity 0.5s ease;
  }

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(circle at center, rgba(59, 130, 246, 0.05) 0%, transparent 70%);
    opacity: 0;
    transition: opacity 0.5s ease;
    pointer-events: none;
  }

  &:hover {
    transform: translateY(-8px) scale(1.02);
    box-shadow: 
      0 40px 80px rgba(0, 0, 0, 0.6),
      0 0 0 2px rgba(59, 130, 246, 0.4),
      0 0 30px rgba(59, 130, 246, 0.3),
      inset 0 2px 8px rgba(59, 130, 246, 0.4),
      inset 0 -2px 8px rgba(59, 130, 246, 0.3);
    border-color: rgba(59, 130, 246, 0.5);
    
    &::before {
      opacity: 1;
    }
    
    &::after {
      opacity: 1;
    }
  }
  
  @media (max-width: 768px) {
    border-radius: 16px;
    padding: 1.5rem;
    
    &:hover {
      transform: translateY(-4px) scale(1.01);
    }
  }
`;

export const Title = styled.h1`
  text-align: center;
  margin-bottom: 1.5rem;
  font-size: 1.8rem;
  color: #e8d5c7;
  font-weight: 700;
  font-family: 'Inter', sans-serif;
  letter-spacing: 0.02em;
  text-transform: uppercase;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.8);
  animation: titleGlow 2s ease-in-out infinite alternate;

  @keyframes titleGlow {
    0% {
      text-shadow: 0 2px 4px rgba(0, 0, 0, 0.8), 0 0 15px rgba(59, 130, 246, 0.3);
    }
    100% {
      text-shadow: 0 2px 4px rgba(0, 0, 0, 0.8), 0 0 30px rgba(59, 130, 246, 0.5);
    }
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const ErrorMessage = styled.div`
  color: #e74c3c;
  font-size: 0.9rem;
  text-align: center;
  padding: 0.75rem;
  background: 
    linear-gradient(135deg, rgba(231, 76, 60, 0.12) 0%, rgba(192, 57, 43, 0.08) 100%),
    radial-gradient(circle at top right, rgba(231, 76, 60, 0.1) 0%, transparent 50%);
  border: 1px solid rgba(231, 76, 60, 0.3);
  border-radius: 12px;
  backdrop-filter: blur(10px);
  animation: messageSlideIn 0.4s ease-out;

  @keyframes messageSlideIn {
    0% {
      opacity: 0;
      transform: translateY(-10px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

export const AuthText = styled.p`
  margin: 1.5rem 0 0 0;
  text-align: center;
  color: #a8a29e;
  font-size: 0.9rem;
  font-weight: 500;
  
  a {
    color: #3b82f6;
    text-decoration: none;
    font-weight: 700;
    transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    position: relative;
    
    &::after {
      content: '';
      position: absolute;
      bottom: -2px;
      left: 0;
      width: 0;
      height: 2px;
      background: linear-gradient(90deg, #3b82f6, #3b82f6);
      transition: width 0.3s ease;
    }
    
    &:hover {
      color: #8b4513;
      transform: translateX(3px);
      
      &::after {
        width: 100%;
      }
    }
  }
`;
