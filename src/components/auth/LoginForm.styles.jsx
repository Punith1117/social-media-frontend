import styled from 'styled-components';

export const AuthContainer = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  background: ${props => props.theme.isDarkMode 
    ? `linear-gradient(135deg, ${props.theme.colors.darkBg} 0%, #1a1a1a 30%, #0d0d0d 70%, #000000 100%)`
    : `linear-gradient(135deg, ${props.theme.colors.surface} 0%, ${props.theme.colors.background} 50%, ${props.theme.colors.surface} 100%)`
  };
  backdrop-filter: blur(10px);
`;

export const FormContainer = styled.div`
  background: ${props => props.theme.colors.background};
  backdrop-filter: blur(20px);
  border: 1px solid ${props => props.theme.colors.primaryBorder};
  border-radius: 20px;
  padding: 2rem;
  max-width: 400px;
  width: 100%;
  box-shadow: 0 15px 35px ${props => props.theme.colors.shadow};
  transition: all 0.3s ease;
  animation: ${props => props.theme.animations.fadeIn} 0.6s ease-out;

  &:hover {
    box-shadow: 0 20px 40px ${props => props.theme.colors.shadow};
    border-color: ${props => props.theme.colors.primary};
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
  color: ${props => props.theme.colors.text};
  font-weight: 700;
  font-family: 'Inter', sans-serif;
  letter-spacing: 0.02em;
  text-transform: uppercase;
  text-shadow: ${props => props.theme.isDarkMode 
    ? '0 2px 4px rgba(0, 0, 0, 0.8)' 
    : '0 1px 2px rgba(0, 0, 0, 0.1)'
  };
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const SuccessMessage = styled.div`
  color: ${props => props.theme.colors.success};
  font-size: 0.9rem;
  text-align: center;
  margin-bottom: 1rem;
  padding: 0.75rem;
  background: ${props => props.theme.colors.successLight};
  border: 1px solid ${props => props.theme.colors.successBorder};
  border-radius: 12px;
  backdrop-filter: blur(10px);
  animation: ${props => props.theme.animations.slideIn} 0.3s ease-out;
`;

export const ErrorMessage = styled.div`
  color: ${props => props.theme.colors.danger};
  font-size: 0.9rem;
  text-align: center;
  padding: 0.75rem;
  background: ${props => props.theme.colors.dangerLight};
  border: 1px solid ${props => props.theme.colors.dangerBorder};
  border-radius: 12px;
  backdrop-filter: blur(10px);
  animation: ${props => props.theme.animations.slideIn} 0.3s ease-out;
`;

export const AuthText = styled.p`
  margin: 1.5rem 0 0 0;
  text-align: center;
  color: ${props => props.theme.colors.textLight};
  font-size: 0.9rem;
  font-weight: 500;
  
  a {
    color: ${props => props.theme.colors.primary};
    text-decoration: none;
    font-weight: 700;
    transition: color 0.3s ease;
    
    &:hover {
      color: ${props => props.theme.colors.primary};
      text-decoration: underline;
    }
  }
`;

export const DemoInfo = styled.div`
  margin: 1rem 0 0 0;
  padding: 0.75rem;
  background: ${props => props.theme.colors.surface};
  border: 1px solid ${props => props.theme.colors.primaryBorder};
  border-radius: 12px;
  text-align: center;
  font-size: 0.85rem;
  color: ${props => props.theme.colors.textLight};
  backdrop-filter: blur(10px);
  
  strong {
    color: ${props => props.theme.colors.primary};
    font-weight: 600;
  }
  
  small {
    font-size: 0.75rem;
    color: ${props => props.theme.colors.textLight};
    opacity: 0.8;
    margin-top: 0.25rem;
    display: block;
  }
`;
