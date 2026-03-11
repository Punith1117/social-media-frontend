import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

export const TabContainer = styled.nav`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex: 0 0 auto;

  @media (max-width: 1000px) and (min-width: 768px) {
    gap: 0.25rem;
  }

  @media (max-width: 768px) {
    flex: auto;
    width: 100%;
    gap: 0.25rem;
  }
`;

const baseTabStyles = `
  display: flex;
  align-items: center;
  padding: 0.75rem 1rem;
  text-decoration: none;
  color: #9ca3af;
  font-weight: 500;
  border-radius: 8px;
  transition: all 0.3s ease;
  cursor: pointer;
  border: 1px solid ${props => props.theme.colors.primaryBorder};
  background: ${props => props.theme.colors.background};

  &:hover {
    color: #ffffff;
    background: rgba(59, 130, 246, 0.15);
    border-color: ${props => props.theme.colors.primary};
    box-shadow: 0 0 20px rgba(59, 130, 246, 0.6);
  }

  &.active {
    color: #ffffff;
    background: ${props => props.theme.colors.primary};
    border-color: ${props => props.theme.colors.primary};
    box-shadow: 0 0 30px rgba(59, 130, 246, 0.8);
    animation: ${props => props.theme.animations.pulse} 2s infinite;
  }

  @media (max-width: 768px) {
    padding: 0.5rem 0.75rem;
    font-size: 0.9rem;
  }
`;

export const ProfileTab = styled(NavLink)`
  ${baseTabStyles}
  min-width: 250px;
  gap: 0.75rem;
  padding: 0.5rem 1rem;

  @media (max-width: 1000px) and (min-width: 768px) {
    min-width: 200px;
    padding: 0.4rem 0.6rem;
    gap: 0.5rem;
  }

  @media (max-width: 768px) {
    min-width: 0;
    flex: 1;
    gap: 0.5rem;
    padding: 0.375rem 0.75rem;
  }
`;

export const SimpleTab = styled(NavLink)`
  ${baseTabStyles}
  min-width: 80px;
  justify-content: center;

  @media (max-width: 1000px) and (min-width: 768px) {
    min-width: 70px;
    padding: 0.5rem 0.6rem;
  }

  @media (max-width: 768px) {
    min-width: 60px;
  }
`;

export const ProfilePhoto = styled.img`
  width: 42px;
  height: 42px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid ${props => props.theme.colors.primaryBorder};
  transition: all 0.3s ease;

  &:hover {
    border-color: ${props => props.theme.colors.primary};
  }

  @media (max-width: 768px) {
    width: 36px;
    height: 36px;
  }
`;

export const ProfileInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  flex: 1;
  min-width: 0;
`;

export const Username = styled.span`
  font-size: 0.9rem;
  font-weight: 600;
  color: ${props => props.theme.colors.text};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  @media (max-width: 768px) {
    font-size: 0.8rem;
  }
`;

export const FirstLastLetter = styled.span`
  font-size: 1.2em;

  @media (max-width: 768px) {
    font-size: 1.1em;
  }
`;

export const MiddleLetter = styled.span`
  font-size: 0.8em;

  @media (max-width: 768px) {
    font-size: 0.7em;
  }
`;

export const DisplayName = styled.span`
  font-size: 0.8rem;
  color: ${props => props.theme.colors.textLight};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  @media (max-width: 768px) {
    font-size: 0.7rem;
  }
`;
