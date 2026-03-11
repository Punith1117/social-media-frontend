import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const CommentContainer = styled.div`
  border-bottom: 1px solid ${props => props.theme.colors.primaryBorder};
  background: ${props => props.theme.colors.background};
  border-radius: 12px;
  margin-bottom: 0.75rem;
  padding: 1rem;
  transition: all 0.3s ease;
  animation: ${props => props.theme.animations.fadeInSlide} 0.6s ease-out;

  @media (max-width: 768px) {
    padding: 0.8rem;
    margin-bottom: 0.5rem;
  }

  &:last-child {
    border-bottom: none;
    margin-bottom: 0;
  }
`;

export const CommentHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 0.75rem;
  gap: 1rem;
`;

export const AuthorInfo = styled(Link)`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 10px;
  transition: all 0.3s ease;
  text-decoration: none;
  color: inherit;

  &:hover {
    background: ${props => props.theme.colors.primaryLight};
  }
`;

export const AuthorPhoto = styled.img`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid ${props => props.theme.colors.primaryBorder};
  transition: all 0.3s ease;

  &:hover {
    border-color: ${props => props.theme.colors.primary};
  }

  @media (max-width: 768px) {
    width: 32px;
    height: 32px;
  }
`;

export const AuthorName = styled.span`
  font-weight: 700;
  color: ${props => props.theme.colors.text};
  font-size: 0.95rem;
  text-transform: uppercase;
  letter-spacing: 0.02em;
  transition: all 0.3s ease;

  ${AuthorInfo}:hover & {
    color: ${props => props.theme.colors.primary};
  }
`;

export const CommentDate = styled.span`
  color: ${props => props.theme.colors.textLight};
  font-size: 0.8rem;
  font-weight: 500;
  padding: 0.2rem 0.4rem;
  border-radius: 4px;
  background: ${props => props.theme.colors.primaryLight};
  border: 1px solid ${props => props.theme.colors.primaryBorder};
`;

export const CommentContent = styled.div`
  color: ${props => props.theme.colors.textSecondary};
  line-height: 1.6;
  white-space: pre-wrap;
  word-wrap: break-word;
  overflow-wrap: break-word;
  font-size: 0.95rem;
  font-weight: 400;
  letter-spacing: -0.01em;
`;

export const DeleteButton = styled.button`
  background: ${props => props.theme.colors.dangerLight};
  color: ${props => props.theme.colors.danger};
  border: 1px solid ${props => props.theme.colors.dangerBorder};
  padding: 0.4rem 0.6rem;
  border-radius: 12px;
  cursor: pointer;
  font-size: 0.8rem;
  font-weight: 600;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);

  &:hover:not(:disabled) {
    background: ${props => props.theme.colors.danger};
    color: #ffffff;
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.3);
  }

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
`;
