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
  color: #e8d5c7;
  font-weight: 500;
  border-radius: 8px;
  transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  cursor: pointer;
  position: relative;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(59, 130, 246, 0.2);

  &:hover {
    background: rgba(59, 130, 246, 0.15);
    color: #fff;
    border-color: rgba(59, 130, 246, 0.4);
    box-shadow: 0 4px 12px rgba(59, 130, 246, 0.2);
  }

  &.active {
    color: #fff;
    background: 
      radial-gradient(ellipse at center, rgba(59, 130, 246, 0.25) 0%, transparent 70%),
      linear-gradient(135deg, rgba(59, 130, 246, 0.2) 0%, rgba(139, 69, 19, 0.15) 100%);
    border-color: rgba(59, 130, 246, 0.5);
    box-shadow: 
      0 0 20px rgba(59, 130, 246, 0.3),
      inset 0 1px 0 rgba(59, 130, 246, 0.4);
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
    animation: bloodPulse 2s ease-in-out infinite;
  }

  @keyframes bloodPulse {
    0%, 100% {
      box-shadow: 
        0 0 20px rgba(59, 130, 246, 0.3),
        inset 0 1px 0 rgba(59, 130, 246, 0.4);
    }
    50% {
      box-shadow: 
        0 0 30px rgba(59, 130, 246, 0.6),
        0 0 40px rgba(59, 130, 246, 0.4),
        inset 0 1px 0 rgba(59, 130, 246, 0.6);
    }
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
  background: 
    radial-gradient(ellipse at top, rgba(59, 130, 246, 0.1) 0%, transparent 50%),
    linear-gradient(135deg, rgba(20, 15, 15, 0.6) 0%, rgba(15, 10, 10, 0.4) 100%);

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
  border: 2px solid rgba(59, 130, 246, 0.4);
  box-shadow: 0 0 10px rgba(59, 130, 246, 0.2);
  transition: all 0.3s ease;

  &:hover {
    border-color: rgba(59, 130, 246, 0.6);
    box-shadow: 0 0 15px rgba(59, 130, 246, 0.4);
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
  color: #e8d5c7;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
  text-transform: uppercase;

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
  color: #a8a29e;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  @media (max-width: 768px) {
    font-size: 0.7rem;
  }
`;
