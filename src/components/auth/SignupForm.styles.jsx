import styled from 'styled-components';

// Centralized colors for consistent theming
const COLORS = {
  primary: '#3b82f6',
  primaryLight: 'rgba(59, 130, 246, 0.2)',
  primaryBorder: 'rgba(59, 130, 246, 0.3)',
  background: 'rgba(20, 15, 15, 0.98)',
  text: '#e8d5c7',
  textLight: '#a8a29e',
  danger: '#e74c3c',
  darkBg: '#0a0a0a'
};

export const AuthContainer = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  background: linear-gradient(135deg, ${COLORS.darkBg} 0%, #1a1a1a 30%, #0d0d0d 70%, #000000 100%);
  backdrop-filter: blur(10px);
`;

export const FormContainer = styled.div`
  background: ${COLORS.background};
  backdrop-filter: blur(20px);
  border: 1px solid ${COLORS.primaryBorder};
  border-radius: 20px;
  padding: 2rem;
  max-width: 400px;
  width: 100%;
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
    border-radius: 16px;
    padding: 1.5rem;
  }
`;

export const Title = styled.h1`
  text-align: center;
  margin-bottom: 1.5rem;
  font-size: 1.8rem;
  color: ${COLORS.text};
  font-weight: 700;
  font-family: 'Inter', sans-serif;
  letter-spacing: 0.02em;
  text-transform: uppercase;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.8);
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const ErrorMessage = styled.div`
  color: ${COLORS.danger};
  font-size: 0.9rem;
  text-align: center;
  padding: 0.75rem;
  background: rgba(231, 76, 60, 0.1);
  border: 1px solid rgba(231, 76, 60, 0.3);
  border-radius: 12px;
  backdrop-filter: blur(10px);
  animation: slideIn 0.3s ease-out;

  @keyframes slideIn {
    from { 
      opacity: 0; 
      transform: translateY(-10px); 
    }
    to { 
      opacity: 1; 
      transform: translateY(0); 
    }
  }
`;

export const AuthText = styled.p`
  margin: 1.5rem 0 0 0;
  text-align: center;
  color: ${COLORS.textLight};
  font-size: 0.9rem;
  font-weight: 500;
  
  a {
    color: ${COLORS.primary};
    text-decoration: none;
    font-weight: 700;
    transition: color 0.3s ease;
    
    &:hover {
      color: ${COLORS.primary};
      text-decoration: underline;
    }
  }
`;
