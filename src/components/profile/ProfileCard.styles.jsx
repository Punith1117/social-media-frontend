import styled from 'styled-components';

export const ProfileCardContainer = styled.div`
  background: ${props => props.theme.colors.background};
  backdrop-filter: blur(20px);
  border: 1px solid ${props => props.theme.colors.primaryBorder};
  border-radius: 20px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.4);
  transition: all 0.3s ease;
  animation: ${props => props.theme.animations.fadeIn} 0.6s ease-out;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;

  &:hover {
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5);
    border-color: ${props => props.theme.colors.primary};
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
  border: 3px solid ${props => props.theme.colors.primaryBorder};
  transition: all 0.3s ease;
  margin-bottom: 1rem;
  align-self: center;

  &:hover {
    border-color: ${props => props.theme.colors.primary};
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
  color: ${props => props.theme.colors.text};
  font-size: 1.75rem;
  letter-spacing: 0.02em;
  text-transform: uppercase;
  margin: 0 0 0.5rem 0;
  transition: color 0.3s ease;
  line-height: 1.2;
  text-align: center;

  ${ProfileCardContainer}:hover & {
    color: ${props => props.theme.colors.primary};
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
  color: ${props => props.theme.colors.textLight};
  font-weight: 400;
  margin: 0 0 1rem 0;
  line-height: 1.3;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid ${props => props.theme.colors.primaryBorder};
  transition: all 0.3s ease;
  text-align: center;

  ${ProfileCardContainer}:hover & {
    color: ${props => props.theme.colors.text};
    border-color: ${props => props.theme.colors.primary};
  }

  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
`;

export const Bio = styled.p`
  font-size: 1rem;
  line-height: 1.7;
  color: ${props => props.theme.colors.text};
  white-space: pre-wrap;
  word-wrap: break-word;
  overflow-wrap: break-word;
  margin: 0 0 1rem 0;
  font-weight: 400;
  letter-spacing: -0.01em;
  transition: color 0.3s ease;
  animation: ${props => props.theme.animations.fadeIn} 0.6s ease-out 0.2s both;

  ${ProfileCardContainer}:hover & {
    color: ${props => props.theme.colors.text};
  }

  @media (max-width: 768px) {
    font-size: 0.95rem;
  }
`;

export const JoinDate = styled.p`
  margin: 0;
  font-size: 0.9rem;
  color: ${props => props.theme.colors.textLight};
  font-weight: 500;
  padding: 0.25rem 0.5rem;
  border-radius: 6px;
  transition: all 0.3s ease;
  animation: ${props => props.theme.animations.fadeIn} 0.5s ease-out 0.4s both;
  text-align: center;

  ${ProfileCardContainer}:hover & {
    color: ${props => props.theme.colors.primary};
    background: ${props => props.theme.colors.primaryLight};
  }

  @media (max-width: 768px) {
    font-size: 0.8rem;
  }
`;

export const EditButtonContainer = styled.div`
  margin-top: 1rem;
  text-align: right;
  animation: ${props => props.theme.animations.slideIn} 0.5s ease-out 0.6s both;
  
  @media (max-width: 768px) {
    text-align: center !important;
    align-self: center;
    width: 100%;
  }
`;
