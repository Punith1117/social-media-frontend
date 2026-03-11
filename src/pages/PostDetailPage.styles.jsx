import styled from 'styled-components';
import { Link } from 'react-router-dom';

// Centralized colors for consistent theming
const COLORS = {
  primary: '#3b82f6',
  primaryLight: 'rgba(59, 130, 246, 0.2)',
  primaryBorder: 'rgba(59, 130, 246, 0.3)',
  background: 'rgba(20, 15, 15, 0.98)',
  backgroundSecondary: 'rgba(20, 15, 15, 0.95)',
  text: '#e8d5c7',
  textLight: '#a8a29e',
  textSecondary: '#d4c5a7',
  danger: '#dc3545',
  warning: '#f39c12',
  success: '#28a745'
};

export const PageContainer = styled.div`
  padding: 1rem;
  position: relative;
  min-height: 100vh;
  background: ${COLORS.background};

  @media (max-width: 768px) {
    padding: 0.5rem;
  }
`;

export const PostContainer = styled.div`
  display: flex;
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem;
  gap: 2rem;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
    padding: 0.5rem;
  }
`;

export const PostSection = styled.div`
  flex: 2;
  background: ${COLORS.background};
  backdrop-filter: blur(20px);
  border: 1px solid ${COLORS.primaryBorder};
  border-radius: 20px;
  padding: 2rem;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.4);
  transition: all 0.3s ease;
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

  &:hover {
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5);
    border-color: ${COLORS.primary};
  }

  @media (max-width: 768px) {
    padding: 1.5rem;
    border-radius: 16px;
  }
`;

export const PostHeader = styled.div`
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid ${COLORS.primaryBorder};
  animation: fadeIn 0.5s ease-out 0.2s both;

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
`;

export const AuthorInfo = styled(Link)`
  display: flex;
  align-items: center;
  margin-bottom: 0.75rem;
  gap: 0.75rem;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 12px;
  transition: all 0.3s ease;
  text-decoration: none;
  color: inherit;

  &:hover {
    background: ${COLORS.primaryLight};
  }
`;

export const AuthorPhoto = styled.img`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid ${COLORS.primaryBorder};
  transition: all 0.3s ease;

  &:hover {
    border-color: ${COLORS.primary};
  }

  @media (max-width: 768px) {
    width: 40px;
    height: 40px;
    border-width: 2px;
  }
`;

export const AuthorDetails = styled.div`
  display: flex;
  flex-direction: column;
`;

export const AuthorName = styled.span`
  font-weight: 700;
  color: ${COLORS.text};
  font-size: 1rem;
  letter-spacing: 0.02em;
  text-transform: uppercase;
  transition: all 0.3s ease;

  ${AuthorInfo}:hover & {
    color: ${COLORS.primary};
  }
`;

export const AuthorDisplayName = styled.span`
  font-size: 0.9rem;
  color: ${COLORS.textLight};
  font-weight: 400;
`;

export const PostDate = styled.span`
  color: ${COLORS.textLight};
  font-size: 0.8rem;
  font-weight: 500;
  padding: 0.25rem 0.5rem;
  border-radius: 6px;
  background: ${COLORS.primaryLight};
  border: 1px solid ${COLORS.primaryBorder};
`;

export const PostDates = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  margin-bottom: 0.75rem;
`;

export const PostContent = styled.div`
  font-size: 1.1rem;
  line-height: 1.7;
  color: ${COLORS.textSecondary};
  white-space: pre-wrap;
  word-wrap: break-word;
  overflow-wrap: break-word;
  margin-bottom: 1.5rem;
  font-weight: 400;
  letter-spacing: -0.01em;
  padding: 1.5rem;
  background: ${COLORS.primaryLight};
  border-radius: 12px;
  border: 1px solid ${COLORS.primaryBorder};
  transition: all 0.3s ease;
  animation: fadeIn 0.6s ease-out 0.3s both;

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

  &:hover {
    background: ${COLORS.primaryLight};
    border-color: ${COLORS.primary};
  }

  @media (max-width: 768px) {
    padding: 1rem;
    font-size: 1rem;
  }
`;

export const LikeButton = styled.button`
  background: ${props => props.$isLiked 
    ? COLORS.danger
    : 'rgba(220, 53, 69, 0.1)'};
  color: ${props => props.$isLiked ? '#ffffff' : COLORS.danger};
  border: 1px solid ${props => props.$isLiked 
    ? 'transparent'
    : 'rgba(220, 53, 69, 0.3)'};
  padding: 0.7rem 1.3rem;
  border-radius: 20px;
  cursor: pointer;
  font-size: 0.875rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.7rem;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);

  &:hover:not(:disabled) {
    background: ${props => props.$isLiked 
      ? '#c82333'
      : COLORS.danger};
    color: #ffffff;
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.3);
  }

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }

  @media (max-width: 768px) {
    padding: 0.6rem 1.1rem;
    font-size: 0.8rem;
  }
`;

export const EditButton = styled.button`
  background: rgba(243, 156, 18, 0.1);
  color: ${COLORS.warning};
  border: 1px solid rgba(243, 156, 18, 0.3);
  padding: 0.5rem 1rem;
  border-radius: 12px;
  cursor: pointer;
  font-size: 0.875rem;
  font-weight: 600;
  margin-right: 0.6rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);

  &:hover:not(:disabled) {
    background: ${COLORS.warning};
    color: #ffffff;
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.3);
  }

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }

  @media (max-width: 768px) {
    padding: 0.4rem 0.8rem;
    font-size: 0.8rem;
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  margin-left: auto;
`;

export const DeleteButton = styled.button`
  background: rgba(220, 53, 69, 0.1);
  color: ${COLORS.danger};
  border: 1px solid rgba(220, 53, 69, 0.3);
  padding: 0.5rem 1rem;
  border-radius: 12px;
  cursor: pointer;
  font-size: 0.875rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);

  &:hover:not(:disabled) {
    background: ${COLORS.danger};
    color: #ffffff;
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.3);
  }

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }

  @media (max-width: 768px) {
    padding: 0.4rem 0.8rem;
    font-size: 0.8rem;
  }
`;

export const LikesCount = styled.span`
  color: ${COLORS.textLight};
  font-size: 0.875rem;
  font-weight: 500;
`;

export const LoadingContainer = styled.div`
  text-align: center;
  padding: 2rem;
  color: ${COLORS.textLight};
  font-size: 1.1rem;
  font-weight: 500;
`;

export const ErrorContainer = styled.div`
  text-align: center;
  padding: 2rem;
  color: ${COLORS.danger};
  font-size: 1.1rem;
  font-weight: 500;
  background: rgba(220, 53, 69, 0.1);
  border: 1px solid rgba(220, 53, 69, 0.3);
  border-radius: 12px;
  margin: 1rem;
`;

export const BackButton = styled.button`
  background: ${COLORS.primaryLight};
  border: 1px solid ${COLORS.primaryBorder};
  color: ${COLORS.text};
  cursor: pointer;
  font-size: 0.9rem;
  margin-bottom: 1rem;
  padding: 0.75rem 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  border-radius: 12px;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  font-weight: 600;

  &:hover {
    background: ${COLORS.primary};
    color: #ffffff;
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.3);
  }

  @media (max-width: 768px) {
    position: fixed;
    top: 50%;
    left: 0.5rem;
    margin-bottom: 0;
    z-index: 10;
    transform: translateY(-50%);
    padding: 0.5rem 0.75rem;
  }
`;
