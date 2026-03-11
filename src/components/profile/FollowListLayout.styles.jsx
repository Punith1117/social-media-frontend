import styled from 'styled-components';
import { Link } from 'react-router-dom';

// Centralized colors for consistent theming
const COLORS = {
  primary: '#3b82f6',
  primaryLight: 'rgba(59, 130, 246, 0.2)',
  primaryBorder: 'rgba(59, 130, 246, 0.3)',
  background: 'rgba(20, 15, 15, 0.98)',
  text: '#e8d5c7',
  textLight: '#a8a29e',
  accent: '#8b4513',
  danger: '#c0392b'
};

export const LayoutContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 1rem;
  background: ${COLORS.background};
  backdrop-filter: blur(20px);
  border: 1px solid ${COLORS.primaryBorder};
  border-radius: 20px;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.4);
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

  @media (max-width: 768px) {
    margin: 0.5rem;
    padding: 0.75rem;
    border-radius: 16px;
  }
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 2rem;
  padding: 1.5rem;
  border-bottom: 1px solid ${COLORS.primaryBorder};
  animation: fadeIn 0.6s ease-out 0.2s both;

  @keyframes fadeIn {
    from { 
      opacity: 0; 
      transform: translateY(-15px); 
    }
    to { 
      opacity: 1; 
      transform: translateY(0); 
    }
  }

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
    padding: 1rem;
  }
`;

export const UserInfo = styled.div`
  display: flex;
  align-items: center;
  animation: fadeIn 0.6s ease-out 0.4s both;

  @keyframes fadeIn {
    from { 
      opacity: 0; 
      transform: translateX(-15px); 
    }
    to { 
      opacity: 1; 
      transform: translateX(0); 
    }
  }
`;

export const UserAvatar = styled.img`
  width: 64px;
  height: 64px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 1rem;
  border: 3px solid ${COLORS.primaryBorder};
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
  transition: all 0.3s ease;

  &:hover {
    border-color: ${COLORS.primary};
    box-shadow: 0 8px 25px rgba(59, 130, 246, 0.3);
  }

  @media (max-width: 768px) {
    width: 56px;
    height: 56px;
  }
`;

export const UserDetails = styled.div`
  h2 {
    margin: 0 0 0.25rem 0;
    color: ${COLORS.text};
    font-family: 'Inter', sans-serif;
    font-weight: 700;
    font-size: 1.25rem;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  }
  
  p {
    margin: 0;
    color: ${COLORS.textLight};
    font-size: 0.9rem;
    font-family: 'Inter', sans-serif;
    font-weight: 400;
  }
`;

export const BackButton = styled(Link)`
  padding: 0.5rem 1rem;
  background: linear-gradient(135deg, ${COLORS.primary} 0%, ${COLORS.danger} 100%);
  color: #ffffff;
  text-decoration: none;
  border-radius: 12px;
  border: 1px solid ${COLORS.primaryBorder};
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  font-size: 0.875rem;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(59, 130, 246, 0.3);
  backdrop-filter: blur(10px);
  animation: fadeIn 0.6s ease-out 0.6s both;

  @keyframes fadeIn {
    from { 
      opacity: 0; 
      transform: translateX(15px); 
    }
    to { 
      opacity: 1; 
      transform: translateX(0); 
    }
  }

  &:hover {
    background: linear-gradient(135deg, ${COLORS.danger} 0%, #a02622 100%);
    box-shadow: 0 6px 20px rgba(59, 130, 246, 0.4);
  }
  
  @media (max-width: 768px) {
    padding: 0.5rem 1rem;
    font-size: 0.8rem;
  }
`;

export const Tabs = styled.div`
  display: flex;
  margin-bottom: 1.5rem;
  border-bottom: 1px solid ${COLORS.primaryBorder};
  animation: fadeIn 0.6s ease-out 0.8s both;

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
`;

export const Tab = styled.button`
  padding: 1rem 1.5rem;
  background: none;
  border: none;
  border-bottom: 2px solid ${props => props.$active ? COLORS.primary : 'transparent'};
  color: ${props => props.$active ? COLORS.text : COLORS.textLight};
  cursor: pointer;
  font-family: 'Inter', sans-serif;
  font-weight: ${props => props.$active ? '600' : '500'};
  font-size: 0.95rem;
  transition: all 0.3s ease;
  
  &:hover {
    color: ${COLORS.text};
    border-bottom-color: ${COLORS.primaryLight};
  }
  
  @media (max-width: 768px) {
    padding: 0.875rem 1.25rem;
    font-size: 0.9rem;
  }
`;
