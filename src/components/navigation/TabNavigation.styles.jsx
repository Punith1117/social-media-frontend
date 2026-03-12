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

export const ProfileTab = styled(NavLink)`
  display: flex;
  align-items: center;
  padding: 0.75rem 1rem;
  text-decoration: none;
  color: ${props => props.theme.colors.textLight};
  font-weight: 500;
  border-radius: 8px;
  transition: all 0.3s ease;
  cursor: pointer;
  border: 2px solid ${props => props.theme.colors.border};
  background: ${props => props.theme.colors.background};
  min-width: 250px;
  gap: 0.75rem;

  &:hover {
    color: ${props => props.theme.colors.text};
    background: ${props => props.theme.colors.primaryLight};
    border-color: ${props => props.theme.colors.primary};
    box-shadow: 0 0 20px ${props => props.theme.colors.primary}66;
  }

  &.active {
    color: ${props => props.theme.colors.primary};
    background: ${props => props.theme.colors.primaryLight};
    border-color: ${props => props.theme.colors.primary};
    font-weight: 600;
  }

  &:active {
    transform: translateY(0);
  }

  @media (max-width: 1000px) and (min-width: 768px) {
    min-width: 160px;
    padding: 0.3rem 0.5rem;
    gap: 0.4rem;
  }

  @media (max-width: 768px) {
    min-width: 0;
    flex: 1;
    gap: 0.3rem;
    padding: 0.25rem 0.5rem;
  }
`;

export const SimpleTab = styled(NavLink)`
  display: flex;
  align-items: center;
  padding: 0.75rem 1rem;
  text-decoration: none;
  color: ${props => props.theme.colors.textLight};
  font-weight: 500;
  border-radius: 8px;
  transition: all 0.3s ease;
  cursor: pointer;
  border: 2px solid ${props => props.theme.colors.border};
  background: ${props => props.theme.colors.background};
  min-width: 80px;
  justify-content: center;

  &:hover {
    color: ${props => props.theme.colors.text};
    background: ${props => props.theme.colors.primaryLight};
    border-color: ${props => props.theme.colors.primary};
    box-shadow: 0 0 20px ${props => props.theme.colors.primary}66;
  }

  &.active {
    color: ${props => props.theme.colors.primary};
    background: ${props => props.theme.colors.primaryLight};
    border-color: ${props => props.theme.colors.primary};
    font-weight: 600;
  }

  &:active {
    transform: translateY(0);
  }

  @media (max-width: 1000px) and (min-width: 768px) {
    min-width: 75px;
    padding: 0.35rem 0.4rem;
    font-size: 0.8em;
  }
    
  @media (max-width: 768px) {
    min-width: 75px;
    padding: 0.25rem 0.3rem;
    font-size: 0.8em;
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
