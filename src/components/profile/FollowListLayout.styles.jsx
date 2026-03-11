import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const LayoutContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 1rem;
  background: ${props => props.theme.colors.background};
  backdrop-filter: blur(20px);
  border: 1px solid ${props => props.theme.colors.primaryBorder};
  border-radius: 20px;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.4);
  animation: ${props => props.theme.animations.fadeIn} 0.6s ease-out;

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
  border-bottom: 1px solid ${props => props.theme.colors.primaryBorder};
  animation: ${props => props.theme.animations.fadeIn} 0.6s ease-out 0.2s both;

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
  border: 3px solid ${props => props.theme.colors.primaryBorder};
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
  transition: all 0.3s ease;

  &:hover {
    border-color: ${props => props.theme.colors.primary};
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
    color: ${props => props.theme.colors.text};
    font-family: 'Inter', sans-serif;
    font-weight: 700;
    font-size: 1.25rem;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  }
  
  p {
    margin: 0;
    color: ${props => props.theme.colors.textLight};
    font-size: 0.9rem;
    font-family: 'Inter', sans-serif;
    font-weight: 400;
  }
`;

export const BackButton = styled(Link)`
  padding: 0.5rem 1rem;
  background: linear-gradient(135deg, ${props => props.theme.colors.primary} 0%, ${props => props.theme.colors.danger} 100%);
  color: #ffffff;
  text-decoration: none;
  border-radius: 12px;
  border: 1px solid ${props => props.theme.colors.primaryBorder};
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  font-size: 0.875rem;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(59, 130, 246, 0.3);
  backdrop-filter: blur(10px);
  animation: ${props => props.theme.animations.fadeInSlide} 0.6s ease-out 0.6s both;

  &:hover {
    background: linear-gradient(135deg, ${props => props.theme.colors.danger} 0%, #a02622 100%);
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
  border-bottom: 1px solid ${props => props.theme.colors.primaryBorder};
  animation: ${props => props.theme.animations.fadeIn} 0.6s ease-out 0.8s both;
`;

export const Tab = styled.button`
  padding: 1rem 1.5rem;
  background: none;
  border: none;
  border-bottom: 2px solid ${props => props.$active ? props.theme.colors.primary : 'transparent'};
  color: ${props => props.$active ? props.theme.colors.text : props.theme.colors.textLight};
  cursor: pointer;
  font-family: 'Inter', sans-serif;
  font-weight: ${props => props.$active ? '600' : '500'};
  font-size: 0.95rem;
  transition: all 0.3s ease;
  
  &:hover {
    color: ${props => props.theme.colors.text};
    border-bottom-color: ${props => props.theme.colors.primaryLight};
  }
  
  @media (max-width: 768px) {
    padding: 0.875rem 1.25rem;
    font-size: 0.9rem;
  }
`;
