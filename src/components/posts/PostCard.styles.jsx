import styled from 'styled-components';
import { Link } from 'react-router-dom';

// Centralized colors - much easier to maintain
const COLORS = {
  primary: '#3b82f6',
  primaryLight: 'rgba(59, 130, 246, 0.2)',
  primaryBorder: 'rgba(59, 130, 246, 0.3)',
  background: 'rgba(20, 15, 15, 0.98)',
  text: '#d4c5a7',
  textLight: '#a8a29e',
  danger: '#e74c3c',
  warning: '#f39c12'
};

export const PostCardContainer = styled.article`
  background: ${COLORS.background};
  backdrop-filter: blur(10px);
  border: 1px solid ${COLORS.primaryBorder};
  border-radius: 16px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  transition: all 0.3s ease;
  animation: fadeIn 0.5s ease-out;

  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }

  &:hover {
    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.4);
    border-color: ${COLORS.primary};
  }

  @media (max-width: 768px) {
    padding: 1rem;
    border-radius: 12px;
  }
`;

export const PostHeader = styled(Link)`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid ${COLORS.primaryBorder};
  text-decoration: none;
  color: inherit;
  transition: all 0.2s ease;
  border-radius: 8px;
  margin: -0.5rem;
  margin-bottom: 0.5rem;

  &:hover {
    background: ${COLORS.primaryLight};
  }
`;

export const AuthorPhoto = styled.img`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid ${COLORS.primaryBorder};
  transition: all 0.2s ease;

  &:hover {
    border-color: ${COLORS.primary};
  }

  @media (max-width: 768px) {
    width: 40px;
    height: 40px;
  }
`;

export const AuthorInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

export const AuthorUsername = styled.div`
  font-weight: 700;
  color: ${COLORS.text};
  font-size: 1rem;
  text-transform: uppercase;
  letter-spacing: 0.02em;
  transition: color 0.2s ease;

  ${PostHeader}:hover & {
    color: ${COLORS.primary};
  }
`;

export const AuthorDisplayName = styled.div`
  font-size: 0.875rem;
  color: ${COLORS.textLight};
  margin-top: 2px;
`;

export const PostDates = styled.div`
  margin-left: auto;
  text-align: right;
  font-size: 0.8rem;
  color: ${COLORS.textLight};
`;

export const PostDate = styled.span`
  color: ${COLORS.textLight};
  font-size: 0.8rem;
  font-weight: 500;
  padding: 0.25rem 0.5rem;
  border-radius: 6px;
`;

export const PostContent = styled(Link)`
  display: block;
  font-size: 1rem;
  line-height: 1.6;
  color: ${COLORS.text};
  white-space: pre-wrap;
  word-wrap: break-word;
  overflow-wrap: break-word;
  margin: 1rem 0;
  padding: 1rem;
  background: ${COLORS.primaryLight};
  border-radius: 12px;
  border: 1px solid ${COLORS.primaryBorder};
  text-decoration: none;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(59, 130, 246, 0.3);
  }

  @media (max-width: 768px) {
    padding: 0.75rem;
  }
`;

export const PostActions = styled.section`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 1rem;
  border-top: 1px solid ${COLORS.primaryBorder};
`;

export const LikeButton = styled.button`
  background: ${props => props.$isLiked 
    ? COLORS.danger 
    : 'rgba(231, 76, 60, 0.1)'};
  color: ${props => props.$isLiked ? '#fff' : COLORS.danger};
  border: 1px solid ${props => props.$isLiked 
    ? COLORS.danger 
    : 'rgba(231, 76, 60, 0.3)'};
  padding: 0.5rem 1rem;
  border-radius: 20px;
  cursor: pointer;
  font-size: 0.875rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.2s ease;

  &:hover:not(:disabled) {
    box-shadow: 0 4px 12px rgba(231, 76, 60, 0.3);
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
  gap: 0.5rem;
  margin-left: auto;
`;

export const EditButton = styled.button`
  background: rgba(243, 156, 18, 0.1);
  color: ${COLORS.warning};
  border: 1px solid rgba(243, 156, 18, 0.3);
  padding: 0.4rem 0.8rem;
  border-radius: 8px;
  cursor: pointer;
  font-size: 0.8rem;
  font-weight: 600;
  transition: all 0.2s ease;

  &:hover:not(:disabled) {
    background: ${COLORS.warning};
    color: #fff;
  }

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
`;

export const DeleteButton = styled.button`
  background: rgba(231, 76, 60, 0.1);
  color: ${COLORS.danger};
  border: 1px solid rgba(231, 76, 60, 0.3);
  padding: 0.4rem 0.8rem;
  border-radius: 8px;
  cursor: pointer;
  font-size: 0.8rem;
  font-weight: 600;
  transition: all 0.2s ease;

  &:hover:not(:disabled) {
    background: ${COLORS.danger};
    color: #fff;
  }

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
`;

export const LikeSection = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
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

export const LikesCount = styled.span`
  color: ${COLORS.textLight};
  font-size: 0.875rem;
`;

export const AuthorSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
  padding: 0.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid ${COLORS.primaryBorder};
  cursor: pointer;
  transition: all 0.2s ease;
  border-radius: 8px;
  margin: -0.5rem;
  margin-bottom: 0.5rem;

  &:hover {
    background: ${COLORS.primaryLight};
  }

  @media (max-width: 768px) {
    gap: 0.75rem;
  }
`;
