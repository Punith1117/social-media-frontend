import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const PageContainer = styled.div`
  padding: 1rem;
  position: relative;
  min-height: 100vh;
  background: ${props => props.theme.colors.background};

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
  background: ${props => props.theme.colors.background};
  backdrop-filter: blur(20px);
  border: 1px solid ${props => props.theme.colors.primaryBorder};
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
    border-color: ${props => props.theme.colors.primary};
  }

  @media (max-width: 768px) {
    padding: 1.5rem;
    border-radius: 16px;
  }
`;

export const PostHeader = styled.div`
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid ${props => props.theme.colors.primaryBorder};
  animation: ${props => props.theme.animations.fadeIn} 0.5s ease-out 0.2s both;
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
    background: ${props => props.theme.colors.primaryLight};
  }
`;

export const AuthorPhoto = styled.img`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid ${props => props.theme.colors.primaryBorder};
  transition: all 0.3s ease;

  &:hover {
    border-color: ${props => props.theme.colors.primary};
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
  color: ${props => props.theme.colors.text};
  font-size: 1rem;
  letter-spacing: 0.02em;
  text-transform: uppercase;
  transition: all 0.3s ease;

  ${AuthorInfo}:hover & {
    color: ${props => props.theme.colors.primary};
  }
`;

export const AuthorDisplayName = styled.span`
  font-size: 0.9rem;
  color: ${props => props.theme.colors.textLight};
  font-weight: 400;
`;

export const PostDate = styled.span`
  color: ${props => props.theme.colors.textLight};
  font-size: 0.8rem;
  font-weight: 500;
  padding: 0.25rem 0.5rem;
  border-radius: 6px;
  background: ${props => props.theme.colors.primaryLight};
  border: 1px solid ${props => props.theme.colors.primaryBorder};
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
  color: ${props => props.theme.colors.textSecondary};
  white-space: pre-wrap;
  word-wrap: break-word;
  overflow-wrap: break-word;
  margin-bottom: 1.5rem;
  font-weight: 400;
  letter-spacing: -0.01em;
  padding: 1.5rem;
  background: ${props => props.theme.colors.primaryLight};
  border-radius: 12px;
  border: 1px solid ${props => props.theme.colors.primaryBorder};
  transition: all 0.3s ease;
  animation: ${props => props.theme.animations.fadeIn} 0.6s ease-out 0.3s both;

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
    background: ${props => props.theme.colors.primaryLight};
    border-color: ${props => props.theme.colors.primary};
  }

  @media (max-width: 768px) {
    padding: 1rem;
    font-size: 1rem;
  }
`;

export const LikeButton = styled.button`
  background: ${props => props.$isLiked 
    ? props.theme.colors.danger
    : props.theme.colors.dangerLight};
  color: ${props => props.$isLiked ? '#ffffff' : props.theme.colors.danger};
  border: 1px solid ${props => props.$isLiked 
    ? 'transparent'
    : props.theme.colors.dangerBorder};
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
      : props.theme.colors.danger};
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
  background: ${props => props.theme.colors.warningLight};
  color: ${props => props.theme.colors.warning};
  border: 1px solid ${props => props.theme.colors.warningBorder};
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
    background: ${props => props.theme.colors.warning};
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
  background: ${props => props.theme.colors.dangerLight};
  color: ${props => props.theme.colors.danger};
  border: 1px solid ${props => props.theme.colors.dangerBorder};
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
    background: ${props => props.theme.colors.danger};
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
  color: ${props => props.theme.colors.textLight};
  font-size: 0.875rem;
  font-weight: 500;
`;

export const LoadingContainer = styled.div`
  text-align: center;
  padding: 2rem;
  color: ${props => props.theme.colors.textLight};
  font-size: 1.1rem;
  font-weight: 500;
`;

export const ErrorContainer = styled.div`
  text-align: center;
  padding: 2rem;
  color: ${props => props.theme.colors.danger};
  font-size: 1.1rem;
  font-weight: 500;
  background: ${props => props.theme.colors.dangerLight};
  border: 1px solid ${props => props.theme.colors.dangerBorder};
  border-radius: 12px;
  margin: 1rem;
`;

export const BackButton = styled.button`
  background: ${props => props.theme.colors.primaryLight};
  border: 1px solid ${props => props.theme.colors.primaryBorder};
  color: ${props => props.theme.colors.text};
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
    background: ${props => props.theme.colors.primary};
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
