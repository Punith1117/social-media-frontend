import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const StatsContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
  padding: 1rem;
  background: 
    radial-gradient(ellipse at center, ${props => props.theme.colors.primaryLight} 0%, ${props => props.theme.colors.primaryLight}50 50%, transparent 70%),
    linear-gradient(135deg, ${props => props.theme.colors.background}99 0%, ${props => props.theme.colors.darkBg}99 100%);
  backdrop-filter: blur(15px);
  border: 1px solid ${props => props.theme.colors.primaryBorder};
  border-radius: 16px;
  position: relative;
  overflow: hidden;
  animation: ${props => props.theme.animations.fadeIn} 0.6s ease-out 0.5s both;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: linear-gradient(90deg, 
      transparent, 
      ${props => props.theme.colors.primary}cc, 
      ${props => props.theme.colors.primary}99,
      ${props => props.theme.colors.primary}cc,
      transparent
    );
    opacity: 0.3;
    transition: opacity 0.5s ease;
  }

  &:hover {
    border-color: ${props => props.theme.colors.primaryBorder};
    box-shadow: 
      0 10px 25px rgba(0, 0, 0, 0.3),
      0 0 15px ${props => props.theme.colors.primaryLight};
    
    &::before {
      opacity: 0.8;
    }
  }

  @media (max-width: 768px) {
    gap: 0.5rem;
    padding: 0.75rem;
  }
`;

export const StatItem = styled.div`
  text-align: center;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    top: 50%;
    right: -0.5rem;
    width: 1px;
    height: 60%;
    background: linear-gradient(to bottom, 
      transparent, 
      ${props => props.theme.colors.primaryBorder}, 
      transparent
    );
    transform: translateY(-50%);
  }

  &:last-child::after {
    display: none;
  }

  @media (max-width: 768px) {
    &::after {
      right: -0.25rem;
      height: 50%;
    }
  }
`;

export const StatNumber = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  color: ${props => props.theme.colors.text};
  font-family: 'Inter', sans-serif;
  letter-spacing: 0.02em;
  text-shadow: 0 0 10px ${props => props.theme.colors.primaryLight};
  transition: all 0.3s ease;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 0;
    width: 0;
    height: 2px;
    background: linear-gradient(90deg, ${props => props.theme.colors.primary}, ${props => props.theme.colors.primary});
    transition: width 0.4s ease;
    border-radius: 1px;
  }

  @media (max-width: 768px) {
    font-size: 1.3rem;
  }
`;

export const StatLabel = styled.div`
  font-size: 0.9rem;
  color: ${props => props.theme.colors.textLight};
  margin-top: 0.25rem;
  font-weight: 500;
  letter-spacing: 0.05em;
  transition: all 0.3s ease;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    bottom: -1px;
    left: 50%;
    width: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent, ${props => props.theme.colors.textSecondary}, transparent);
    transition: all 0.4s ease;
    transform: translateX(-50%);
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
      ${props => props.theme.colors.textSecondary}20, 
      transparent
    );
    transition: left 0.6s ease;
    z-index: -1;
  }

  @media (max-width: 768px) {
    font-size: 0.8rem;
  }
`;

export const StatLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  display: inline-block;
  width: 100%;
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
  border-radius: 8px;
  padding: 0.5rem;

  &:hover {
    text-decoration: none;
    
    ${StatNumber} {
      color: ${props => props.theme.colors.primary};
      
      &::before {
        width: 100%;
      }
    }

    ${StatLabel} {
      color: ${props => props.theme.colors.textSecondary};
      
      &::before {
        width: 80%;
      }

      &::after {
        left: 100%;
      }
    }
  }

  &:active {
    background: rgba(59, 130, 246, 0.08);
    transition: all 0.1s ease;
  }
`;
