import styled from 'styled-components';

// Centralized colors for consistent theming
const COLORS = {
  primary: '#3b82f6',
  primaryLight: 'rgba(59, 130, 246, 0.2)',
  primaryBorder: 'rgba(59, 130, 246, 0.3)',
  background: 'rgba(20, 15, 15, 0.98)',
  text: '#e8d5c7',
  textLight: '#a8a29e',
  accent: '#8b4513'
};

export const ProfileCardContainer = styled.div`
  background: ${COLORS.background};
  backdrop-filter: blur(20px);
  border: 1px solid ${COLORS.primaryBorder};
  border-radius: 20px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.4);
  transition: all 0.3s ease;
  animation: fadeIn 0.6s ease-out;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;

  @keyframes fadeIn {
    from { 
      opacity: 0; 
    }
    to { 
      opacity: 1; 
    }
  }

  &:hover {
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5);
    border-color: ${COLORS.primary};
  }

  @media (max-width: 768px) {
    padding: 1.25rem;
    border-radius: 16px;
    margin-bottom: 1.25rem;
    text-align: center;
    align-items: center;
  }
`;

export const ProfilePhoto = styled.img`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid ${COLORS.primaryBorder};
  transition: all 0.3s ease;
  margin-bottom: 1rem;
  align-self: center;

  &:hover {
    border-color: ${COLORS.primary};
    box-shadow: 0 8px 25px rgba(59, 130, 246, 0.3);
  }

  @media (max-width: 768px) {
    width: 100px;
    height: 100px;
    border-width: 2px;
  }
`;

export const UserName = styled.h2`
  font-family: 'Inter', sans-serif;
  font-weight: 700;
  color: ${COLORS.text};
  font-size: 1.75rem;
  letter-spacing: 0.02em;
  text-transform: uppercase;
  margin: 0 0 0.5rem 0;
  transition: color 0.3s ease;
  line-height: 1.2;
  text-align: center;

  ${ProfileCardContainer}:hover & {
    color: ${COLORS.primary};
  }

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

export const UsernameFirstChar = styled.span`
  font-size: 1.2em;
  font-weight: 900;
`;

export const UsernameMiddleChars = styled.span`
  font-size: 0.8em;
`;

export const UsernameLastChar = styled.span`
  font-size: 1.2em;
  font-weight: 900;
`;

export const DisplayName = styled.p`
  font-size: 1.2rem;
  color: ${COLORS.textLight};
  font-weight: 400;
  margin: 0 0 1rem 0;
  line-height: 1.3;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid ${COLORS.primaryBorder};
  transition: all 0.3s ease;
  text-align: center;

  ${ProfileCardContainer}:hover & {
    color: ${COLORS.text};
    border-color: ${COLORS.primary};
  }

  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
`;

export const Bio = styled.p`
  font-size: 1rem;
  line-height: 1.7;
  color: ${COLORS.text};
  white-space: pre-wrap;
  word-wrap: break-word;
  overflow-wrap: break-word;
  margin: 0 0 1rem 0;
  font-weight: 400;
  letter-spacing: -0.01em;
  transition: color 0.3s ease;
  animation: fadeIn 0.6s ease-out 0.2s both;

  @keyframes fadeIn {
    from { 
      opacity: 0; 
    }
    to { 
      opacity: 1; 
    }
  }

  ${ProfileCardContainer}:hover & {
    color: ${COLORS.text};
  }

  @media (max-width: 768px) {
    font-size: 0.95rem;
  }
`;

export const JoinDate = styled.p`
  margin: 0;
  font-size: 0.9rem;
  color: ${COLORS.textLight};
  font-weight: 500;
  padding: 0.25rem 0.5rem;
  border-radius: 6px;
  transition: all 0.3s ease;
  animation: fadeIn 0.5s ease-out 0.4s both;
  text-align: center;

  @keyframes fadeIn {
    from { 
      opacity: 0; 
    }
    to { 
      opacity: 1; 
    }
  }

  ${ProfileCardContainer}:hover & {
    color: ${COLORS.primary};
    background: ${COLORS.primaryLight};
  }

  @media (max-width: 768px) {
    font-size: 0.8rem;
  }
`;

export const EditButtonContainer = styled.div`
  margin-top: 1rem;
  text-align: right;
  animation: fadeIn 0.5s ease-out 0.6s both;

  @keyframes fadeIn {
    from { 
      opacity: 0; 
      transform: translateY(10px); 
    }
    to { 
      opacity: 1; 
      transform: translateY(0); 
    }
  }
  
  @media (max-width: 768px) {
    text-align: center !important;
    align-self: center;
    width: 100%;
  }
`;
