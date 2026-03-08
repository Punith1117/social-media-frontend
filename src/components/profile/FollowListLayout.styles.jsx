import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const LayoutContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 1rem;
  background: 
    radial-gradient(ellipse at top, rgba(220, 53, 69, 0.1) 0%, transparent 50%),
    linear-gradient(135deg, rgba(20, 15, 15, 0.95) 0%, rgba(15, 10, 10, 0.98) 100%);
  backdrop-filter: blur(25px);
  border: 1px solid rgba(220, 53, 69, 0.2);
  border-radius: 24px;
  box-shadow: 
    0 25px 50px rgba(0, 0, 0, 0.4),
    0 0 0 1px rgba(220, 53, 69, 0.1),
    inset 0 2px 4px rgba(220, 53, 69, 0.2);
  animation: layoutEntrance 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
  
  @keyframes layoutEntrance {
    0% {
      opacity: 0;
      transform: translateY(30px) scale(0.95);
      filter: blur(10px);
    }
    100% {
      opacity: 1;
      transform: translateY(0) scale(1);
      filter: blur(0);
    }
  }
  
  @media (max-width: 768px) {
    margin: 0.5rem;
    padding: 0.75rem;
    border-radius: 20px;
  }
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 2rem;
  padding: 1.5rem;
  border-bottom: 1px solid rgba(220, 53, 69, 0.3);
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 1px;
    background: linear-gradient(90deg, 
      rgba(220, 53, 69, 0.6), 
      rgba(139, 69, 19, 0.4),
      rgba(220, 53, 69, 0.6));
    opacity: 0.7;
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
  animation: userInfoSlideIn 0.6s ease-out 0.2s both;
  
  @keyframes userInfoSlideIn {
    0% {
      opacity: 0;
      transform: translateX(-20px);
    }
    100% {
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
  border: 3px solid rgba(220, 53, 69, 0.3);
  box-shadow: 
    0 4px 15px rgba(0, 0, 0, 0.3),
    inset 0 0 0 1px rgba(220, 53, 69, 0.2);
  transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  
  &:hover {
    transform: scale(1.05) rotate(3deg);
    border-color: rgba(220, 53, 69, 0.6);
    box-shadow: 
      0 8px 25px rgba(220, 53, 69, 0.3),
      0 0 20px rgba(220, 53, 69, 0.2);
  }
  
  @media (max-width: 768px) {
    width: 56px;
    height: 56px;
  }
`;

export const UserDetails = styled.div`
  h2 {
    margin: 0 0 0.25rem 0;
    color: #e8d5c7;
    font-family: 'Inter', sans-serif;
    font-weight: 700;
    font-size: 1.25rem;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  }
  
  p {
    margin: 0;
    color: #a8a29e;
    font-size: 0.9rem;
    font-family: 'Inter', sans-serif;
    font-weight: 400;
  }
`;

export const BackButton = styled(Link)`
  padding: 0.5rem 0.5rem;
  background: 
    linear-gradient(135deg, rgba(220, 53, 69, 0.8) 0%, rgba(192, 57, 43, 0.9) 100%);
  color: #ffffff;
  text-decoration: none;
  border-radius: 12px;
  border: 1px solid rgba(220, 53, 69, 0.5);
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  font-size: 0.875rem;
  transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  box-shadow: 
    0 4px 15px rgba(220, 53, 69, 0.3),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  position: relative;
  overflow: hidden;
  animation: buttonSlideIn 0.6s ease-out 0.4s both;
  
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
  
  &:hover {
    background: 
      linear-gradient(135deg, rgba(192, 57, 43, 0.9) 0%, rgba(168, 50, 38, 0.95) 100%);
    transform: translateY(-2px) scale(1.02);
    cursor: pointer;
    box-shadow: 
      0 6px 20px rgba(220, 53, 69, 0.4),
      inset 0 1px 0 rgba(255, 255, 255, 0.2);
    
    &::before {
      left: 100%;
    }
  }
  
  &:active {
    transform: translateY(0) scale(0.98);
  }
  
  @keyframes buttonSlideIn {
    0% {
      opacity: 0;
      transform: translateX(20px);
    }
    100% {
      opacity: 1;
      transform: translateX(0);
    }
  }
  
  @media (max-width: 768px) {
    padding: 0.5rem 1rem;
    font-size: 0.8rem;
  }
`;

export const Tabs = styled.div`
  display: flex;
  margin-bottom: 1.5rem;
  border-bottom: 1px solid rgba(220, 53, 69, 0.3);
  position: relative;
  animation: tabsSlideIn 0.6s ease-out 0.6s both;
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 1px;
    background: linear-gradient(90deg, 
      rgba(220, 53, 69, 0.4), 
      rgba(139, 69, 19, 0.2),
      rgba(220, 53, 69, 0.4));
  }
  
  @keyframes tabsSlideIn {
    0% {
      opacity: 0;
      transform: translateY(15px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

export const Tab = styled.button`
  padding: 1rem 1.5rem;
  background: none;
  border: none;
  border-bottom: 2px solid ${props => props.$active ? 'rgba(220, 53, 69, 0.8)' : 'transparent'};
  color: ${props => props.$active ? '#e8d5c7' : '#a8a29e'};
  cursor: pointer;
  font-family: 'Inter', sans-serif;
  font-weight: ${props => props.$active ? '600' : '500'};
  font-size: 0.95rem;
  transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 0;
    width: 100%;
    height: 2px;
    background: linear-gradient(90deg, #dc3545, #8b4513);
    transform: scaleX(${props => props.$active ? '1' : '0'});
    transition: transform 0.3s ease;
  }
  
  &:hover {
    color: #e8d5c7;
    
    &::after {
      transform: scaleX(1);
    }
  }
  
  @media (max-width: 768px) {
    padding: 0.875rem 1.25rem;
    font-size: 0.9rem;
  }
`;
